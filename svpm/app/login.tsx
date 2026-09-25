import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { govBrPublicLoginUrl } from '../constants/auth';
import { appDocuments } from '../constants/documents';

type BrowserNotice = {
  title: string;
  url: string;
};

const openExternalLink = (url: string) => {
  Linking.openURL(url);
};

const openInApp = (title: string, url: string) => {
  router.push({
    pathname: '/webview',
    params: { title, url },
  });
};

const openDocument = (documentId: string) => {
  router.push({
    pathname: '/webview',
    params: { documentId },
  });
};

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [browserNotice, setBrowserNotice] = useState<BrowserNotice | null>(null);

  const handleGovBrLogin = async () => {
    setLoading(true);

    const canOpen = await Linking.canOpenURL(govBrPublicLoginUrl);

    setLoading(false);

    if (!canOpen) {
      Alert.alert('Login gov.br', 'Não foi possível abrir o site do gov.br.');
      return;
    }

    openExternalLink(govBrPublicLoginUrl);
  };

  const confirmExternalLink = () => {
    if (!browserNotice) {
      return;
    }

    const url = browserNotice.url;
    setBrowserNotice(null);
    openExternalLink(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.topBar}>
          <Text style={styles.govLogo}>gov.br</Text>
          <Text style={styles.topBarText}>Governo Federal</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.serviceBox}>
            <Text style={styles.serviceLabel}>Serviço</Text>
            <Text style={styles.serviceName}>Família Naval</Text>
            <Text style={styles.serviceDescription}>
              Entre com sua conta gov.br para acessar os serviços mais usados. As facilidades abaixo estão disponíveis sem login.
            </Text>
          </View>

          <View style={styles.signInBox}>
            <Text style={styles.title}>Identifique-se no gov.br</Text>
            <Text style={styles.subtitle}>
              O login será feito no navegador. Após concluir, retorne para este aplicativo e toque em “Já entrei no gov.br”.
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              disabled={loading}
              onPress={handleGovBrLogin}
              style={[styles.govButton, loading && styles.govButtonDisabled]}>
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.govButtonText}>Entrar com gov.br</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace('/(tabs)')} style={styles.secondaryButton}>
              <Text style={styles.secondaryText}>Já entrei no gov.br</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.secaoTitulo}>Facilidades</Text>

          <View style={styles.gridFacilidades}>
            <TouchableOpacity
              style={styles.cardPequeno}
              onPress={() => openInApp('BP On-line', 'https://www.marinha.mil.br/papem/node/207')}>
              <Text style={styles.cardTexto}>BP On-line</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cardPequeno}
              onPress={() => setBrowserNotice({ title: 'BONO Digital', url: 'https://bono.marinha.mil.br/internet' })}>
              <Text style={styles.cardTexto}>BONO Digital</Text>
            </TouchableOpacity>

            {appDocuments.map((document) => (
              <TouchableOpacity
                key={document.id}
                style={styles.cardPequeno}
                onPress={() => openDocument(document.id)}>
                <Text style={styles.cardTexto}>{document.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal transparent animationType="fade" visible={browserNotice !== null}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{browserNotice?.title}</Text>
            <Text style={styles.modalText}>Você será direcionado para o navegador.</Text>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setBrowserNotice(null)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.continueButton} onPress={confirmExternalLink}>
                <Text style={styles.continueButtonText}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  topBar: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#DADCE0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 16,
  },
  govLogo: {
    color: '#1351B4',
    fontSize: 24,
    fontWeight: '900',
  },
  topBarText: {
    color: '#555555',
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    padding: 22,
  },
  serviceBox: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DADCE0',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    padding: 20,
  },
  serviceLabel: {
    color: '#555555',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  serviceName: {
    color: '#071D41',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  serviceDescription: {
    color: '#555555',
    fontSize: 15,
    lineHeight: 22,
  },
  signInBox: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DADCE0',
    borderRadius: 8,
    borderWidth: 1,
    padding: 20,
  },
  title: {
    color: '#071D41',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 10,
  },
  subtitle: {
    color: '#555555',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  govButton: {
    alignItems: 'center',
    backgroundColor: '#1351B4',
    borderRadius: 8,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: 18,
  },
  govButtonDisabled: {
    opacity: 0.75,
  },
  govButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryButton: {
    alignItems: 'center',
    marginTop: 14,
    padding: 12,
  },
  secondaryText: {
    color: '#1351B4',
    fontSize: 14,
    fontWeight: '700',
  },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
    marginTop: 22,
    marginBottom: 10,
  },
  gridFacilidades: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  cardPequeno: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    borderRadius: 8,
    borderWidth: 1,
    padding: 15,
    width: '48%',
    alignItems: 'center',
  },
  cardTexto: {
    color: '#003366',
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  modalBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    maxWidth: 420,
    padding: 20,
    width: '100%',
  },
  modalTitle: {
    color: '#003366',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },
  modalText: {
    color: '#333333',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
  },
  cancelButton: {
    alignItems: 'center',
    borderColor: '#1351B4',
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 16,
  },
  cancelButtonText: {
    color: '#1351B4',
    fontSize: 15,
    fontWeight: '800',
  },
  continueButton: {
    alignItems: 'center',
    backgroundColor: '#1351B4',
    borderRadius: 8,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 16,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
