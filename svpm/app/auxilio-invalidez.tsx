import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
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

export default function AuxilioInvalidezScreen() {
  const [exerceAtividade, setExerceAtividade] = useState<boolean>(false);
  const [cienteTermos, setCienteTermos] = useState<boolean>(false);
  const [loadingCep, setLoadingCep] = useState<boolean>(false);
  const [loadingDadosBanco, setLoadingDadosBanco] = useState<boolean>(true);
  const [editandoEndereco, setEditandoEndereco] = useState<boolean>(false);

  const [form, setForm] = useState({
    cep: '',
    endereco: '',
    bairro: '',
    cidade: '',
    uf: '',
    telefone: '',
    email: '',
  });

  useEffect(() => {
    const carregarDadosDoBanco = async () => {
      try {
        setTimeout(() => {
          setForm({
            cep: '21041-190',
            endereco: 'Rua Engenheiro Artur Moura, 456, BL6 AP405',
            bairro: 'Bonsucesso',
            cidade: 'Rio de Janeiro',
            uf: 'RJ',
            telefone: '(21) 98032-4930',
            email: 'usuario@marinha.mil.br',
          });
          setLoadingDadosBanco(false);
        }, 800);
      } catch (error) {
        setLoadingDadosBanco(false);
      }
    };

    carregarDadosDoBanco();
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhoneChange = (value: string) => {
    const raw = value.replace(/\D/g, '');
    let formatted = raw;

    if (raw.length > 10) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7, 11)}`;
    } else if (raw.length > 6) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6, 10)}`;
    } else if (raw.length > 2) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    } else if (raw.length > 0) {
      formatted = `(${raw}`;
    }

    handleChange('telefone', formatted);
  };

  const handleCepChange = async (value: string) => {
    const rawCep = value.replace(/\D/g, '');
    let formattedCep = rawCep;
    if (rawCep.length > 5) {
      formattedCep = `${rawCep.slice(0, 5)}-${rawCep.slice(5, 8)}`;
    }
    handleChange('cep', formattedCep);

    if (rawCep.length === 8) {
      setLoadingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setForm((prev) => ({
            ...prev,
            endereco: data.logradouro || prev.endereco,
            bairro: data.bairro || prev.bairro,
            cidade: data.localidade || prev.cidade,
            uf: data.uf || prev.uf,
          }));
        }
      } catch (e) {
        // Ignora erro de rede silenciosamente
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleEnviar = () => {
    if (!form.cep || !form.endereco || !form.cidade || !form.telefone) {
      Alert.alert('Campos Obrigatórios', 'Por favor, preencha os dados de endereço e telefone.');
      return;
    }

    if (!cienteTermos) {
      Alert.alert('Atenção', 'Você deve confirmar estar ciente dos termos da declaração antes de enviar.');
      return;
    }

    if (exerceAtividade) {
      Alert.alert(
        'Declaração Registrada',
        'Sua declaração indicando o exercício de atividade remunerada foi enviada. O SVPM analisará as informações prestadas.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } else {
      Alert.alert(
        'Declaração Enviada',
        'Sua Declaração Anual de Auxílio-Invalidez foi transmitida com sucesso.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#003366" />

      {/* Header Fixo Padronizado Família Naval */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerSubtitle}>FAMÍLIA NAVAL</Text>
            <Text style={styles.headerTitle}>Auxílio-Invalidez</Text>
          </View>
        </View>
        <Ionicons name="medkit-outline" size={20} color="#B0C4DE" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* CARD PRINCIPAL */}
        <View style={styles.cardItem}>
          <View style={styles.docHeaderBadge}>
            <Ionicons name="document-text-outline" size={22} color={COLORS.primary} />
            <Text style={styles.docTitle}>
              DECLARAÇÃO ANUAL PARA PERCEPÇÃO DO AUXÍLIO-INVALIDEZ
            </Text>
          </View>

          <Text style={styles.declarationText}>
            Eu, <Text style={styles.boldText}>SO GUILHERME SOUSA DA SILVA</Text>, portador(a) do NIP{' '}
            <Text style={styles.boldText}>85856967</Text>, CPF{' '}
            <Text style={styles.boldText}>00000028797</Text>, recebendo a Parcela de Auxílio-Invalidez por
            intermédio do SERVIÇO DE VETERANOS E PENSIONISTAS DA MARINHA, declaro, para fins do artigo 78 do
            DECRETO nº. 4.307 de 18 de julho de 2002, que:
          </Text>

          {/* PERGUNTA CHAVE (SEGMENTED BUTTONS) */}
          <View style={styles.questionBox}>
            <Text style={styles.questionText}>
              Exerce atividade remunerada pública ou privada?
            </Text>
            <View style={styles.segmentedContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.segmentBtn, !exerceAtividade && styles.segmentActiveNo]}
                onPress={() => setExerceAtividade(false)}>
                <Text style={[styles.segmentText, !exerceAtividade && styles.segmentTextActive]}>
                  NÃO EXERÇO
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.segmentBtn, exerceAtividade && styles.segmentActiveYes]}
                onPress={() => setExerceAtividade(true)}>
                <Text style={[styles.segmentText, exerceAtividade && styles.segmentTextActive]}>
                  EXERÇO
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* AVISOS LEGAIS COM CHECKBOX OBRIGATÓRIA */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.infoBox, cienteTermos && styles.infoBoxChecked]}
            onPress={() => setCienteTermos(!cienteTermos)}>
            <View style={styles.checkboxRow}>
              <View style={[styles.checkbox, cienteTermos && styles.checkboxChecked]}>
                {cienteTermos && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
              </View>
              <Text style={styles.checkboxLabel}>Declaro que estou ciente (Obrigatório):</Text>
            </View>
            <Text style={styles.infoText}>
              • Estou ciente de que, anualmente, deverei fazer chegar ao SVPM nova Declaração, para ratificar ou não esta situação.
            </Text>
            <Text style={[styles.infoText, { marginTop: 4 }]}>
              • Estou ciente de que o não atendimento desta exigência implicará na retirada da parcela da minha remuneração mensal.
            </Text>
          </TouchableOpacity>

          {/* CABEÇALHO DA SEÇÃO DE ENDEREÇO */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeader}>Dados de Contato e Endereço</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnEditar}
              onPress={() => setEditandoEndereco(!editandoEndereco)}>
              <Ionicons
                name={editandoEndereco ? 'lock-closed-outline' : 'create-outline'}
                size={14}
                color={COLORS.primary}
                style={{ marginRight: 4 }}
              />
              <Text style={styles.btnEditarTexto}>
                {editandoEndereco ? 'Bloquear' : 'Editar'}
              </Text>
            </TouchableOpacity>
          </View>

          {loadingDadosBanco ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={styles.loadingText}>Buscando endereço cadastrado...</Text>
            </View>
          ) : (
            <>
              {/* CEP */}
              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>CEP</Text>
                  {loadingCep && <ActivityIndicator size="small" color={COLORS.primary} />}
                </View>
                <TextInput
                  style={[styles.input, !editandoEndereco && styles.inputDisabled]}
                  placeholder="00000-000"
                  keyboardType="numeric"
                  maxLength={9}
                  editable={editandoEndereco}
                  value={form.cep}
                  onChangeText={handleCepChange}
                />
              </View>

              {/* ENDEREÇO */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Endereço (Rua, Nº, Apto, etc.)</Text>
                <TextInput
                  style={[styles.input, !editandoEndereco && styles.inputDisabled]}
                  placeholder="Rua, Número, Complemento"
                  editable={editandoEndereco}
                  value={form.endereco}
                  onChangeText={(t) => handleChange('endereco', t)}
                />
              </View>

              {/* BAIRRO */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Bairro</Text>
                <TextInput
                  style={[styles.input, !editandoEndereco && styles.inputDisabled]}
                  placeholder="Bairro"
                  editable={editandoEndereco}
                  value={form.bairro}
                  onChangeText={(t) => handleChange('bairro', t)}
                />
              </View>

              {/* CIDADE */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Cidade</Text>
                <TextInput
                  style={[styles.input, !editandoEndereco && styles.inputDisabled]}
                  placeholder="Cidade"
                  editable={editandoEndereco}
                  value={form.cidade}
                  onChangeText={(t) => handleChange('cidade', t)}
                />
              </View>

              {/* UF */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>UF</Text>
                <TextInput
                  style={[styles.input, !editandoEndereco && styles.inputDisabled]}
                  placeholder="RJ"
                  maxLength={2}
                  autoCapitalize="characters"
                  editable={editandoEndereco}
                  value={form.uf}
                  onChangeText={(t) => handleChange('uf', t)}
                />
              </View>

              {/* TELEFONE */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Telefone</Text>
                <TextInput
                  style={[styles.input, !editandoEndereco && styles.inputDisabled]}
                  placeholder="(00) 00000-0000"
                  keyboardType="phone-pad"
                  maxLength={15}
                  editable={editandoEndereco}
                  value={form.telefone}
                  onChangeText={handlePhoneChange}
                />
              </View>

              {/* EMAIL */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                  style={[styles.input, !editandoEndereco && styles.inputDisabled]}
                  placeholder="seu@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={editandoEndereco}
                  value={form.email}
                  onChangeText={(t) => handleChange('email', t)}
                />
              </View>
            </>
          )}

          {/* AÇÕES */}
          <TouchableOpacity activeOpacity={0.8} style={styles.btnPrimary} onPress={handleEnviar}>
            <Text style={styles.btnPrimaryText}>Enviar Declaração</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} style={styles.btnSecondary} onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={16} color={COLORS.textMuted} style={{ marginRight: 6 }} />
            <Text style={styles.btnSecondaryText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const COLORS = {
  primary: '#003366',
  primaryLight: '#EBF3FA',
  bg: '#F5F7FA',
  white: '#FFFFFF',
  text: '#222222',
  textMuted: '#555555',
  border: '#D0DCE5',
  borderLight: '#E0E0E0',
};

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
    paddingVertical: 14,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  headerSubtitle: {
    color: '#B0C4DE',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    backgroundColor: COLORS.bg,
    flexGrow: 1,
  },
  cardItem: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  docHeaderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#C5DDF3',
  },
  docTitle: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
    lineHeight: 18,
  },
  declarationText: {
    color: COLORS.text,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
    textAlign: 'justify',
  },
  boldText: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  questionBox: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    borderColor: COLORS.borderLight,
    borderWidth: 1,
  },
  questionText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    padding: 4,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  segmentActiveNo: {
    backgroundColor: COLORS.primary,
  },
  segmentActiveYes: {
    backgroundColor: '#D32F2F',
  },
  segmentText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4A5568',
  },
  segmentTextActive: {
    color: '#FFFFFF',
  },
  infoBox: {
    backgroundColor: '#FFF8E1',
    borderColor: '#FFE082',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  infoBoxChecked: {
    backgroundColor: '#FEF9E7',
    borderColor: '#F6C343',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#795548',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkboxLabel: {
    color: '#5D4037',
    fontSize: 13,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#5D4037',
    fontSize: 12,
    lineHeight: 18,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    paddingBottom: 8,
  },
  sectionHeader: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  btnEditar: {
    backgroundColor: COLORS.primaryLight,
    borderColor: '#C5DDF3',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnEditarTexto: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: COLORS.textMuted,
    fontSize: 13,
  },
  inputGroup: {
    marginBottom: 12,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 14,
    height: 44,
    paddingHorizontal: 12,
    color: COLORS.text,
  },
  inputDisabled: {
    backgroundColor: '#F0F4F8',
    color: COLORS.textMuted,
    borderColor: COLORS.border,
  },
  btnPrimary: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  btnSecondary: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  btnSecondaryText: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: 'bold',
  },
});