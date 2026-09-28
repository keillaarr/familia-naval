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
  accentBlue: '#00509E',
};

export default function AuxilioInvalidezScreen() {
  const [dados] = useState({
    ultimaDeclaracao: '05/2026',
    proximaDeclaracao: '01/2027',
    situacao: 'Regular',
    detalheSituacao: 'Último envio registrado em 05/2026.',
  });

  const handleEnviarDeclaracao = () => {
    Alert.alert(
      'Enviar Declaração',
      'Deseja prosseguir com o envio da nova declaração de Auxílio Invalidez?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () =>
            Alert.alert('Sucesso', 'Nova declaração enviada com sucesso!'),
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
            <Text style={styles.headerTitle}>Auxílio Invalidez</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Banner / Resumo em Destaque */}
        <View style={styles.heroBanner}>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTag}>CONTROLE ANUAL / SEMESTRAL</Text>
            <Text style={styles.heroTitle}>Declaração de Auxílio-Invalidez</Text>
            <Text style={styles.heroDesc}>
              Mantenha sua regularidade para evitar suspensão do benefício.
            </Text>
          </View>
          <View style={styles.heroIconBox}>
            <Ionicons name="medkit-outline" size={28} color={COLORS.primary} />
          </View>
        </View>

        <View style={styles.sectionHeaderBox}>
          <Text style={styles.sectionTitle}>Situação do Benefício</Text>
          <Text style={styles.sectionSubtitle}>
            Histórico de prazos e status atual regimental.
          </Text>
        </View>

        {/* Layout em Grid / Cards Compactos Lado a Lado para Datas */}
        <View style={styles.rowGrid}>
          <View style={[styles.card, styles.gridCard]}>
            <View style={styles.badgeIconSmall}>
              <Ionicons name="calendar-outline" size={18} color={COLORS.primary} />
            </View>
            <Text style={styles.gridLabel}>Última Declaração</Text>
            <Text style={styles.gridValor}>{dados.ultimaDeclaracao}</Text>
          </View>

          <View style={[styles.card, styles.gridCard]}>
            <View style={[styles.badgeIconSmall, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="calendar-sharp" size={18} color={COLORS.accentBlue} />
            </View>
            <Text style={styles.gridLabel}>Próxima Entrega</Text>
            <Text style={styles.gridValor}>{dados.proximaDeclaracao}</Text>
          </View>
        </View>

        {/* Card de Status Destacado */}
        <View style={styles.card}>
          <View style={styles.statusHeaderRow}>
            <Text style={styles.label}>Situação Atual</Text>
            <View style={styles.badgeSuccessInline}>
              <Ionicons name="checkmark-circle" size={14} color={COLORS.greenSuccess} />
              <Text style={styles.badgeSuccessText}>{dados.situacao}</Text>
            </View>
          </View>
          <Text style={styles.subtextDetalhe}>{dados.detalheSituacao}</Text>
        </View>

        {/* Card Informativo Rápido */}
        <View style={styles.infoCardNote}>
          <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} style={{ marginRight: 10, marginTop: 2 }} />
          <Text style={styles.infoNoteText}>
            Lembre-se de anexar laudo médico atualizado caso haja exigência em edital ou convocação específica do SVPM.
          </Text>
        </View>

        {/* BOTÃO */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.botaoPrimary}
          onPress={handleEnviarDeclaracao}
        >
          <Ionicons name="send-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.botaoPrimaryText}>Enviar Nova Declaração</Text>
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
  heroBanner: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#C5DDF3',
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  heroTextContainer: {
    flex: 1,
    paddingRight: 12,
  },
  heroTag: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  heroTitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroDesc: {
    color: COLORS.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },
  heroIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
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
  rowGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  gridCard: {
    flex: 1,
    marginBottom: 0,
    padding: 14,
  },
  badgeIconSmall: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EBF3FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  gridLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  gridValor: {
    color: COLORS.textDark,
    fontSize: 16,
    fontWeight: 'bold',
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
    marginBottom: 14,
  },
  statusHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  badgeSuccessInline: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.greenBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  badgeSuccessText: {
    color: COLORS.greenSuccess,
    fontSize: 12,
    fontWeight: 'bold',
  },
  subtextDetalhe: {
    color: COLORS.textDark,
    fontSize: 14,
    fontWeight: '500',
  },
  infoCardNote: {
    flexDirection: 'row',
    backgroundColor: '#FFFDE7',
    borderColor: '#FFF59D',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginTop: 4,
    marginBottom: 8,
  },
  infoNoteText: {
    color: '#827717',
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
  botaoPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    marginTop: 16,
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