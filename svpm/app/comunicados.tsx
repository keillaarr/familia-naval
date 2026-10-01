import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface ComunicadoAPI {
  id: number;
  cpfUsuario: string;
  assunto: string;
  cpfAutor: string;
  nomeArquivo: string;
  dataDocumento: string;
  lido: number;
}

interface Comunicado {
  id: string;
  data: string;
  titulo: string;
  conteudo: string;
  tipo: 'dependentes' | 'inspecao' | 'geral';
  lido: number;
}

export default function ComunicadosScreen() {
  const [comunicados, setComunicados] = useState<Comunicado[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [comunicadoSelecionado, setComunicadoSelecionado] = useState<Comunicado | null>(null);

  // Substitua pelo NIP/CPF do usuário logado conforme sua aplicação
  const usuarioCpfOrNip = '00000028797'; 

  useEffect(() => {
    buscarComunicados();
  }, []);

  // Função para corrigir textos corrompidos por problema de encoding
  const corrigirTexto = (texto: string) => {
    if (!texto) return '';
    try {
      return decodeURIComponent(escape(texto));
    } catch (e) {
      return texto
        .replace(/Ã§/g, 'ç')
        .replace(/Ã£/g, 'ã')
        .replace(/Ã©/g, 'é')
        .replace(/Ã¡/g, 'á')
        .replace(/Ã³/g, 'ó')
        .replace(/Ãº/g, 'ú')
        .replace(/Ãª/g, 'ê')
        .replace(/Ã/g, 'Í')
        .replace(/Ã£o/g, 'ão')
        .replace(/Âº/g, 'º');
    }
  };

  const buscarComunicados = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8080/api/v1/comunicados/usuario/${usuarioCpfOrNip}`);
      const data: ComunicadoAPI[] = await res.json();

      const dadosFormatados: Comunicado[] = data.map((item) => {
        let dataFormatada = item.dataDocumento;
        if (item.dataDocumento && item.dataDocumento.includes('-')) {
          const [ano, mes, dia] = item.dataDocumento.split('-');
          dataFormatada = `${dia}/${mes}/${ano}`;
        }

        const assuntoCorrigido = corrigirTexto(item.assunto);

        let tipo: Comunicado['tipo'] = 'geral';
        const assuntoLower = assuntoCorrigido.toLowerCase();
        if (assuntoLower.includes('dependente')) {
          tipo = 'dependentes';
        } else if (assuntoLower.includes('saúde') || assuntoLower.includes('inspecao')) {
          tipo = 'inspecao';
        }

        return {
          id: String(item.id),
          data: dataFormatada || 'Data não informada',
          titulo: assuntoCorrigido,
          tipo: tipo,
          conteudo: corrigirTexto(`Documento vinculado: ${item.nomeArquivo}`),
          lido: item.lido,
        };
      });

      // Ordena do mais atual para o mais antigo utilizando o ID decrescente
      dadosFormatados.sort((a, b) => Number(b.id) - Number(a.id));

      setComunicados(dadosFormatados);
    } catch (error) {
      console.error('Erro ao buscar comunicados:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função que dispara o PUT para marcar como lido na API
  const handleVisualizarComunicado = async (item: Comunicado) => {
    setComunicadoSelecionado(item);

    // Se já estiver lido (1), não precisa chamar a API novamente
    if (item.lido === 1) return;

    try {
      const res = await fetch(`http://localhost:8080/api/v1/comunicados/${item.id}/ler`, {
        method: 'PUT',
      });

      if (res.ok) {
        // Atualiza o estado local para refletir que o item agora está lido
        setComunicados((prev) =>
          prev.map((c) => (c.id === item.id ? { ...c, lido: 1 } : c))
        );
      }
    } catch (error) {
      console.error('Erro ao marcar comunicado como lido:', error);
    }
  };

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
          <Text style={styles.counterBadge}>{comunicados.length} itens</Text>
        </View>

        {loading ? (
          <View style={{ marginTop: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={{ marginTop: 10, color: COLORS.textMuted }}>Carregando comunicados...</Text>
          </View>
        ) : comunicados.length === 0 ? (
          <View style={{ marginTop: 40, alignItems: 'center' }}>
            <Text style={{ color: COLORS.textMuted }}>Nenhum comunicado encontrado.</Text>
          </View>
        ) : (
          comunicados.map((item) => (
            <View 
              key={item.id} 
              style={[
                styles.cardItem, 
                item.lido === 0 && styles.cardNaoLido
              ]}
            >
              <View style={styles.itemTopo}>
                <View style={styles.iconeBadge}>
                  <Ionicons name={getIconeNome(item.tipo)} size={20} color={COLORS.primary} />
                </View>

                <View style={styles.itemInfo}>
                  <View style={styles.linhaInfoSuperior}>
                    <Text style={styles.itemData}>
                      <Ionicons name="calendar-outline" size={11} color={COLORS.textMuted} /> {item.data}
                    </Text>
                    
                    {item.lido === 0 ? (
                      <View style={styles.badgeNovo}>
                        <Text style={styles.badgeNovoText}>NÃO LIDO</Text>
                      </View>
                    ) : (
                      <View style={styles.badgeLido}>
                        <Ionicons name="checkmark" size={10} color="#047857" style={{ marginRight: 2 }} />
                        <Text style={styles.badgeLidoText}>LIDO</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.itemTitulo}>{item.titulo}</Text>
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btnVisualizar}
                onPress={() => handleVisualizarComunicado(item)}
              >
                <Text style={styles.btnVisualizarText}>Visualizar Comunicado</Text>
                <Ionicons name="chevron-forward" size={14} color={COLORS.primary} style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View>
          ))
        )}

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
  accentUnread: '#FFF8F0',
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
  cardNaoLido: {
    borderLeftWidth: 4,
    borderLeftColor: '#D97706',
  },
  itemTopo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  linhaInfoSuperior: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
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
  },
  badgeNovo: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  badgeNovoText: {
    color: '#B45309',
    fontSize: 9,
    fontWeight: 'bold',
  },
  badgeLido: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeLidoText: {
    color: '#047857',
    fontSize: 9,
    fontWeight: 'bold',
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