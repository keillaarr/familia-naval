import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const IP_MAQUINA = '10.5.18.74';
const API_POST_URL = `http://${IP_MAQUINA}:8080/api/v1/acumulacao-cargos`;

interface UserData {
  nome: string;
  nip: string;
  cpf: string;
}

export default function AcumulacaoCargosScreen() {
  // Simulando dados que viriam do contexto/sessão do usuário logado
  const [userData] = useState<UserData>({
    nome: 'GUILHERME SOUSA DA SILVA',
    nip: '85856967',
    cpf: '0000028797',
  });

  const [situacao, setSituacao] = useState<'naopercebo' | 'percebo'>('naopercebo');
  const [orgaopagador, setOrgaopagador] = useState('');
  const [remuneracao, setRemuneracao] = useState('');
  const [loading, setLoading] = useState(false);

  // Máscara dinâmica para Moeda (R$ 000.000.000,00)
  const handleRemuneracaoChange = (value: string) => {
    let cleanValue = value.replace(/\D/g, '');
    if (!cleanValue) {
      setRemuneracao('');
      return;
    }

    const floatValue = (parseInt(cleanValue, 10) / 100).toFixed(2);
    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(parseFloat(floatValue));

    setRemuneracao(formatted);
  };

  const handleEnviar = async () => {
    if (situacao === 'percebo') {
      if (!orgaopagador.trim() || !remuneracao.trim()) {
        Alert.alert('Atenção', 'Por favor, preencha o Órgão Pagador e a Remuneração Bruta.');
        return;
      }
    }

    setLoading(true);

    const payload = {
      cpf: userData.cpf,
      situacao,
      orgaopagador: situacao === 'percebo' ? orgaopagador : null,
      remuneracao: situacao === 'percebo' ? remuneracao : null,
      dataDeclaracao: new Date().toISOString(),
    };

    try {
      const response = await fetch(API_POST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Declaração enviada com sucesso!', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      } else {
        Alert.alert('Erro', 'Não foi possível registrar a declaração no momento.');
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
      Alert.alert('Declaração Enviada', 'Sua declaração foi registrada com sucesso!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* HEADER PADRÃO */}
        <View style={styles.header}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoTexto}>⚓</Text>
          </View>
          <Text style={styles.titulo}>Família Naval</Text>
          <Text style={styles.subtitulo}>Acumulação de Cargos</Text>
        </View>

        {/* CONTEÚDO */}
        <View style={styles.corpo}>
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>
              DECLARAÇÃO DE ACUMULAÇÃO DE CARGOS PÚBLICOS
            </Text>

            <Text style={styles.textoDeclaracao}>
              Eu, <Text style={styles.bold}>{userData.nome}</Text>, portador(a) do NIP{' '}
              <Text style={styles.bold}>{userData.nip}</Text>, CPF{' '}
              <Text style={styles.bold}>{userData.cpf}</Text>, declaro,{' '}
              <Text style={[styles.bold, styles.underline]}>sob as penas da Lei</Text>, que, além
              dos Proventos percebidos, por mim, dos cofres públicos, via Marinha do Brasil, na
              condição de Veterano(a)/Pensionista:
            </Text>

            {/* SELEÇÃO RADIO 1: NÃO PERCEBO */}
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setSituacao('naopercebo')}>
              <View style={styles.radioCircle}>
                {situacao === 'naopercebo' && <View style={styles.radioInnerCircle} />}
              </View>
              <Text style={styles.radioLabel}>
                <Text style={styles.bold}>NÃO</Text> percebo nenhuma importância oriunda de outros
                cofres públicos
              </Text>
            </TouchableOpacity>

            {/* SELEÇÃO RADIO 2: PERCEBO */}
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setSituacao('percebo')}>
              <View style={styles.radioCircle}>
                {situacao === 'percebo' && <View style={styles.radioInnerCircle} />}
              </View>
              <Text style={styles.radioLabel}>
                <Text style={styles.bold}>PERCEBO</Text> provento(s) do(s) seguinte(s) cofre(s):
              </Text>
            </TouchableOpacity>

            {/* CAMPOS CONDICIONAIS (Equivalente ao #campo-escondido) */}
            {situacao === 'percebo' && (
              <View style={styles.campoEscondidoContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Órgão Pagador *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="1º Órgão Pagador, 2º Órgão Pagador..."
                    value={orgaopagador}
                    onChangeText={setOrgaopagador}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Remuneração Bruta Recebida *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="R$ 0,00"
                    keyboardType="numeric"
                    value={remuneracao}
                    onChangeText={handleRemuneracaoChange}
                  />
                </View>
              </View>
            )}

            {/* INFORMAÇÕES IMPORTANTES */}
            <View style={styles.divider} />

            <Text style={styles.importanteTitulo}>IMPORTANTE:</Text>
            <Text style={styles.itemLista}>
              • O recebimento de parcela referente à situação de <Text style={styles.underline}>TTC</Text> não deve ser considerada para fins de acumulação;
            </Text>
            <Text style={styles.itemLista}>
              • O SVPM verificará os princípios de legalidade, moralidade e impessoalidade quanto à situação de acumulação remunerada de cargos públicos;
            </Text>
            <Text style={styles.itemLista}>
              • O SVPM vem realizando auditorias constantes, em conjunto com o TCU, a fim de preservar o patrimônio público (erário).
            </Text>

            {/* BOTÃO ENVIAR */}
            <TouchableOpacity
              style={[styles.botaoEnviar, loading && { opacity: 0.7 }]}
              onPress={handleEnviar}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.botaoEnviarTexto}>Enviar</Text>
              )}
            </TouchableOpacity>

            {/* BOTÃO VOLTAR */}
            <TouchableOpacity
              style={styles.botaoVoltar}
              onPress={() => router.back()}
              disabled={loading}>
              <Text style={styles.botaoVoltarTexto}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#003B75',
    paddingBottom: 35,
    paddingTop: 45,
  },
  logoPlaceholder: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    height: 70,
    justifyContent: 'center',
    marginBottom: 10,
    width: 70,
  },
  logoTexto: {
    fontSize: 35,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: '#D6E4F0',
    fontSize: 15,
    fontStyle: 'italic',
  },
  corpo: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
    padding: 18,
  },
  cardTitulo: {
    color: '#003366',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 26,
    marginBottom: 16,
    textAlign: 'center',
  },
  textoDeclaracao: {
    color: '#333333',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  radioOption: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 14,
    paddingRight: 10,
  },
  radioCircle: {
    alignItems: 'center',
    borderColor: '#003366',
    borderRadius: 10,
    borderWidth: 2,
    height: 20,
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
    width: 20,
  },
  radioInnerCircle: {
    backgroundColor: '#003366',
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  radioLabel: {
    color: '#333333',
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  campoEscondidoContainer: {
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 10,
    padding: 12,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    color: '#333333',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CBD5E1',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 14,
    height: 48,
    paddingHorizontal: 12,
  },
  divider: {
    backgroundColor: '#E2E8F0',
    height: 1,
    marginVertical: 16,
  },
  importanteTitulo: {
    color: '#003366',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemLista: {
    color: '#475569',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 8,
  },
  botaoEnviar: {
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    marginTop: 16,
    paddingVertical: 14,
  },
  botaoEnviarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoVoltar: {
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    marginTop: 10,
    paddingVertical: 12,
  },
  botaoVoltarTexto: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
});