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

// Interface atualizada para incluir os campos reais vindos da API
interface Dependente {
  nipDep?: string | number;
  dependencia?: string | null;
  nomeDep?: string;
  parentesco?: string;
  nipTit?: string | number;
  cpf?: string;
  concedido?: string | null;
}

export default function DependentesScreen() {
  const [dependentesList, setDependentesList] = useState<Dependente[]>([]);
  const [loading, setLoading] = useState(true);

  // NIP atualizado conforme o seu teste no backend
  const nipTitular = '76317978'; 

  useEffect(() => {
    fetchDependentes();
  }, []);

  const fetchDependentes = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/pessoa/dependentes/usuario/${nipTitular}`);
      const data = await response.json();
      
      console.log("Dados recebidos da API:", data);
      
      if (response.ok) {
        if (Array.isArray(data)) {
          setDependentesList(data);
        }
      } else {
        Alert.alert('Aviso', 'Não foi possível carregar os dependentes.');
      }
    } catch (error) {
      console.error("Erro no fetch:", error);
      Alert.alert('Erro', 'Falha de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
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
            <Text style={styles.headerTitle}>Dependentes</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Banner / Resumo em Destaque */}
        <View style={styles.heroBanner}>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTag}>GESTÃO CADASTRAL</Text>
            <Text style={styles.heroTitle}>Relação de Dependentes</Text>
            <Text style={styles.heroDesc}>
              Consulte os dados cadastrados e o status de dependência vinculados à sua titulação.
            </Text>
          </View>
          <View style={styles.heroIconBox}>
            <Ionicons name="people-outline" size={28} color={COLORS.primary} />
          </View>
        </View>

        <View style={styles.sectionHeaderBox}>
          <Text style={styles.sectionTitle}>Dependentes Vinculados</Text>
          <Text style={styles.sectionSubtitle}>
            Lista atualizada de beneficiários registrados no SVPM.
          </Text>
        </View>

        {loading ? (
          <View style={{ marginTop: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={{ marginTop: 10, color: COLORS.textMuted, fontSize: 12 }}>Carregando dados...</Text>
          </View>
        ) : dependentesList.length === 0 ? (
          <View style={{ marginTop: 30, alignItems: 'center' }}>
            <Text style={{ color: COLORS.textMuted, fontSize: 13 }}>Nenhum dependente encontrado.</Text>
          </View>
        ) : (
          dependentesList.map((item, index) => (
            <View key={item.nipDep || index} style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.badgeIconSmall}>
                  <Ionicons name="person-outline" size={18} color={COLORS.primary} />
                </View>
                <View style={styles.badgeSuccessInline}>
                  <Ionicons name="checkmark-circle" size={14} color={COLORS.greenSuccess} />
                  <Text style={styles.badgeSuccessText}>{item.dependencia || 'Ativo'}</Text>
                </View>
              </View>

              <View style={styles.infoBlock}>
                <Text style={styles.fieldLabel}>Nome do Dependente</Text>
                <Text style={styles.fieldValueBold}>{item.nomeDep}</Text>
              </View>

              <View style={styles.infoBlock}>
                <Text style={styles.fieldLabel}>CPF</Text>
                <Text style={styles.fieldValue}>{item.cpf || 'Não informado'}</Text>
              </View>

              <View style={styles.rowGridFields}>
                <View style={styles.halfField}>
                  <Text style={styles.fieldLabel}>Parentesco</Text>
                  <Text style={styles.fieldValue}>{item.parentesco}</Text>
                </View>
                <View style={styles.halfField}>
                  <Text style={styles.fieldLabel}>NIP Titular</Text>
                  <Text style={styles.fieldValue} numberOfLines={1}>{item.nipTit}</Text>
                </View>
              </View>
            </View>
          ))
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
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeIconSmall: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EBF3FA',
    alignItems: 'center',
    justifyContent: 'center',
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
  infoBlock: {
    marginBottom: 12,
  },
  fieldLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  fieldValueBold: {
    color: COLORS.textDark,
    fontSize: 15,
    fontWeight: 'bold',
  },
  rowGridFields: {
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: 10,
    marginTop: 4,
  },
  halfField: {
    flex: 1,
  },
  fieldValue: {
    color: COLORS.textDark,
    fontSize: 13,
    fontWeight: '500',
  },
});