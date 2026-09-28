import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
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

// --- PALETA DE CORES / TEMA PADRONIZADA ---
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
  | 'cep'
  | 'telefone'
  | 'celular'
  | 'email';

interface CampoConfig {
  key: CampoKey;
  label: string;
  editavel: boolean;
  keyboardType?: 'default' | 'phone-pad' | 'numeric';
}

const CAMPOS_TABELA: CampoConfig[] = [
  { key: 'nome', label: 'Nome', editavel: false },
  { key: 'logradouro', label: 'Logradouro', editavel: true },
  { key: 'numero', label: 'Número', editavel: true, keyboardType: 'numeric' },
  { key: 'complemento', label: 'Complemento', editavel: true },
  { key: 'bairro', label: 'Bairro', editavel: true },
  { key: 'cidade', label: 'Cidade', editavel: true },
  { key: 'cep', label: 'CEP', editavel: true, keyboardType: 'numeric' },
  { key: 'telefone', label: 'Telefone', editavel: true, keyboardType: 'phone-pad' },
  { key: 'celular', label: 'Celular', editavel: true, keyboardType: 'phone-pad' },
  { key: 'email', label: 'E-mail', editavel: true },
];

export default function DadosCadastraisScreen() {
  const [editando, setEditando] = useState<boolean>(false);

  const [dados, setDados] = useState<Record<CampoKey, string>>({
    nome: 'GUILHERME SOUSA DA SILVA',
    logradouro: 'Rua José dos Reis',
    numero: '1921',
    complemento: 'DEPARTAMENTO C',
    bairro: 'Inhaúma',
    cidade: 'RIO DE JANEIRO',
    cep: '20760-245',
    telefone: '2122697027',
    celular: '21987853291',
    email: 'guilherme.sousa@exemplo.com.br',
  });

  const [formulario, setFormulario] = useState<Record<CampoKey, string>>(dados);

  const handleIniciarEdicao = () => {
    setFormulario(dados);
    setEditando(true);
  };

  const handleCancelarEdicao = () => {
    setFormulario(dados);
    setEditando(false);
  };

  const handleSalvar = () => {
    setDados(formulario);
    setEditando(false);
    Alert.alert('Sucesso', 'Dados cadastrais atualizados com sucesso!');
  };

  const atualizarCampo = (campo: CampoKey, valor: string) => {
    setFormulario((prev) => ({ ...prev, [campo]: valor }));
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
                    <TextInput
                      style={styles.inputEdit}
                      value={valorExibido}
                      onChangeText={(text) => atualizarCampo(item.key, text)}
                      placeholder={`Informe ${item.label.toLowerCase()}`}
                      placeholderTextColor={COLORS.textMuted}
                      keyboardType={item.keyboardType || 'default'}
                      autoCapitalize={item.key === 'email' ? 'none' : 'sentences'}
                    />
                  ) : (
                    <Text
                      style={[
                        styles.rowValue,
                        item.key === 'email' && styles.emailHighlight,
                      ]}
                    >
                      {valorExibido}
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
              >
                <Text style={styles.btnSecondaryText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnSuccess}
                onPress={handleSalvar}
              >
                <Text style={styles.btnSuccessText}>Salvar Alterações</Text>
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
  },
  btnSuccessText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
});