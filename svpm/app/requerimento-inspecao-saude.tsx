import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

// --- PALETA DE CORES / TEMA PADronizada ---
const COLORS = {
  primary: '#003366',
  primaryLight: '#EBF3FA',
  primaryBadge: '#D6E4F0',
  textDark: '#222222',
  textMuted: '#555555',
  border: '#D0DCE5',
  borderLight: '#E0E0E0',
  bgCard: '#FFFFFF',
  bgScreen: '#f5f7fa',
  white: '#FFFFFF',
  warningBg: '#FFF8E1',
  warningBorder: '#FFE082',
  warningText: '#5D4037',
  danger: '#D32F2F',
  grayBtn: '#E0E0E0',
};

// --- TIPOS ---
interface Beneficio {
  id: string;
  quemPodePedir: string;
  titulo: string;
  descricao: string;
}

interface RequerenteState {
  nome: string;
  nip: string;
  postoGraduacao: string;
  quadroEspecialidade: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  complemento: string;
  telefone: string;
  celular: string;
  email: string;
}

// --- DADOS ESTÁTICOS ---
const BENEFICIOS_LISTA: Beneficio[] = [
  {
    id: 'isencao_ir',
    quemPodePedir: 'Militar Rrm / Refº',
    titulo: 'ISENÇÃO DO PAGAMENTO DE IMPOSTO DE RENDA NA FONTE',
    descricao:
      'Faz jus o militar reformado por acidente em serviço ou doença profissional/ocupacional, ou, ainda, por ser portador de tuberculose ativa; alienação mental; esclerose múltipla; neoplasia maligna; cegueira; hanseníase; paralisia irreversível e incapacitante; cardiopatia grave; doença de parkinson; espondiloartrose anquilosante; hepatopatia grave; nefropatia grave; estado avançado de doença de paget (osteíte deformante); contaminação por radiação ionizante; síndrome da imunodeficiência adquirida (SIDA/AIDS) e mucoviscidose, de acordo com o art. 6º, inciso XIV, da Lei nº 7.713/1988.',
  },
  {
    id: 'reforma_rm1',
    quemPodePedir: 'Militar RRm',
    titulo: 'REFORMA DE MILITAR DA RM1',
    descricao:
      'Somente faz jus o militar que se encontra na reserva remunerada com o estado de saúde debilitado, de modo a ser reformado por incapacidade para o serviço ativo em caráter definitivo.',
  },
  {
    id: 'revisao_acidente',
    quemPodePedir: 'Militar Ref por acidente/doença relacionada ao serviço',
    titulo: 'REVISÃO DE REFORMA RELACIONADA AO SERVIÇO',
    descricao:
      'Faz jus o militar reformado por motivo de acidente, ferimento ou moléstia decorrente de atividade militar, que tenha sua condição de saúde agravada com relação de causalidade com aquele ferimento ou moléstia, de forma a ser considerado inválido.',
  },
  {
    id: 'revisao_aids',
    quemPodePedir: 'Militar Ref por SIDA/AIDS',
    titulo: 'REVISÃO DE REFORMA AOS PORTADORES DE SIDA/AIDS',
    descricao:
      'É a inspeção de saúde que visa verificar se o militar reformado por incapacidade, em virtude da infecção pelo HIV ou SIDA/AIDS, teve suas condições de saúde agravadas, gerando invalidez.',
  },
  {
    id: 'auxilio_invalidez',
    quemPodePedir: 'Militar Refº',
    titulo: 'AUXÍLIO-INVALIDEZ',
    descricao:
      'Faz jus o militar considerado inválido, necessitando de internação permanente em instituição apropriada e/ou cuidados permanentes de enfermagem.',
  },
];

// --- COMPONENTE PRINCIPAL ---
export default function RequerimentoInspecaoSaudeScreen() {
  const [beneficioSelecionado, setBeneficioSelecionado] = useState<string | null>(null);
  const [declaracaoCiente, setDeclaracaoCiente] = useState<boolean>(false);
  const [receberComunicacao, setReceberComunicacao] = useState<'SIM' | 'NAO'>('SIM');
  const [editandoEndereco, setEditandoEndereco] = useState<boolean>(false);
  const [loadingCep, setLoadingCep] = useState<boolean>(false);

  const [requerente, setRequerente] = useState<RequerenteState>({
    nome: 'GUILHERME SOUSA DA SILVA',
    nip: '85856967',
    postoGraduacao: '3SG',
    quadroEspecialidade: 'CAP',
    cep: '20760-245',
    logradouro: 'Endereço',
    numero: '1921',
    bairro: 'Inhaúma',
    cidade: 'Rio de Janeiro',
    complemento: 'Casa 3',
    telefone: '2122697027',
    celular: '21987853291',
    email: '',
  });

  const handleChange = (field: keyof RequerenteState, value: string) => {
    setRequerente((prev) => ({ ...prev, [field]: value }));
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
          setRequerente((prev) => ({
            ...prev,
            logradouro: data.logradouro || prev.logradouro,
            bairro: data.bairro || prev.bairro,
            cidade: data.localidade || prev.cidade,
          }));
        }
      } catch (e) {
        // Tratar erro silenciosamente
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleEnviar = () => {
    if (!beneficioSelecionado) {
      Alert.alert('Atenção', 'Selecione qual benefício é pretendido no requerimento.');
      return;
    }

    if (!declaracaoCiente) {
      Alert.alert('Aviso', 'Marque a opção confirmando ciência das informações deste formulário.');
      return;
    }

    Alert.alert(
      'Requerimento Enviado',
      'Seu Requerimento de Inspeção de Saúde foi registrado com sucesso no SVPM.',
      [{ text: 'OK', onPress: () => router.back() }]
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
            <Text style={styles.headerTitle}>Inspeção de Saúde</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* CARD PRINCIPAL */}
        <View style={styles.card}>
          <Text style={styles.docTitle}>
            REQUERIMENTO DE INSPEÇÃO DE SAÚDE PARA CONCESSÃO DE BENEFÍCIO AOS MILITARES VETERANOS
          </Text>

          {/* SEÇÃO 1: DADOS DO REQUERENTE */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeaderTitle}>1) Dados do Requerente a ser Inspecionado</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnEditar}
              onPress={() => setEditandoEndereco(!editandoEndereco)}>
              <Text style={styles.btnEditarTexto}>
                {editandoEndereco ? '🔒 Bloquear' : '✏️ Editar Dados'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dadosBox}>
            <View style={styles.row}>
              <FormInput
                label="Nome Completo"
                value={requerente.nome}
                editable={false}
                flex={2}
              />
              <FormInput
                label="NIP"
                value={requerente.nip}
                editable={false}
                flex={1}
              />
            </View>

            <View style={styles.row}>
              <FormInput
                label="Posto/Graduação"
                value={requerente.postoGraduacao}
                editable={false}
                flex={1}
              />
              <FormInput
                label="Quadro/Especialidade"
                value={requerente.quadroEspecialidade}
                editable={false}
                flex={1}
              />
            </View>

            <View style={styles.row}>
              <FormInput
                label="CEP"
                value={requerente.cep}
                editable={editandoEndereco}
                onChangeText={handleCepChange}
                keyboardType="numeric"
                maxLength={9}
                flex={1}
                loading={loadingCep}
              />
              <FormInput
                label="Logradouro"
                value={requerente.logradouro}
                editable={editandoEndereco}
                onChangeText={(t) => handleChange('logradouro', t)}
                flex={2}
              />
            </View>

            <View style={styles.row}>
              <FormInput
                label="Número"
                value={requerente.numero}
                editable={editandoEndereco}
                onChangeText={(t) => handleChange('numero', t)}
                flex={1}
              />
              <FormInput
                label="Complemento"
                value={requerente.complemento}
                editable={editandoEndereco}
                onChangeText={(t) => handleChange('complemento', t)}
                flex={1}
              />
              <FormInput
                label="Bairro"
                value={requerente.bairro}
                editable={editandoEndereco}
                onChangeText={(t) => handleChange('bairro', t)}
                flex={1}
              />
            </View>

            <View style={styles.row}>
              <FormInput
                label="Cidade"
                value={requerente.cidade}
                editable={editandoEndereco}
                onChangeText={(t) => handleChange('cidade', t)}
                flex={1}
              />
              <FormInput
                label="Telefone"
                value={requerente.telefone}
                editable={editandoEndereco}
                onChangeText={(t) => handleChange('telefone', t)}
                keyboardType="phone-pad"
                flex={1}
              />
              <FormInput
                label="Celular"
                value={requerente.celular}
                editable={editandoEndereco}
                onChangeText={(t) => handleChange('celular', t)}
                keyboardType="phone-pad"
                flex={1}
              />
            </View>

            <FormInput
              label="E-mail (Opcional)"
              value={requerente.email}
              editable={editandoEndereco}
              onChangeText={(t) => handleChange('email', t)}
              keyboardType="email-address"
              placeholder="Ex: nome@email.com"
            />
          </View>

          {/* SEÇÃO 2: BENEFÍCIOS PRETENDIDOS */}
          <Text style={styles.sectionHeaderTitle}>2) Benefícios Pretendidos (Selecione 1)</Text>
          <View style={styles.beneficiosContainer}>
            {BENEFICIOS_LISTA.map((beneficio) => (
              <BeneficioCard
                key={beneficio.id}
                beneficio={beneficio}
                selecionado={beneficioSelecionado === beneficio.id}
                onSelect={() => setBeneficioSelecionado(beneficio.id)}
              />
            ))}
          </View>

          {/* SEÇÃO 3: OBSERVAÇÕES IMPORTANTES */}
          <View style={styles.warningBox}>
            <Text style={styles.warningTitle}>3) OBSERVAÇÕES IMPORTANTES:</Text>
            <Text style={styles.warningItem}>
              a) Os documentos médicos e/ou hospitalares deverão ser apresentados à instrução da perícia médica no primeiro comparecimento à junta de saúde, não havendo necessidade de serem anexados a este requerimento.
            </Text>
            <Text style={styles.warningItem}>
              b) Competência para determinar inspeção de saúde:
              {'\n'}• DPM: militares da RM1, reformados e falecidos.
              {'\n'}• CPesFN: militares Fuzileiros Navais da RM1, reformados e falecidos.
              {'\n'}• SVPM: pensionistas, ex-combatentes, dependentes e beneficiários de militares veteranos.
            </Text>
            <Text style={styles.warningItem}>
              c) Procedimentos para recurso de inspeção de saúde:
              {'\n'}• Recursos de 1ª instância serão endereçados aos DN/SVPM.
              {'\n'}• Recursos de Última Instância serão endereçados ao DGPM.
            </Text>
          </View>

          {/* SEÇÃO 4: DECLARAÇÕES */}
          <Text style={styles.sectionHeaderTitle}>4) Declaro o seguinte:</Text>

          {/* CHECKBOX */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.checkboxRow}
            onPress={() => setDeclaracaoCiente(!declaracaoCiente)}>
            <View style={[styles.checkboxBox, declaracaoCiente && styles.checkboxAtivo]}>
              {declaracaoCiente && <Text style={styles.checkboxCheck}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>
              Li e estou ciente de todas as informações constantes deste formulário.
            </Text>
          </TouchableOpacity>

          {/* PERGUNTA CANAL DE COMUNICAÇÃO */}
          <View style={styles.comunicacaoBox}>
            <Text style={styles.comunicacaoLabel}>
              Desejo receber a comunicação dos atos referentes a este requerimento por e-mail/aplicativo SVPM?
            </Text>
            <View style={styles.segmentedContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.segmentBtn, receberComunicacao === 'SIM' && styles.segmentActiveYes]}
                onPress={() => setReceberComunicacao('SIM')}>
                <Text style={[styles.segmentText, receberComunicacao === 'SIM' && styles.segmentTextActive]}>
                  SIM
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.segmentBtn, receberComunicacao === 'NAO' && styles.segmentActiveNo]}
                onPress={() => setReceberComunicacao('NAO')}>
                <Text style={[styles.segmentText, receberComunicacao === 'NAO' && styles.segmentTextActive]}>
                  NÃO
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* BOTÕES DE AÇÃO */}
          <TouchableOpacity activeOpacity={0.8} style={styles.btnPrimary} onPress={handleEnviar}>
            <Text style={styles.btnPrimaryText}>Enviar Requerimento</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} style={styles.btnSecondary} onPress={() => router.back()}>
            <Text style={styles.btnSecondaryText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- SUBCOMPONENTES REUTILIZÁVEIS ---

type FormInputProps = TextInputProps & {
  label: string;
  flex?: number;
  loading?: boolean;
};

function FormInput({ label, flex, editable = true, loading, ...rest }: FormInputProps) {
  return (
    <View style={[styles.inputGroup, flex !== undefined && { flex }]}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {loading && <ActivityIndicator size="small" color={COLORS.primary} />}
      </View>
      <TextInput
        style={[styles.input, !editable && styles.inputDisabled]}
        editable={editable}
        {...rest}
      />
    </View>
  );
}

interface BeneficioCardProps {
  beneficio: Beneficio;
  selecionado: boolean;
  onSelect: () => void;
}

function BeneficioCard({ beneficio, selecionado, onSelect }: BeneficioCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.beneficioCard, selecionado && styles.beneficioCardSelecionado]}
      onPress={onSelect}>
      <View style={styles.beneficioTopo}>
        <View style={styles.radioOuter}>
          {selecionado && <View style={styles.radioInner} />}
        </View>
        <View style={styles.beneficioHeaderInfo}>
          <Text style={styles.quemPodePedirTag}>Quem pode pedir: {beneficio.quemPodePedir}</Text>
          <Text style={styles.beneficioTitulo}>{beneficio.titulo}</Text>
        </View>
      </View>
      <Text style={styles.beneficioDescricao}>{beneficio.descricao}</Text>
    </TouchableOpacity>
  );
}

// --- ESTILOS ---
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
  container: {
    flex: 1,
    backgroundColor: COLORS.bgScreen,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  docTitle: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionHeaderTitle: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 6,
    flex: 1,
  },
  btnEditar: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  btnEditarTexto: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: 'bold',
  },
  dadosBox: {
    backgroundColor: '#F8F9FA',
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  inputGroup: {
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    color: COLORS.textDark,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 3,
  },
  input: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.borderLight,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 12,
    height: 38,
    paddingHorizontal: 10,
    color: COLORS.textDark,
  },
  inputDisabled: {
    backgroundColor: COLORS.primaryLight,
    color: COLORS.textMuted,
    borderColor: COLORS.border,
  },
  beneficiosContainer: {
    gap: 10,
    marginBottom: 16,
  },
  beneficioCard: {
    backgroundColor: '#F8F9FA',
    borderColor: COLORS.borderLight,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  beneficioCardSelecionado: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
    borderWidth: 1.5,
  },
  beneficioTopo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  radioOuter: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 2,
  },
  radioInner: {
    height: 9,
    width: 9,
    borderRadius: 4.5,
    backgroundColor: COLORS.primary,
  },
  beneficioHeaderInfo: {
    flex: 1,
  },
  quemPodePedirTag: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: COLORS.primaryBadge,
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  beneficioTitulo: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  beneficioDescricao: {
    color: '#444444',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },
  warningBox: {
    backgroundColor: COLORS.warningBg,
    borderColor: COLORS.warningBorder,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  warningTitle: {
    color: '#795548',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  warningItem: {
    color: COLORS.warningText,
    fontSize: 11,
    lineHeight: 15,
    marginBottom: 4,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4,
  },
  checkboxBox: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxAtivo: {
    backgroundColor: COLORS.primary,
  },
  checkboxCheck: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    color: COLORS.textDark,
    fontSize: 12,
    flex: 1,
    lineHeight: 16,
  },
  comunicacaoBox: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  comunicacaoLabel: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 8,
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: '#DDE5ED',
    borderRadius: 8,
    padding: 3,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 6,
  },
  segmentActiveYes: {
    backgroundColor: COLORS.primary,
  },
  segmentActiveNo: {
    backgroundColor: COLORS.danger,
  },
  segmentText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#4A5568',
  },
  segmentTextActive: {
    color: COLORS.white,
  },
  btnPrimary: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  btnPrimaryText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  btnSecondary: {
    backgroundColor: COLORS.grayBtn,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  btnSecondaryText: {
    color: COLORS.textDark,
    fontSize: 13,
    fontWeight: 'bold',
  },
});