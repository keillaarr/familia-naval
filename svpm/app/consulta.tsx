import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
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
  borderLight: '#E0E0E0',
  bgScreen: '#F5F7FA',
  white: '#FFFFFF',
};

export default function ConsultasScreen() {
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
            <Text style={styles.headerTitle}>Área de Consultas</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeaderBox}>
          <Text style={styles.sectionTitle}>Consultas disponíveis</Text>
          <Text style={styles.sectionSubtitle}>
            Selecione uma opção abaixo para consultar as informações desejadas.
          </Text>
        </View>

        {/* PROVA DE VIDA */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.botao}
          onPress={() => router.push('/consulta/prova-vida')}
        >
          <View style={styles.botaoIcone}>
            <Text style={styles.icone}>🪪</Text>
          </View>
          <View style={styles.botaoConteudo}>
            <Text style={styles.botaoTitulo}>Prova de Vida</Text>
            <Text style={styles.botaoDescricao}>
              Consulte informações do último recadastramento.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
        </TouchableOpacity>

        {/* AUXÍLIO INVALIDEZ */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.botao}
          onPress={() => router.push('/consulta/auxilio-invalidez')}
        >
          <View style={styles.botaoIcone}>
            <Text style={styles.icone}>📄</Text>
          </View>
          <View style={styles.botaoConteudo}>
            <Text style={styles.botaoTitulo}>Auxílio Invalidez</Text>
            <Text style={styles.botaoDescricao}>
              Consulte situação e próximas declarações.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
        </TouchableOpacity>

        {/* REQUISIÇÃO */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.botao}
          onPress={() => router.push('/consulta/requisicao')}
        >
          <View style={styles.botaoIcone}>
            <Text style={styles.icone}>🔎</Text>
          </View>
          <View style={styles.botaoConteudo}>
            <Text style={styles.botaoTitulo}>Requisição</Text>
            <Text style={styles.botaoDescricao}>
              Consulte requisições através do número informado.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />
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
  botao: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.borderLight,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    flexDirection: 'row',
    marginBottom: 12,
    padding: 16,
  },
  botaoIcone: {
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    marginRight: 14,
    width: 50,
  },
  icone: {
    fontSize: 22,
  },
  botaoConteudo: {
    flex: 1,
  },
  botaoTitulo: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  botaoDescricao: {
    color: COLORS.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },
});