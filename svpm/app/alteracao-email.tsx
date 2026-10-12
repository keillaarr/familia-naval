import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';

const COLORS = {
  primary: '#003366',
  primaryLight: '#EBF3FA',
  textDark: '#222222',
  textMuted: '#555555',
  border: '#D0DCE5',
  borderLight: '#E0E0E0',
  bgCard: '#FFFFFF',
  bgScreen: '#F5F7FA',
  white: '#FFFFFF',
};

const API_BASE_URL = 'http://10.0.2.2:8080/api/v1';

export default function AlteracaoEmailScreen() {
  const { usuario } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [emailEnviado, setEmailEnviado] = useState('');

  const cpfUsuario = usuario?.cpf || usuario?.pessoa?.cpfPessoa || '';
  const emailAtual = usuario?.email || usuario?.pessoa?.emailPessoa || 'email@exemplo.com';

  const handleSendEmail = async () => {
    try {
      setCarregando(true);

      const response = await fetch(`${API_BASE_URL}/pessoa/alterar-email/${cpfUsuario}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Falha ao solicitar alteração de email.');
      }

      setEmailEnviado(emailAtual);
      setIsModalVisible(true);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível enviar o link de alteração de email.');
    } finally {
      setCarregando(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#003366" />

      {/* Header Fixo Padronizado */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.drawerButton}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerSubtitle}>FAMÍLIA NAVAL</Text>
            <Text style={styles.headerTitle}>Atualização de Email</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionHeaderBox}>
          <Text style={styles.sectionTitle}>Alteração de Endereço de Email</Text>
          <Text style={styles.sectionSubtitle}>
            Mantenha seus meios de contacto atualizados com a Marinha do Brasil.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.instructions}>
            Clique no botão abaixo para enviar um link de validação e troca para o seu email cadastrado.
          </Text>

          <TouchableOpacity
            style={styles.botaoPrimary}
            onPress={handleSendEmail}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.botaoPrimaryText}>Enviar Email</Text>
            )}
          </TouchableOpacity>
        </View>

        <Modal transparent animationType="fade" visible={isModalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <TouchableOpacity style={styles.modalClose} onPress={handleCloseModal}>
                <Text style={styles.modalCloseText}>×</Text>
              </TouchableOpacity>

              <Ionicons name="checkmark-circle" size={48} color="#2E7D32" style={{ marginBottom: 10 }} />
              <Text style={styles.modalTitle}>Email enviado</Text>
              <Text style={styles.modalMessage}>Email enviado para {emailEnviado}</Text>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#003366',
  },
  headerBar: {
    backgroundColor: '#003366',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerButton: {
    marginRight: 12,
  },
  headerSubtitle: {
    color: '#b0c4de',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    backgroundColor: COLORS.bgScreen,
    flexGrow: 1,
  },
  sectionHeaderBox: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  instructions: {
    color: COLORS.textDark,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  botaoPrimary: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  botaoPrimaryText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    position: 'relative',
    elevation: 5,
  },
  modalClose: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    fontSize: 24,
    color: COLORS.textMuted,
    lineHeight: 28,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});