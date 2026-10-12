import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import React, { useEffect, useRef, useState } from 'react';
import Pdf from 'react-native-pdf';
import { WebView } from 'react-native-webview';

import {
  Alert,
  Dimensions,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { LINKS_UTEIS_LIST, PRINCIPAIS_SERVICOS_LIST, SOLICITACOES_LIST } from '../constants/menu';
import { SECOES_MENU_LATERAL } from '../constants/menu_inicial';
import { useAuth } from '../hooks/useAuth';

const { width } = Dimensions.get('window');
const API_BASE_URL = 'http://10.0.2.2:8080/api/v1';

type TabType = 'inicio' | 'solicitacoes' | 'links' | 'perfil' | 'pdf-viewer' | 'webview';

export default function FamiliaNavalScreen() {
  const navigation = useNavigation<any>();
  const { usuario } = useAuth();
  
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState<string | null>(null);
  const [currentPdfTitle, setCurrentPdfTitle] = useState<string>('Documento PDF');

  const [currentWebUrl, setCurrentWebUrl] = useState<string | null>(null);
  const [currentWebTitle, setCurrentWebTitle] = useState<string>('Portal');

  const [nomeDescriptografado, setNomeDescriptografado] = useState<string>('A carregar...');
  const [dadosVinculo, setDadosVinculo] = useState<{ orgao: string; vinculo: string; matricula: string }>({
    orgao: '-',
    vinculo: '-',
    matricula: '-',
  });

  const horizontalScrollRef = useRef<ScrollView>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const cpfUsuario = usuario?.cpf || '43243479568';

  useEffect(() => {
    async function buscarDadosCompletosDoBanco() {
      try {
        if (cpfUsuario) {
          const response = await fetch(`${API_BASE_URL}/endereco/cpf/${cpfUsuario}`, {
            credentials: 'include',
          });
          if (response.ok) {
            const data = await response.json();
            if (data.nome && !data.nome.startsWith('\\xc')) {
              setNomeDescriptografado(data.nome);
            }
          }
        }

        if (nomeDescriptografado === 'A carregar...' && usuario?.nome && !usuario.nome.startsWith('\\xc')) {
          setNomeDescriptografado(usuario.nome);
        }

        const orgao = usuario?.siglaOm || usuario?.siglaom || 'COM2DN';
        const vinculo = usuario?.tipoPessoaDescricao || usuario?.tipopessoadescricao || '';
        const matricula = usuario?.matricula || usuario?.nip || '05810655';

        setDadosVinculo({ orgao, vinculo, matricula });
      } catch (e) {
        console.error('Erro ao sincronizar dados do cabeçalho:', e);
      }
    }

    buscarDadosCompletosDoBanco();
  }, [usuario, cpfUsuario]);

  const getInitials = (name: string) => {
    if (!name || name === 'A carregar...') return 'ES';
    const parts = name.split(' ');
    return parts.length >= 2 ? `${parts[0][0]}${parts[1][0]}`.toUpperCase() : name.substring(0, 2).toUpperCase();
  };

  const avatarInitials = getInitials(nomeDescriptografado);

  const scrollServicos = (direction: 'left' | 'right') => {
    const cardWidth = 138;
    const newPosition = direction === 'left' ? Math.max(0, scrollPosition - cardWidth) : scrollPosition + cardWidth;
    horizontalScrollRef.current?.scrollTo({ x: newPosition, animated: true });
    setScrollPosition(newPosition);
  };

  const handleOpenPdf = async (title: string, assetModule: any) => {
    try {
      const asset = Asset.fromModule(assetModule);
      await asset.downloadAsync();
      if (asset.uri) {
        setCurrentPdfTitle(title);
        setCurrentPdfUrl(asset.uri);
        setActiveTab('pdf-viewer');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o arquivo PDF.');
    }
  };

  const handleAction = async (item: { title: string; url?: string; targetTab?: TabType; route?: string }) => {
    if (item.url) {
      if (Platform.OS === 'web') {
        (window as any).open(item.url, '_blank');
      } else {
        setCurrentWebTitle(item.title);
        setCurrentWebUrl(item.url);
        setActiveTab('webview');
      }
    } else if (item.route) {
      try {
        navigation.navigate(item.route);
      } catch (error) {
        Alert.alert('Erro de Navegação', `A rota "${item.route}" não foi registrada no Navigator.`);
      }
    } else if (item.targetTab) {
      setActiveTab(item.targetTab);
    } else {
      Alert.alert(item.title, `Acessando módulo de ${item.title}...`);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'pdf-viewer':
      case 'webview':
        return (
          <View style={styles.pdfContainer}>
            <View style={styles.pdfHeaderBar}>
              <TouchableOpacity onPress={() => setActiveTab('inicio')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="arrow-back" size={20} color="#003366" />
                <Text style={{ color: '#003366', fontWeight: 'bold', marginLeft: 6 }}>Voltar</Text>
              </TouchableOpacity>
              <Text style={styles.pdfHeaderTitle} numberOfLines={1}>{activeTab === 'pdf-viewer' ? currentPdfTitle : currentWebTitle}</Text>
            </View>
            {activeTab === 'pdf-viewer' && currentPdfUrl ? (
              <Pdf source={{ uri: currentPdfUrl, cache: true }} trustAllCerts={false} style={styles.pdfView} />
            ) : activeTab === 'webview' && currentWebUrl ? (
              <WebView source={{ uri: currentWebUrl }} style={styles.pdfView} />
            ) : (
              <Text style={{ textAlign: 'center', marginTop: 20 }}>Conteúdo indisponível.</Text>
            )}
          </View>
        );

      case 'inicio':
        return (
          <>
            <View style={styles.welcomeCard}>
              <View style={styles.welcomeHeader}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>{avatarInitials}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.welcomeTitle}>{nomeDescriptografado}</Text>
                  <Text style={styles.nipText}>Identificação: {dadosVinculo.vinculo}</Text>
                  <Text style={styles.nipText}>NIP: {dadosVinculo.matricula}</Text>
                </View>
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Principais Serviços</Text>
              <View style={styles.carouselWrapper}>
                <TouchableOpacity style={styles.cardArrowButton} onPress={() => scrollServicos('left')}>
                  <Ionicons name="chevron-back" size={20} color="#003366" />
                </TouchableOpacity>
                <ScrollView 
                  ref={horizontalScrollRef}
                  horizontal 
                  showsHorizontalScrollIndicator={false} 
                  contentContainerStyle={styles.horizontalScroll}
                >
                  {PRINCIPAIS_SERVICOS_LIST.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.shortcutCard} onPress={() => handleAction(item)}>
                      <View style={[styles.shortcutIconBg, { backgroundColor: '#f0f4f8' }]}>
                        {item.iconLib === 'MaterialCommunityIcons' ? (
                          <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
                        ) : (
                          <Ionicons name={item.icon as any} size={24} color={item.color} />
                        )}
                      </View>
                      <Text style={styles.shortcutText} numberOfLines={3}>{item.title}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity style={styles.cardArrowButton} onPress={() => scrollServicos('right')}>
                  <Ionicons name="chevron-forward" size={20} color="#003366" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Serviços</Text>
              <View style={styles.gridContainer}>
                {SOLICITACOES_LIST.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.gridItem} onPress={() => handleAction(item)}>
                    <View style={styles.gridIconBg}>
                      {item.iconLib === 'MaterialCommunityIcons' ? (
                        <MaterialCommunityIcons name={item.icon as any} size={26} color={item.color} />
                      ) : (
                        <Ionicons name={item.icon as any} size={26} color={item.color} />
                      )}
                    </View>
                    <Text style={styles.gridText} numberOfLines={2}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Links Úteis</Text>
                <TouchableOpacity onPress={() => setActiveTab('links')}>
                  <Text style={styles.seeAllText}>Ver todos</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.gridContainer}>
                {LINKS_UTEIS_LIST.slice(0, 4).map((item, index) => (
                  <TouchableOpacity key={index} style={styles.gridItem} onPress={() => handleAction(item)}>
                    <View style={styles.gridIconBg}>
                      {item.iconLib === 'MaterialCommunityIcons' ? (
                        <MaterialCommunityIcons name={item.icon as any} size={26} color={item.color} />
                      ) : (
                        <Ionicons name={item.icon as any} size={26} color={item.color} />
                      )}
                    </View>
                    <Text style={styles.gridText} numberOfLines={2}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        );

      case 'solicitacoes':
      case 'links':
        const listaAtual = activeTab === 'solicitacoes' ? SOLICITACOES_LIST : LINKS_UTEIS_LIST;
        return (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{activeTab === 'solicitacoes' ? 'Todos os Serviços' : 'Links Úteis da Marinha'}</Text>
            <Text style={styles.sectionSubtitle}>Selecione a opção pretendida</Text>
            <View style={styles.gridTwoColumnsContainer}>
              {listaAtual.map((item, index) => (
                <TouchableOpacity key={index} style={styles.gridTwoColumnsItem} onPress={() => handleAction(item)}>
                  <View style={styles.gridIconBg}>
                    {item.iconLib === 'MaterialCommunityIcons' ? (
                      <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
                    ) : (
                      <Ionicons name={item.icon as any} size={28} color={item.color} />
                    )}
                  </View>
                  <Text style={styles.gridTwoColumnsText} numberOfLines={2}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'perfil':
        return (
          <View style={styles.tabPlaceholderContainer}>
            <Ionicons name="person-circle-outline" size={56} color="#003366" />
            <Text style={styles.tabPlaceholderTitle}>{nomeDescriptografado}</Text>
            <Text style={styles.tabPlaceholderSub}>Vínculo: {dadosVinculo.vinculo}</Text>
            <Text style={styles.tabPlaceholderSub}>{dadosVinculo.orgao} | Matrícula: {dadosVinculo.matricula}</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#003366" />

      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => setDrawerVisible(true)} style={styles.drawerButton}>
            <Ionicons name="menu" size={26} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerSubtitle}>FAMÍLIA NAVAL</Text>
            <Text style={styles.headerTitle}>SVPM</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIconBtn} onPress={() => Alert.alert('Notificações', 'Sem novas notificações.')}>
            <Ionicons name="notifications-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn} onPress={() => Alert.alert('Sair', 'Sessão encerrada.')}>
            <Ionicons name="log-out-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        {activeTab === 'pdf-viewer' || activeTab === 'webview' ? renderContent() : <ScrollView contentContainerStyle={styles.scrollContent}>{renderContent()}</ScrollView>}
      </View>

      <Modal visible={drawerVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.drawerContainer}>
            <View style={styles.drawerHeader}>
              <View style={styles.drawerAvatar}>
                <Text style={styles.avatarText}>{avatarInitials}</Text>
              </View>
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={styles.drawerUserName} numberOfLines={1}>{nomeDescriptografado}</Text>
                <Text style={styles.drawerUserSub}>{dadosVinculo.vinculo}</Text>
              </View>
              <TouchableOpacity onPress={() => setDrawerVisible(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ padding: 16 }}>
              <TouchableOpacity style={styles.drawerItem} onPress={() => { setActiveTab('inicio'); setDrawerVisible(false); }}>
                <Ionicons name="home-outline" size={22} color="#003366" style={{ width: 30 }} />
                <Text style={styles.drawerItemText}>Início</Text>
              </TouchableOpacity>

              {SECOES_MENU_LATERAL.map((secao, sIndex) => (
                <React.Fragment key={`secao-${sIndex}`}>
                  <Text style={styles.drawerSectionTitle}>{secao.titulo}</Text>
                  {secao.itens.map((item, idx) => (
                    <TouchableOpacity
                      key={`item-${sIndex}-${idx}`}
                      style={[styles.drawerItem, styles.drawerSubItem]}
                      onPress={() => {
                        setDrawerVisible(false);
                        if (item.chaveAcao === 'notificacoes') Alert.alert('Notificações', 'Sem novas notificações.');
                        else if (item.rota) navigation.navigate(item.rota);
                        else if (item.documentoAsset) handleOpenPdf(item.rotulo, item.documentoAsset);
                        else if (item.urlExterna) handleAction({ title: item.rotulo, url: item.urlExterna });
                      }}
                    >
                      <Ionicons name={item.icone as any} size={20} color="#003366" style={{ width: 30 }} />
                      <Text style={styles.drawerSubItemText}>{item.rotulo}</Text>
                    </TouchableOpacity>
                  ))}
                </React.Fragment>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }} onPress={() => setDrawerVisible(false)} />
        </View>
      </Modal>

      {activeTab !== 'pdf-viewer' && activeTab !== 'webview' && (
        <View style={styles.bottomBar}>
          {[
            { key: 'inicio', label: 'Início', icon: 'home' },
            { key: 'solicitacoes', label: 'Serviços', icon: 'list' },
            { key: 'links', label: 'Links', icon: 'link' },
            { key: 'perfil', label: 'Perfil', icon: 'person' },
          ].map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity key={tab.key} style={styles.bottomBarItem} onPress={() => setActiveTab(tab.key as TabType)}>
                <Ionicons name={(isActive ? tab.icon : `${tab.icon}-outline`) as any} size={22} color={isActive ? '#003366' : '#666'} />
                <Text style={[styles.bottomBarText, isActive && styles.bottomBarTextActive]}>{tab.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#003366' },
  headerBar: { backgroundColor: '#003366', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  drawerButton: { marginRight: 12 },
  headerSubtitle: { color: '#b0c4de', fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  headerIconBtn: { marginLeft: 14 },
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  scrollContent: { paddingBottom: 100 },
  pdfContainer: { flex: 1, backgroundColor: '#fff' },
  pdfHeaderBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: '#f9f9f9' },
  pdfHeaderTitle: { fontSize: 14, fontWeight: 'bold', color: '#333', marginLeft: 12, flex: 1 },
  pdfView: { flex: 1, width: '100%', alignSelf: 'stretch' },
  welcomeCard: { backgroundColor: '#003366', paddingHorizontal: 20, paddingBottom: 24, paddingTop: 12, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  welcomeHeader: { flexDirection: 'row', alignItems: 'center' },
  avatarCircle: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#1e4d7a', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#ffffff30' },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  welcomeTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  nipText: { color: '#e0e8f0', fontSize: 12, marginTop: 2 },
  sectionContainer: { marginTop: 20, paddingHorizontal: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  sectionSubtitle: { fontSize: 12, color: '#666', marginBottom: 12 },
  seeAllText: { color: '#003366', fontWeight: '600', fontSize: 13 },
  carouselWrapper: { flexDirection: 'row', alignItems: 'center' },
  cardArrowButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#e2e8f0', alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  horizontalScroll: { paddingHorizontal: 8 },
  shortcutCard: { width: 126, backgroundColor: '#fff', borderRadius: 14, padding: 10, marginHorizontal: 6, alignItems: 'center', justifyContent: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  shortcutIconBg: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  shortcutText: { fontSize: 11, fontWeight: '600', color: '#333', textAlign: 'center', lineHeight: 14 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: (width - 44) / 3, backgroundColor: '#fff', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 6, alignItems: 'center', marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  gridTwoColumnsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridTwoColumnsItem: { width: (width - 40) / 2, backgroundColor: '#fff', borderRadius: 16, paddingVertical: 18, paddingHorizontal: 12, alignItems: 'center', marginBottom: 14, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  gridTwoColumnsText: { fontSize: 12.5, fontWeight: '600', color: '#333', textAlign: 'center', lineHeight: 16, marginTop: 8 },
  gridIconBg: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#f0f4f8', alignItems: 'center', justifyContent: 'center' },
  gridText: { fontSize: 10.5, fontWeight: '500', color: '#333', textAlign: 'center', lineHeight: 14 },
  tabPlaceholderContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#f5f7fa' },
  tabPlaceholderTitle: { fontSize: 18, fontWeight: 'bold', color: '#003366', marginTop: 12 },
  tabPlaceholderSub: { fontSize: 13, color: '#666', textAlign: 'center', marginTop: 6 },
  modalOverlay: { flex: 1, flexDirection: 'row' },
  drawerContainer: { width: '75%', maxWidth: 320, backgroundColor: '#fff', height: '100%', elevation: 10 },
  drawerHeader: { backgroundColor: '#003366', padding: 20, paddingTop: 45, flexDirection: 'row', alignItems: 'center' },
  drawerAvatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#1e4d7a', alignItems: 'center', justifyContent: 'center' },
  drawerUserName: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  drawerUserSub: { color: '#b0c4de', fontSize: 11, marginTop: 2 },
  drawerItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  drawerItemText: { fontSize: 15, color: '#333', fontWeight: 'bold' },
  drawerSectionTitle: { fontSize: 12, fontWeight: '700', color: '#888', marginTop: 16, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  drawerSubItem: { paddingLeft: 10, borderBottomWidth: 0 },
  drawerSubItemText: { fontSize: 14, color: '#444', fontWeight: '500' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 65, backgroundColor: '#fff', flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#e0e0e0', elevation: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
  bottomBarItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bottomBarText: { fontSize: 11, color: '#666', marginTop: 3 },
  bottomBarTextActive: { color: '#003366', fontWeight: 'bold' },
});