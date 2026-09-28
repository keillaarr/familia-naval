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
  warningBg: '#FFF8E1',
  warningBorder: '#FFE082',
  warningTitle: '#795548',
  warningText: '#5D4037',
  inputBg: '#FAFCFF',
};

export default function DACPScreen() {
  const [jaPossuiDeclaracao, setJaPossuiDeclaracao] = useState(true);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [perceboOutrosProventos, setPerceboOutrosProventos] = useState<'NAO' | 'SIM' | null>(null);

  const usuario = {
    nome: 'GUILHERME SOUSA DA SILVA',
    nip: '85856967',
    cpf: '000.000.287-97',
    condicao: 'Veterano(a)/Pensionista',
  };

  const handleEnviar = () => {
    if (!perceboOutrosProventos) {
      Alert.alert('Atenção', 'Selecione se percebe ou não proventos de outros cofres públicos.');
      return;
    }

    Alert.alert(
      'Declaração Enviada',
      'Sua Declaração de Acumulação de Cargos Públicos foi registada com sucesso.',
      [
        {
          text: 'OK',
          onPress: () => {
            setJaPossuiDeclaracao(true);
            setModoEdicao(false);
          },
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
          <TouchableOpacity
            onPress={() => {
              if (jaPossuiDeclaracao && modoEdicao) {
                setModoEdicao(false);
              } else {
                router.back();
              }
            }}
            style={styles.drawerButton}
          >
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerSubtitle}>FAMÍLIA NAVAL</Text>
            <Text style={styles.headerTitle}>Acumulação de Cargos Públicos</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {jaPossuiDeclaracao && !modoEdicao ? (
          <>
            <View style={styles.sectionHeaderBox}>
              <Text style={styles.sectionTitle}>Status da Declaração</Text>
              <Text style={styles.sectionSubtitle}>DACP registrada no sistema.</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.statusBox}>
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color={COLORS.primary}
                  style={{ marginBottom: 8 }}
                />
                <Text style={styles.statusText}>
                  Prezado(a) Usuário(a), participa-se que consta em nosso sistema a declaração de acumulação de cargos públicos.
                </Text>
                <Text style={[styles.statusText, { fontWeight: 'bold', marginTop: 10 }]}>
                  Deseja atualizar?
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.botaoPrimary}
                onPress={() => setModoEdicao(true)}
              >
                <Text style={styles.botaoPrimaryText}>Atualizar Declaração</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <View style={styles.sectionHeaderBox}>
              <Text style={styles.sectionTitle}>Nova Declaração (DACP)</Text>
              <Text style={styles.sectionSubtitle}>Preencha os dados abaixo sob as penas da lei.</Text>
            </View>

            <View style={styles.card}>
              {/* IDENTIFICAÇÃO E DECLARAÇÃO */}
              <View style={styles.declaracaoBox}>
                <Text style={styles.declaracaoText}>
                  Eu, <Text style={styles.boldText}>{usuario.nome}</Text>, portador(a) do NIP{' '}
                  <Text style={styles.boldText}>{usuario.nip}</Text>, CPF{' '}
                  <Text style={styles.boldText}>{usuario.cpf}</Text>, declaro,{' '}
                  <Text style={styles.underlineText}>sob as penas da Lei</Text>, que, além dos Proventos
                  percebidos, por mim, dos cofres públicos, via Marinha do Brasil, na condição de{' '}
                  <Text style={styles.boldText}>{usuario.condicao}</Text>:
                </Text>
              </View>

              {/* OPÇÕES DE SELEÇÃO */}
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.optionCard,
                    perceboOutrosProventos === 'NAO' && styles.optionCardSelected,
                  ]}
                  onPress={() => setPerceboOutrosProventos('NAO')}
                >
                  <View style={styles.radioOuter}>
                    {perceboOutrosProventos === 'NAO' && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.optionText}>
                    <Text style={styles.boldText}>NÃO</Text> percebo nenhuma importância oriunda de outros cofres públicos.
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.optionCard,
                    perceboOutrosProventos === 'SIM' && styles.optionCardSelected,
                  ]}
                  onPress={() => setPerceboOutrosProventos('SIM')}
                >
                  <View style={styles.radioOuter}>
                    {perceboOutrosProventos === 'SIM' && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.optionText}>
                    <Text style={styles.boldText}>PERCEBO</Text> provento(s) do(s) seguinte(s) cofre(s).
                  </Text>
                </TouchableOpacity>
              </View>

              {/* BOTÃO ENVIAR */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.botaoPrimary}
                onPress={handleEnviar}
              >
                <Text style={styles.botaoPrimaryText}>Enviar Declaração</Text>
              </TouchableOpacity>
            </View>

            {/* AVISOS IMPORTANTES */}
            <View style={styles.warningBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <Ionicons name="information-circle-outline" size={16} color={COLORS.warningTitle} style={{ marginRight: 4 }} />
                <Text style={styles.warningTitle}>IMPORTANTE:</Text>
              </View>
              <Text style={styles.warningItem}>
                • O recebimento de parcela referente à situação de <Text style={styles.underlineText}>TTC</Text> não deve ser considerada para fins de acumulação.
              </Text>
              <Text style={styles.warningItem}>
                • O SVPM verificará os princípios de legalidade, moralidade e impessoalidade quanto à situação de acumulação remunerada de cargos públicos, e o(a) informará brevemente, de acordo com as disposições legais, caso haja algo a se esclarecer.
              </Text>
              <Text style={styles.warningItem}>
                • O SVPM vem realizando auditorias constantes, em conjunto com o TCU, a fim de preservar o patrimônio público (erário) nos pagamentos de proventos a Veteranos e seus Pensionistas.
              </Text>
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
    padding: 18,
  },
  statusBox: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.border,
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
  },
  statusText: {
    color: COLORS.textDark,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  declaracaoBox: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 10,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    marginBottom: 16,
  },
  declaracaoText: {
    color: COLORS.textDark,
    fontSize: 13,
    lineHeight: 20,
  },
  boldText: {
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  underlineText: {
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  optionsContainer: {
    gap: 10,
    marginBottom: 8,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderColor: COLORS.borderLight,
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
  },
  optionCardSelected: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
    borderWidth: 1.5,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  optionText: {
    color: COLORS.textDark,
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  warningBox: {
    backgroundColor: COLORS.warningBg,
    borderColor: COLORS.warningBorder,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
  },
  warningTitle: {
    color: COLORS.warningTitle,
    fontSize: 12,
    fontWeight: 'bold',
  },
  warningItem: {
    color: COLORS.warningText,
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 6,
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
});