import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function DeclaracaoAcumuloScreen() {
  const [situacao, setSituacao] = useState<'NAO' | 'PERCEBO'>('NAO');
  const [orgaoPublico, setOrgaoPublico] = useState('');
  const [remuneracao, setRemuneracao] = useState('');
  const [loading, setLoading] = useState(false);

  // Dados do usuário obtidos do contexto/sistema
  const usuarioCpf = '00000028797';
  const nomeUsuario = 'GUILHERME SOUSA DA SILVA';
  const nipUsuario = '85856967';

  const handleEnviarDeclaracao = async () => {
    if (situacao === 'PERCEBO' && (!orgaoPublico.trim() || !remuneracao.trim())) {
      Alert.alert('Atenção', 'Por favor, preencha os órgãos pagadores e a remuneração bruta.');
      return;
    }

    try {
      setLoading(true);

      const dadosParaEnviar = {
        cpf: usuarioCpf,
        dthora: new Date().toISOString().split('T')[0], // Formato AAAA-MM-DD para o tipo date do Postgres
        situacao: situacao,
        orgaopublico: situacao === 'PERCEBO' ? orgaoPublico : null,
        remuneracao: situacao === 'PERCEBO' ? remuneracao : null,
      };

      const res = await fetch('http://localhost:8080/api/v1/proventos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaEnviar),
      });

      if (res.ok) {
        Alert.alert('Sucesso', 'Declaração enviada com sucesso!', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      } else {
        Alert.alert('Erro', 'Não foi possível salvar a declaração.');
      }
    } catch (error) {
      console.error('Erro ao enviar declaração:', error);
      Alert.alert('Erro', 'Falha na conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#003366" />

      {/* Header Fixo */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerSubtitle}>FAMÍLIA NAVAL</Text>
            <Text style={styles.headerTitle}>Declaração de Acumulação</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardMainTitle}>Declaração de Acumulação de Cargos Públicos</Text>

          <Text style={styles.declaracaoTexto}>
            Eu, <Text style={styles.bold}>{nomeUsuario}</Text>, portador(a) do NIP {nipUsuario}, CPF {usuarioCpf}, declaro, <Text style={styles.underline}>sob as penas da Lei</Text>, que, além dos Proventos percebidos, por mim, dos cofres públicos, via Marinha do Brasil, na condição de Veterano(a)/Pensionista:
          </Text>

          {/* Opção NÃO */}
          <TouchableOpacity 
            style={styles.radioOption} 
            activeOpacity={0.8}
            onPress={() => setSituacao('NAO')}
          >
            <View style={styles.radioOuter}>
              {situacao === 'NAO' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioText}>
              <Text style={styles.bold}>NÃO</Text> percebo nenhuma importância oriunda de outros cofres públicos
            </Text>
          </TouchableOpacity>

          {/* Opção PERCEBO */}
          <TouchableOpacity 
            style={styles.radioOption} 
            activeOpacity={0.8}
            onPress={() => setSituacao('PERCEBO')}
          >
            <View style={styles.radioOuter}>
              {situacao === 'PERCEBO' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioText}>
              <Text style={styles.bold}>PERCEBO</Text> provento(s) do(s) seguinte(s) cofre(s):
            </Text>
          </TouchableOpacity>

          {/* Campos condicionais se escolher PERCEBO */}
          {situacao === 'PERCEBO' && (
            <View style={styles.conditionalContainer}>
              <TextInput
                style={styles.input}
                placeholder="1º Órgão Pagador, 2º Órgão Pagador, 3º Órgão Pagador"
                placeholderTextColor="#999"
                value={orgaoPublico}
                onChangeText={setOrgaoPublico}
              />

              <Text style={styles.inputLabel}>Remuneração bruta recebida:</Text>
              <TextInput
                style={styles.input}
                placeholder="Somatório das remunerações brutas"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={remuneracao}
                onChangeText={setRemuneracao}
              />
            </View>
          )}

          {/* Botão Enviar */}
          <TouchableOpacity 
            style={styles.btnEnviar} 
            onPress={handleEnviarDeclaracao}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.btnEnviarText}>Enviar</Text>
            )}
          </TouchableOpacity>

          {/* Bloco de Avisos Importantes */}
          <View style={styles.importanteBox}>
            <Text style={styles.importanteTitle}>IMPORTANTE:</Text>
            <Text style={styles.importanteItem}>• O recebimento de parcela referente à situação de <Text style={styles.underline}>TTC</Text> não deve ser considerada para fins de acumulação;</Text>
            <Text style={styles.importanteItem}>• O SVPM verificará os princípios de legalidade, moralidade e impessoalidade quanto à situação de acumulação remunerada de cargos públicos, e o(a) informará brevemente, de acordo com as disposições legais, caso haja algo a se esclarecer;</Text>
            <Text style={styles.importanteItem}>• O SVPM vem realizando auditorias constantes, em conjunto com o TCU, a fim de preservar o patrimônio público (erário) nos pagamentos de proventos a Veteranos e seus Pensionistas.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const COLORS = {
  primary: '#003366',
  bg: '#F5F7FA',
  white: '#FFFFFF',
  text: '#222222',
  border: '#D0DCE5',
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#003366' },
  headerBar: {
    backgroundColor: '#003366',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  backButton: { marginRight: 12 },
  headerSubtitle: { color: '#B0C4DE', fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
  headerTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  scrollContent: { padding: 16, backgroundColor: COLORS.bg, flexGrow: 1 },
  cardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 3,
  },
  cardMainTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  declaracaoTexto: {
    fontSize: 13,
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: 16,
  },
  bold: { fontWeight: 'bold' },
  underline: { textDecorationLine: 'underline' },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  radioText: { fontSize: 13, color: COLORS.text, flex: 1 },
  conditionalContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    backgroundColor: '#FAFAFA',
    color: COLORS.text,
  },
  btnEnviar: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  btnEnviarText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  importanteBox: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
  },
  importanteTitle: { fontWeight: 'bold', fontSize: 12, color: COLORS.text, marginBottom: 6 },
  importanteItem: { fontSize: 11, color: '#555', lineHeight: 16, marginBottom: 4 },
});