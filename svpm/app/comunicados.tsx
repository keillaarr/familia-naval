import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Comunicado {
  id: string;
  data: string;
  titulo: string;
  conteudo: string;
  tipo: 'dependentes' | 'inspecao' | 'geral';
}

const comunicadosDados: Comunicado[] = [
  {
    id: '1',
    data: '02/06/2026',
    titulo: 'Declaração de Dependentes',
    tipo: 'dependentes',
    conteudo:
      'Informa-se que a Declaração de Dependentes para fins de IRRF do ano corrente foi registrada e processada no sistema.',
  },
  {
    id: '2',
    data: '16/05/2024',
    titulo: 'Inspeção de Saúde',
    tipo: 'inspecao',
    conteudo:
      'Resultado de Inspeção de Saúde realizado na Policlínica Naval. Parecer: Apto para os fins a que se destina.',
  },
  {
    id: '3',
    data: '28/04/2024',
    titulo: 'Declaração de Dependentes',
    tipo: 'dependentes',
    conteudo:
      'Atualização cadastral de dependente efetuada com sucesso no cadastro geral do SVPM.',
  },
  {
    id: '4',
    data: '27/04/2024',
    titulo: 'Declaração de Dependentes',
    tipo: 'dependentes',
    conteudo:
      'Comprovante de envio de documentação referente à atualização de dependentes.',
  },
  {
    id: '5',
    data: '01/04/2024',
    titulo: 'Inspeção de Saúde',
    tipo: 'inspecao',
    conteudo:
      'Agendamento de Inspeção de Saúde periódica confirmado para a data correspondente.',
  },
  {
    id: '6',
    data: '20/07/2023',
    titulo: 'Inspeção de Saúde',
    tipo: 'inspecao',
    conteudo: 'Parecer médico referente ao requerimento de saúde submetido.',
  },
  {
    id: '7',
    data: '20/07/2023',
    titulo: 'Declaração de Dependentes',
    tipo: 'dependentes',
    conteudo: 'Confirmação de recebimento do formulário de dependentes.',
  },
  {
    id: '8',
    data: '01/01/2023',
    titulo: 'Declaração de Dependentes',
    tipo: 'dependentes',
    conteudo: 'Declaração anual de dependentes enviada ao banco de dados.',
  },
  {
    id: '9',
    data: '15/08/2021',
    titulo: 'Inspeção de Saúde',
    tipo: 'inspecao',
    conteudo: 'Registro de laudo de Inspeção de Saúde arquivado.',
  },
  {
    id: '10',
    data: '15/12/2020',
    titulo: 'Inspeção de Saúde',
    tipo: 'inspecao',
    conteudo: 'Parecer da Junta Regular de Saúde publicado no sistema.',
  },
];

export default function ComunicadosScreen() {
  const [comunicadoSelecionado, setComunicadoSelecionado] = useState<Comunicado | null>(null);

  const getIconeNome = (tipo: Comunicado['tipo']): keyof typeof Ionicons.glyphMap => {
    switch (tipo) {
      case 'dependentes':
        return 'people-outline';
      case 'inspecao':
        return 'medkit-outline';
      default:
        return 'megaphone-outline';
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
            <Text style={styles.headerTitle}>Comunicados e Informes</Text>
          </View>
        </View>
        <Ionicons name="notifications-outline" size={20} color="#B0C4DE" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Registrados no Sistema</Text>
          <Text style={styles.counterBadge}>{comunicadosDados.length} itens</Text>
        </View>

        {comunicadosDados.map((item) => (
          <View key={item.id} style={styles.cardItem}>
            <View style={styles.itemTopo}>
              <View style={styles.iconeBadge}>
                <Ionicons name={getIconeNome(item.tipo)} size={20} color={COLORS.primary} />
              </View>

              <View style={styles.itemInfo}>
                <Text style={styles.itemData}>
                  <Ionicons name="calendar-outline" size={11} color={COLORS.textMuted} /> {item.data}
                </Text>
                <Text style={styles.itemTitulo}>{item.titulo}</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btnVisualizar}
              onPress={() => setComunicadoSelecionado(item)}
            >
              <Text style={styles.btnVisualizarText}>Visualizar Comunicado</Text>
              <Ionicons name="chevron-forward" size={14} color={COLORS.primary} style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnSecondary}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back-outline" size={16} color={COLORS.textMuted} style={{ marginRight: 6 }} />
          <Text style={styles.btnSecondaryText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* MODAL DE LEITURA DO COMUNICADO */}
      <Modal
        visible={!!comunicadoSelecionado}
        transparent
        animationType="slide"
        onRequestClose={() => setComunicadoSelecionado(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {comunicadoSelecionado && (
              <>
                <View style={styles.modalHeader}>
                  <View style={styles.modalHeaderIconBadge}>
                    <Ionicons
                      name={getIconeNome(comunicadoSelecionado.tipo)}
                      size={22}
                      color={COLORS.primary}
                    />
                  </View>
                  <Text style={styles.modalData}>{comunicadoSelecionado.data}</Text>
                </View>

                <Text style={styles.modalTitulo}>{comunicadoSelecionado.titulo}</Text>

                <View style={styles.modalBody}>
                  <Text style={styles.modalTexto}>{comunicadoSelecionado.conteudo}</Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btnFecharModal}
                  onPress={() => setComunicadoSelecionado(null)}
                >
                  <Text style={styles.btnFecharModalText}>Fechar Comunicado</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  counterBadge: {
    backgroundColor: '#E2E8F0',
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  cardItem: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  itemTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconeBadge: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 10,
    padding: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#C5DDF3',
  },
  itemInfo: {
    flex: 1,
  },
  itemData: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  itemTitulo: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  btnVisualizar: {
    backgroundColor: COLORS.primaryLight,
    borderColor: '#C5DDF3',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnVisualizarText: {
    color: COLORS.primary,
    fontSize: 13,
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
    marginTop: 16,
  },
  btnSecondaryText: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  modalHeaderIconBadge: {
    backgroundColor: COLORS.primaryLight,
    padding: 8,
    borderRadius: 10,
  },
  modalData: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: 'bold',
  },
  modalTitulo: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalBody: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    borderColor: COLORS.borderLight,
    borderWidth: 1,
  },
  modalTexto: {
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 22,
  },
  btnFecharModal: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnFecharModalText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});