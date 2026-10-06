import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Linking,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const useUserProfile = () => ({
  user: {
    nomeCompleto: 'DESENVOLVEDORA SVPM',
    nomeExibição: 'Equipe Técnica',
    nip: '00000000',
    vinculo: 'Desenvolvimento / Suporte',
    avatarInitials: 'DS',
  },
});

type TabType = 'inicio' | 'solicitacoes' | 'links' | 'perfil';

const PRINCIPAIS_SERVICOS_LIST = [
  {
    title: 'Consultas',
    icon: 'search-outline',
    iconLib: 'Ionicons',
    color: '#003366',
    route: 'consulta',
  },
  {
    title: 'Declaração de Dependentes IR',
    icon: 'people-outline',
    iconLib: 'Ionicons',
    color: '#003366',
    url: 'https://portalcidadao.dataprev.gov.br/#/mb/r/novo-pedido/informacao/2709/declaracao-de-dependentes-para-fins-de-imposto-de-renda-retido-na-fonte',
  },
  {
    title: 'Prova de Vida',
    icon: 'shield-check-outline',
    iconLib: 'MaterialCommunityIcons',
    color: '#003366',
    route: 'prova-de-vida',
  },
  {
    title: 'Declaração Anual Para Percepção Do Auxílio-Invalidez',
    icon: 'file-document-edit-outline',
    iconLib: 'MaterialCommunityIcons',
    color: '#003366',
    route: 'auxilio-invalidez',
  },
];

const SOLICITACOES_LIST = [
  {
    title: 'Consulta Dependentes',
    icon: 'account-group-outline',
    iconLib: 'MaterialCommunityIcons',
    color: '#003366',
    route: 'consulta-dependentes',
  },
  {
    title: 'Declaração de Acúmulo de Cargos Públicos',
    icon: 'scale-balance',
    iconLib: 'MaterialCommunityIcons',
    color: '#003366',
    route: 'dacp',
  },
  {
    title: 'Declaração Anual Para Percepção Do Auxílio-Invalidez',
    icon: 'file-document-edit-outline',
    iconLib: 'MaterialCommunityIcons',
    color: '#003366',
    route: 'auxilio-invalidez',
  },
  {
    title: 'Comunicados DPM',
    icon: 'bullhorn-outline',
    iconLib: 'MaterialCommunityIcons',
    color: '#003366',
    route: 'comunicados',
  },
  {
    title: 'Cadastro TTC',
    icon: 'briefcase-account-outline',
    iconLib: 'MaterialCommunityIcons',
    color: '#003366',
    route: 'cadastro-ttc',
  },
];

const LINKS_UTEIS_LIST = [
  {
    title: 'BP-Online (Contracheque)',
    icon: 'card-account-details-outline',
    iconLib: 'MaterialCommunityIcons',
    color: '#003366',
    url: 'https://bponline.marinha.mil.br/bponline/login',
  },
  {
    title: 'Consignado (Econsig)',
    icon: 'bank-outline',
    iconLib: 'MaterialCommunityIcons',
    color: '#003366',
    url: 'https://papem.econsigmb.com.br/mb/v3/autenticar#no-back',
  },
  {
    title: 'Pesquisa de Avaliação de Atendimento',
    icon: 'clipboard-text-outline',
    iconLib: 'MaterialCommunityIcons',
    color: '#003366',
    url: 'https://www.marinha.mil.br/svpm/form/pesquisaAtendimento',
  },
  {
    title: 'Abrigo do Marinheiro',
    icon: 'home-heart',
    iconLib: 'MaterialCommunityIcons',
    color: '#003366',
    url: 'https://www.abrigo.org.br/',
  },
  {
    title: 'Identidade Digital',
    icon: 'card-bulleted-outline',
    iconLib: 'MaterialCommunityIcons',
    color: '#003366',
    url: 'https://websitesvpm.marinha.mil.br/links',
  },
];

export default function FamiliaNavalScreen() {
  const navigation = useNavigation<any>();
  const { user } = useUserProfile();
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleAction = async (item: {
    title: string;
    url?: string;
    targetTab?: TabType;
    route?: string;
  }) => {
    if (item.url) {
      if (Platform.OS === 'web') {
        (window as any).open(item.url, '_blank');
      } else {
        try {
          const supported = await Linking.canOpenURL(item.url);
          if (supported) {
            await Linking.openURL(item.url);
          } else {
            Alert.alert('Aviso', `Não foi possível abrir o link: ${item.url}`);
          }
        } catch (error) {
          Alert.alert('Erro', 'Ocorreu um erro ao tentar abrir o link.');
        }
      }
    } else if (item.route) {
      try {
        navigation.navigate(item.route);
      } catch (error) {
        Alert.alert(
          'Erro de Navegação',
          `A rota "${item.route}" não foi registrada no Navigator ou o hook não alcançou o Stack.`
        );
      }
    } else if (item.targetTab) {
      setActiveTab(item.targetTab);
    } else {
      Alert.alert(item.title, `Acessando módulo de ${item.title}...`);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <>
            <View style={styles.welcomeCard}>
              <View style={styles.welcomeHeader}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>{user.avatarInitials}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.welcomeSubtitle}>Órgão: SVPM</Text>
                  <Text style={styles.welcomeTitle}>{user.nomeCompleto}</Text>
                  <Text style={styles.nipText}>Identificação: {user.vinculo}</Text>
                </View>
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Principais Serviços</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                {PRINCIPAIS_SERVICOS_LIST.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.shortcutCard}
                    onPress={() => handleAction(item)}
                  >
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
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Serviços</Text>
              <View style={styles.gridContainer}>
                {SOLICITACOES_LIST.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.gridItem}
                    onPress={() => handleAction(item)}
                  >
                    {(item as any).badge && (
                      <View style={styles.gridBadge}>
                        <Text style={styles.badgeNewText}>{(item as any).badge}</Text>
                      </View>
                    )}
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
                  <TouchableOpacity
                    key={index}
                    style={styles.gridItem}
                    onPress={() => handleAction(item)}
                  >
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
        return (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Todos os Serviços</Text>
            <Text style={styles.sectionSubtitle}>Selecione o serviço pretendido</Text>
            <View style={styles.gridTwoColumnsContainer}>
              {SOLICITACOES_LIST.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.gridTwoColumnsItem}
                  onPress={() => handleAction(item)}
                >
                  {(item as any).badge && (
                    <View style={styles.gridBadge}>
                      <Text style={styles.badgeNewText}>{(item as any).badge}</Text>
                    </View>
                  )}
                  <View style={styles.gridIconBg}>
                    {item.iconLib === 'MaterialCommunityIcons' ? (
                      <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
                    ) : (
                      <Ionicons name={item.icon as any} size={28} color={item.color} />
                    )}
                  </View>
                  <Text style={styles.gridTwoColumnsText} numberOfLines={2}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'links':
        return (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Links Úteis da Marinha</Text>
            <Text style={styles.sectionSubtitle}>Acesse os portais e sistemas externos</Text>
            <View style={styles.gridTwoColumnsContainer}>
              {LINKS_UTEIS_LIST.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.gridTwoColumnsItem}
                  onPress={() => handleAction(item)}
                >
                  <View style={styles.gridIconBg}>
                    {item.iconLib === 'MaterialCommunityIcons' ? (
                      <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
                    ) : (
                      <Ionicons name={item.icon as any} size={28} color={item.color} />
                    )}
                  </View>
                  <Text style={styles.gridTwoColumnsText} numberOfLines={2}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'perfil':
        return (
          <View style={styles.tabPlaceholderContainer}>
            <Ionicons name="person-circle-outline" size={56} color="#003366" />
            <Text style={styles.tabPlaceholderTitle}>{user.nomeCompleto}</Text>
            <Text style={styles.tabPlaceholderSub}>Vínculo: {user.vinculo}</Text>
            <Text style={styles.tabPlaceholderSub}>Perfil de acesso em ambiente integrado</Text>
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
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() => Alert.alert('Sair', 'Sessão encerrada.')}
          >
            <Ionicons name="log-out-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {renderContent()}
      </ScrollView>

      <Modal visible={drawerVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.drawerContainer}>
            <View style={styles.drawerHeader}>
              <View style={styles.drawerAvatar}>
                <Text style={styles.avatarText}>{user.avatarInitials}</Text>
              </View>
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={styles.drawerUserName} numberOfLines={1}>
                  {user.nomeCompleto}
                </Text>
                <Text style={styles.drawerUserSub}>{user.vinculo}</Text>
              </View>
              <TouchableOpacity onPress={() => setDrawerVisible(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ padding: 16 }}>
              {[
                { label: 'Início', icon: 'home-outline', tab: 'inicio' as TabType },
                { label: 'Serviços', icon: 'document-text-outline', tab: 'solicitacoes' as TabType },
                { label: 'Links Úteis', icon: 'link-outline', tab: 'links' as TabType },
                {
                  label: 'Dados do Perfil',
                  icon: 'person-outline',
                  action: () => {
                    setDrawerVisible(false);
                    navigation.navigate('cadastrais');
                  },
                },
              ].map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.drawerItem}
                  onPress={() => {
                    if (item.action) {
                      item.action();
                    } else if (item.tab) {
                      setActiveTab(item.tab);
                      setDrawerVisible(false);
                    }
                  }}
                >
                  <Ionicons name={item.icon as any} size={22} color="#003366" style={{ width: 30 }} />
                  <Text style={styles.drawerItemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}
            onPress={() => setDrawerVisible(false)}
          />
        </View>
      </Modal>

      <View style={styles.bottomBar}>
        {[
          { key: 'inicio', label: 'Início', icon: 'home' },
          { key: 'solicitacoes', label: 'Serviços', icon: 'list' },
          { key: 'links', label: 'Links', icon: 'link' },
          { key: 'perfil', label: 'Perfil', icon: 'person' },
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.bottomBarItem}
              onPress={() => setActiveTab(tab.key as TabType)}
            >
              <Ionicons
                name={(isActive ? tab.icon : `${tab.icon}-outline`) as any}
                size={22}
                color={isActive ? '#003366' : '#666'}
              />
              <Text style={[styles.bottomBarText, isActive && styles.bottomBarTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
  welcomeCard: { backgroundColor: '#003366', paddingHorizontal: 20, paddingBottom: 24, paddingTop: 12, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  welcomeHeader: { flexDirection: 'row', alignItems: 'center' },
  avatarCircle: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#1e4d7a', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#ffffff30' },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  welcomeSubtitle: { color: '#b0c4de', fontSize: 12, marginBottom: 2 },
  welcomeTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  nipText: { color: '#e0e8f0', fontSize: 12, marginTop: 2 },
  sectionContainer: { marginTop: 20, paddingHorizontal: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  sectionSubtitle: { fontSize: 12, color: '#666', marginBottom: 12 },
  seeAllText: { color: '#003366', fontWeight: '600', fontSize: 13 },
  horizontalScroll: { paddingRight: 16 },
  shortcutCard: { width: 110, backgroundColor: '#fff', borderRadius: 14, padding: 10, marginRight: 12, alignItems: 'center', justifyContent: 'center', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  shortcutIconBg: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  shortcutText: { fontSize: 11, fontWeight: '600', color: '#333', textAlign: 'center', lineHeight: 14 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: (width - 44) / 3, backgroundColor: '#fff', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 6, alignItems: 'center', marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  gridTwoColumnsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridTwoColumnsItem: { width: (width - 40) / 2, backgroundColor: '#fff', borderRadius: 16, paddingVertical: 18, paddingHorizontal: 12, alignItems: 'center', marginBottom: 14, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  gridTwoColumnsText: { fontSize: 12.5, fontWeight: '600', color: '#333', textAlign: 'center', lineHeight: 16, marginTop: 8 },
  gridBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: '#28a745', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 4, zIndex: 1 },
  badgeNewText: { color: '#fff', fontSize: 9, fontWeight: 'bold' },
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
  drawerItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  drawerItemText: { fontSize: 15, color: '#333', fontWeight: '500' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 65, backgroundColor: '#fff', flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#e0e0e0', elevation: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
  bottomBarItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bottomBarText: { fontSize: 11, color: '#666', marginTop: 3 },
  bottomBarTextActive: { color: '#003366', fontWeight: 'bold' },
});