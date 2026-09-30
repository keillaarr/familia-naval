import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

const API_BASE_URL = 'http://localhost:8080/api/v1';

const COLORS = {
  primary: '#003366',
  primaryLight: '#EBF3FA',
  primaryBadge: '#D6E4F0',
  textDark: '#222222',
  textMuted: '#555555',
  border: '#D0DCE5',
  borderLight: '#E0E0E0',
  bgCard: '#FFFFFF',
  bgScreen: '#F5F7FA',
  white: '#FFFFFF',
  greenSuccess: '#2E7D32',
};

type CampoKey =
  | 'nome'
  | 'logradouro'
  | 'numero'
  | 'complemento'
  | 'bairro'
  | 'cidade'
  | 'estado'
  | 'cep'
  | 'telefone'
  | 'celular'
  | 'email';

interface CampoConfig {
  key: CampoKey;
  label: string;
  editavel: boolean;
  keyboardType?: 'default' | 'phone-pad' | 'numeric';
  tipo?: 'input' | 'select_estado' | 'select_cidade';
}

const CAMPOS_TABELA: CampoConfig[] = [
  { key: 'nome', label: 'Nome', editavel: false },
  { key: 'logradouro', label: 'Rua', editavel: true },
  { key: 'numero', label: 'Número', editavel: true, keyboardType: 'numeric' },
  { key: 'complemento', label: 'Complemento', editavel: true },
  { key: 'bairro', label: 'Bairro', editavel: true },
  { key: 'estado', label: 'Estado', editavel: true, tipo: 'select_estado' },
  { key: 'cidade', label: 'Cidade', editavel: true, tipo: 'select_cidade' },
  { key: 'cep', label: 'CEP', editavel: true, keyboardType: 'numeric' },
  { key: 'telefone', label: 'Telefone', editavel: true, keyboardType: 'phone-pad' },
  { key: 'celular', label: 'Celular', editavel: true, keyboardType: 'phone-pad' },
  { key: 'email', label: 'E-mail', editavel: true },
];

const CPF_USUARIO = '43243479568';

export default function DadosCadastraisScreen() {
  const [editando, setEditando] = useState<boolean>(false);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [salvando, setSalvando] = useState<boolean>(false);

  const [listaEstados, setListaEstados] = useState<string[]>([]);
  const [listaCidades, setListaCidades] = useState<string[]>([]);

  const [dados, setDados] = useState<Record<CampoKey, string>>({
    nome: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    telefone: '',
    celular: '',
    email: '',
  });

  const [formulario, setFormulario] = useState<Record<CampoKey, string>>(dados);

  const buscarCidadesPorEstado = async (uf: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cidades/uf/${uf}`);
      if (response.ok) {
        const cidadesData = await response.json();
        const nomesCidades = cidadesData.map((item: any) => item.nomecidade);
        setListaCidades(nomesCidades);
      }
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
    }
  };

  useEffect(() => {
    async function carregarDadosIniciais() {
      try {
        const responseEndereco = await fetch(`${API_BASE_URL}/endereco/cpf/${CPF_USUARIO}`);
        if (responseEndereco.ok) {
          const resultado = await responseEndereco.json();
          const dadosMapeados = {
            nome: resultado.nome || '',
            logradouro: resultado.logradouro || '',
            numero: resultado.numero || '',
            complemento: resultado.complemento || '',
            bairro: resultado.bairro || '',
            cidade: resultado.cidade || '',
            estado: resultado.siglaUf || resultado.estado || '',
            cep: resultado.cep || '',
            telefone: resultado.telefone || '',
            celular: resultado.celular || '',
            email: resultado.email || '',
          };
          setDados(dadosMapeados);
          setFormulario(dadosMapeados);

          if (dadosMapeados.estado) {
            await buscarCidadesPorEstado(dadosMapeados.estado);
          }
        }

        const responseEstados = await fetch(`${API_BASE_URL}/cidades/ufs`);
        if (responseEstados.ok) {
          const estadosData = await responseEstados.json();
          setListaEstados(estadosData);
        } else {
          setListaEstados(['RJ', 'SP', 'MG', 'ES', 'PR', 'RS']);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Aviso', 'Não foi possível carregar os dados completos do servidor.');
      } finally {
        setCarregando(false);
      }
    }

    carregarDadosIniciais();
  }, []);

  const handleIniciarEdicao = () => {
    setFormulario(dados);
    if (dados.estado) {
      buscarCidadesPorEstado(dados.estado);
    }
    setEditando(true);
  };

  const handleCancelarEdicao = () => {
    setFormulario(dados);
    setEditando(false);
  };

  const handleSalvar = async () => {
    try {
      setSalvando(true);

      const payloadParaBackend = {
        enderecoRua: formulario.logradouro,
        enderecoNumero: formulario.numero,
        enderecoComplemento: formulario.complemento,
        enderCoBairro: formulario.bairro,
        cdCidade: formulario.cidade,
        cep: formulario.cep,
        telefone1: formulario.telefone,
        celular: formulario.celular,
        email: formulario.email,
        dddTel1: '',
        dddTel2: '',
        dddCelular: '',
      };

      const response = await fetch(`${API_BASE_URL}/endereco/cpf/${CPF_USUARIO}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payloadParaBackend),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar no servidor.');
      }

      setDados(formulario);
      setEditando(false);

      // Tratamento compatível com Web e Mobile
      if (Platform.OS === 'web') {
        window.alert('Alteração realizada com sucesso!');
        router.back();
      } else {
        Alert.alert(
          'Sucesso',
          'Alteração realizada com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => {
                setTimeout(() => {
                  router.back();
                }, 100);
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error(error);
      if (Platform.OS === 'web') {
        window.alert('Erro: Não foi possível salvar as alterações no banco de dados.');
      } else {
        Alert.alert('Erro', 'Não foi possível salvar as alterações no banco de dados.');
      }
    } finally {
      setSalvando(false);
    }
  };

  const atualizarCampo = (campo: CampoKey, valor: string) => {
    setFormulario((prev) => {
        const novoForm = { ...prev, [campo]: valor };
        
        if (campo === 'estado') {
          novoForm.cidade = '';
          buscarCidadesPorEstado(valor);
        }
        
        return novoForm;
    });
  };

  if (carregando) {
    return (
      <SafeAreaView style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={{ color: '#ffffff', marginTop: 10 }}>A carregar dados...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#003366" />

      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.drawerButton}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerSubtitle}>FAMÍLIA NAVAL</Text>
            <Text style={styles.headerTitle}>Dados Cadastrais</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeaderBox}>
          <Text style={styles.sectionTitle}>Informações de Contato e Residência</Text>
          <Text style={styles.sectionSubtitle}>
            Visualize e atualize as suas informações de contacto e residência.
          </Text>
        </View>

        <View style={styles.card}>
          {CAMPOS_TABELA.map((item, index) => {
            const valorExibido = editando ? formulario[item.key] : dados[item.key];
            const isLast = index === CAMPOS_TABELA.length - 1;

            return (
              <View
                key={item.key}
                style={[styles.rowItem, !isLast && styles.rowDivider]}
              >
                <Text style={styles.rowLabel}>{item.label}</Text>
                <View style={styles.rowValueContainer}>
                  {editando && item.editavel ? (
                    item.tipo === 'select_estado' ? (
                      <View style={styles.selectGridContainer}>
                        {listaEstados.map((uf) => (
                          <TouchableOpacity
                            key={uf}
                            style={[
                              styles.gridOption,
                              formulario.estado === uf && styles.gridOptionSelected,
                            ]}
                            onPress={() => atualizarCampo('estado', uf)}
                          >
                            <Text
                              style={[
                                styles.gridText,
                                formulario.estado === uf && styles.gridTextSelected,
                              ]}
                            >
                              {uf}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    ) : item.tipo === 'select_cidade' ? (
                      <View style={styles.selectContainer}>
                        {listaCidades.length === 0 ? (
                          <Text style={styles.rowValueMuted}>Selecione um estado primeiro</Text>
                        ) : (
                          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {listaCidades.map((cidadeNome) => (
                              <TouchableOpacity
                                key={cidadeNome}
                                style={[
                                  styles.chipOption,
                                  formulario.cidade === cidadeNome && styles.chipOptionSelected,
                                ]}
                                onPress={() => atualizarCampo('cidade', cidadeNome)}
                              >
                                <Text
                                  style={[
                                    styles.chipText,
                                    formulario.cidade === cidadeNome && styles.chipTextSelected,
                                  ]}
                                >
                                  {cidadeNome}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        )}
                      </View>
                    ) : (
                      <TextInput
                        style={styles.inputEdit}
                        value={valorExibido}
                        onChangeText={(text) => atualizarCampo(item.key, text)}
                        placeholder={`Informe ${item.label.toLowerCase()}`}
                        placeholderTextColor={COLORS.textMuted}
                        keyboardType={item.keyboardType || 'default'}
                        autoCapitalize={item.key === 'email' ? 'none' : 'sentences'}
                      />
                    )
                  ) : (
                    <Text
                      style={[
                        styles.rowValue,
                        item.key === 'email' && styles.emailHighlight,
                      ]}
                    >
                      {valorExibido || '-'}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.actionsFooter}>
          {!editando ? (
            <>
              <TouchableOpacity
                style={styles.btnSecondary}
                onPress={() => router.back()}
              >
                <Text style={styles.btnSecondaryText}>Voltar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnPrimary}
                onPress={handleIniciarEdicao}
              >
                <Text style={styles.btnPrimaryText}>Alterar Dados</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.btnSecondary}
                onPress={handleCancelarEdicao}
                disabled={salvando}
              >
                <Text style={styles.btnSecondaryText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnSuccess}
                onPress={handleSalvar}
                disabled={salvando}
              >
                {salvando ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={styles.btnSuccessText}>Salvar Alterações</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </View>
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
    marginBottom: 14,
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
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  rowLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
    width: '35%',
  },
  rowValueContainer: {
    width: '65%',
    alignItems: 'flex-end',
  },
  rowValue: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textDark,
    textAlign: 'right',
  },
  rowValueMuted: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontStyle: 'italic',
  },
  emailHighlight: {
    color: COLORS.primary,
  },
  inputEdit: {
    width: '100%',
    height: 38,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    fontSize: 12,
    color: COLORS.textDark,
    textAlign: 'right',
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginVertical: 4,
  },
  selectGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: 4,
    maxWidth: '100%',
    marginVertical: 4,
  },
  gridOption: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bgScreen,
    minWidth: 32,
    alignItems: 'center',
  },
  gridOptionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  gridText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  gridTextSelected: {
    color: COLORS.white,
  },
  chipOption: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bgScreen,
    marginLeft: 6,
  },
  chipOptionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  chipTextSelected: {
    color: COLORS.white,
  },
  actionsFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 20,
  },
  btnSecondary: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnSecondaryText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  btnPrimary: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  btnSuccess: {
    backgroundColor: COLORS.greenSuccess,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 120,
  },
  btnSuccessText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
});