import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

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
  warningYellow: '#EF6C00',
  warningBg: '#FFF3E0',
  inputBg: '#FAFCFF',
};

export default function RequisicaoScreen() {
  const [numeroRequisicao, setNumeroRequisicao] = useState('');
  const [consultaRealizada, setConsultaRealizada] = useState(false);

  // futuramente virá do banco/API
  const [requisicao, setRequisicao] = useState({
    numero: '2026001548',
    status: 'Em análise',
    solicitacao: 'Auxílio Transporte',
    data: '10/05/2026',
  });

  const handleConsultar = () => {
    if (!numeroRequisicao.trim()) {
      alert('Atenção: Digite o número da requisição.');
      return;
    }

    // Simulando busca e atualização dinâmica ou exibição do resultado
    setRequisicao((prev) => ({
      ...prev,
      numero: numeroRequisicao.trim(),
    }));
    setConsultaRealizada(true);
    console.log(numeroRequisicao);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#003366" />

      {/* Header Fixo padronizado */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.drawerButton}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerSubtitle}>FAMÍLIA NAVAL</Text>
            <Text style={styles.headerTitle}>Consulta de Requisição</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeaderBox}>
          <Text style={styles.sectionTitle}>Consultar Requisição</Text>
          <Text style={styles.sectionSubtitle}>
            Informe o número de registro para acompanhar o andamento.
          </Text>
        </View>

        {/* FORMULÁRIO */}
        <View style={styles.card}>
          <Text style={styles.label}>Nº da Requisição</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite somente números"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="numeric"
            value={numeroRequisicao}
            onChangeText={setNumeroRequisicao}
          />

          <Text style={styles.helperText}>Somente números</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.botaoPrimary}
            onPress={handleConsultar}
          >
            <Text style={styles.botaoPrimaryText}>Consultar</Text>
          </TouchableOpacity>
        </View>

        {/* RESULTADO */}
        {consultaRealizada && (
          <>
            <View style={[styles.sectionHeaderBox, { marginTop: 10 }]}>
              <Text style={styles.sectionTitle}>Resultado da Consulta</Text>
              <Text style={styles.sectionSubtitle}>Detalhes da solicitação localizada.</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Número</Text>
                <Text style={styles.infoValor}>{requisicao.numero}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Solicitação</Text>
                <Text style={styles.infoValor}>{requisicao.solicitacao}</Text>
              </View>

              <View style={[styles.infoRow, { borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 }]}>
                <Text style={styles.infoLabel}>Data</Text>
                <Text style={styles.infoValor}>{requisicao.data}</Text>
              </View>

              <View style={styles.statusContainer}>
                <Ionicons
                  name="time-outline"
                  size={18}
                  color={COLORS.warningYellow}
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.statusTexto}>Status: {requisicao.status}</Text>
              </View>
            </View>
          </>
        )}
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
    marginBottom: 12,
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
    borderColor: COLORS.border,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    marginBottom: 16,
    padding: 18,
  },
  label: {
    color: COLORS.textDark,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderColor: COLORS.borderLight,
    borderRadius: 10,
    borderWidth: 1,
    color: COLORS.textDark,
    fontSize: 14,
    height: 48,
    paddingHorizontal: 14,
  },
  helperText: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 6,
  },
  botaoPrimary: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    marginTop: 18,
    padding: 14,
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
  infoRow: {
    borderBottomColor: COLORS.borderLight,
    borderBottomWidth: 1,
    marginBottom: 14,
    paddingBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  infoValor: {
    color: COLORS.textDark,
    fontSize: 15,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.warningBg,
    borderRadius: 10,
    marginTop: 16,
    padding: 14,
  },
  statusTexto: {
    color: COLORS.warningYellow,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});