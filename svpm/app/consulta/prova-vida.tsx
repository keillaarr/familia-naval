import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
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
  greenSuccess: '#2E7D32',
  greenBg: '#E8F5E9',
};

export default function ProvaVidaScreen() {
  // futuramente virá da API
  const [dados] = useState({
    ultimoRecadastramento: '05 de maio de 2026',
    proximoRecadastramento: 'maio de 2027',
    situacao: 'Regular',
  });

  const handleAtualizarDados = () => {
    Alert.alert(
      'Atualização de Prova de Vida',
      'Deseja iniciar o processo de recadastramento/atualização de prova de vida?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Continuar',
          onPress: () =>
            Alert.alert('Informação', 'Redirecionando para o fluxo de biometria/atualização...'),
        },
      ]
    );
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
            <Text style={styles.headerTitle}>Consulta de Prova de Vida</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeaderBox}>
          <Text style={styles.sectionTitle}>Informações do Recadastramento</Text>
          <Text style={styles.sectionSubtitle}>
            Consulte o status e as datas do seu recadastramento anual.
          </Text>
        </View>

        <View style={styles.card}>
          {/* ÚLTIMO */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Último Recadastramento</Text>
            <Text style={styles.valor}>{dados.ultimoRecadastramento}</Text>
          </View>

          {/* PRÓXIMO */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Próximo Recadastramento</Text>
            <Text style={styles.valor}>{dados.proximoRecadastramento}</Text>
          </View>

          {/* SITUAÇÃO */}
          <View style={styles.statusContainer}>
            <Ionicons
              name="checkmark-circle-outline"
              size={18}
              color={COLORS.greenSuccess}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.statusTexto}>
              Situação: {dados.situacao}
            </Text>
          </View>
        </View>

        {/* BOTÃO */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.botaoPrimary}
          onPress={handleAtualizarDados}
        >
          <Text style={styles.botaoPrimaryText}>Atualizar Dados</Text>
        </TouchableOpacity>
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
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    padding: 18,
  },
  infoRow: {
    borderBottomColor: COLORS.borderLight,
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  valor: {
    color: COLORS.textDark,
    fontSize: 15,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.greenBg,
    borderRadius: 10,
    marginTop: 4,
    padding: 14,
  },
  statusTexto: {
    color: COLORS.greenSuccess,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botaoPrimary: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    marginTop: 24,
    padding: 16,
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
});