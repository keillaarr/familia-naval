import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
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

const todosDistritos = [
  'COM1DN',
  'COM2DN',
  'COM3DN',
  'COM4DN',
  'COM5DN',
  'COM6DN',
  'COM7DN',
  'COM8DN',
  'COM9DN',
];

const categorias = [
  {
    titulo: 'Administração/Intendência',
    itens: [
      'Administração em Geral',
      'Administração de Produção',
      'Administração de Setores Específicos (Gastronomia)',
      'Administração de Setores Específicos (Hotelaria)',
      'Administração de Setores Específicos (Hospitalar)',
      'Auditoria',
      'Ciência e Tecnologia de Alimentos',
      'Contabilidade',
      'Cozinheiro',
      'Direito em Geral',
      'Direito Financeiro',
      'Direito Aplicado a Atributos',
      'Escrevente',
      'Estatística',
      'Gestão de Conhecimentos',
      'Gestão de Projetos',
      'Gestão Pública',
      'Intendência',
      'Logística Material',
      'Paiol',
      'Secretaria',
      'Barbearia',
      'Parceria Pública-Privada',
      'Direito Aplicado a Patrimônio',
      'Negociação',
      'Modelagem em Processos',
      'Licitações e Contratos',
      'Economia',
    ],
  },
  {
    titulo: 'Mecânica e Elétrica',
    itens: [
      'Eletricidade',
      'Eletrônica',
      'Mecânica',
      'Mecatrônica',
      'Metalurgia',
      'Refrigeração',
      'Funilaria',
    ],
  },
  {
    titulo: 'Assistência Social',
    itens: ['Serviço Social', 'Teologia'],
  },
  {
    titulo: 'Assuntos Marítimos',
    itens: [
      'Assuntos Marítimos e Portuários',
      'Direito Marítimo',
      'Segurança do Tráfego Aquaviário',
      'Tecnologia em Sistemas de Navegação',
    ],
  },
  {
    titulo: 'Engenharia Naval',
    itens: [
      'Desenho Industrial',
      'Eletrotécnica',
      'Engenharia de Materiais e Metalúrgica',
      'Engenharia de Produção',
      'Engenharia Industrial',
      'Engenharia Mecânica',
      'Engenharia Mecatrônica',
      'Engenharia Naval',
      'Engenharia Nuclear',
      'Engenharia Química',
      'Estruturas Navais',
      'Máquinas e Motores',
      'Mecânica e Marcenaria',
    ],
  },
  {
    titulo: 'Informática',
    itens: [
      'Ciência da Computação',
      'Computação Gráfica',
      'Criptografia',
      'Engenharia de Computação',
      'Engenharia de Software',
      'Guerra Cibernética',
      'Redes de Computadores',
      'Segurança da Informação',
      'Governança de TI',
      'Programação',
      'Programação PHP',
      'Programação JAVA',
      'Telecomunicações',
      'Webdesign',
      'Banco de Dados',
    ],
  },
  {
    titulo: 'Ensino',
    itens: [
      'Ciências Biológicas',
      'Ensino Técnico-Profissional',
      'Educação Física',
      'Física',
      'História',
      'Geografia',
      'Liderança',
      'Matemática',
      'Pedagogia',
      'Psicologia (Exceto Área Clínica)',
      'Redação',
      'Redação de Textos Acadêmicos',
      'Seleção de Pessoal',
      'Tradução Simultânea',
      'Tradução Literária',
      'Letras',
      'Tecnologia Educacional',
    ],
  },
  {
    titulo: 'Estudos Militares',
    itens: ['Estado Maior', 'Inteligência', 'Política e Estratégia'],
  },
  {
    titulo: 'Fuzileiros Navais',
    itens: [
      'Armamento',
      'Artilharia',
      'Comunicações',
      'Condução de Viatura Militar',
      'Defesa QBN em Ambiente Terrestre',
      'Engenharia Militar',
      'Guerra Anfíbia',
      'Mecânica de Carros de Combate',
      'Segurança de Áreas e Instalações',
      'Segurança Pessoal',
      'Máquinas e Motores do CFN',
    ],
  },
  {
    titulo: 'Hidrografia, Navegação e Comunicações Navais',
    itens: [
      'Artes Gráficas',
      'Cartografia',
      'Geofísica e Geologia',
      'Hidrografia',
      'Navegação',
      'Oceanografia Física',
      'Sinalização Náutica',
      'Sensoriamento Remoto',
      'Comunicações Navais',
      'Comunicações Interiores',
    ],
  },
  {
    titulo: 'Obras',
    itens: [
      'Arquitetura e Urbanismo',
      'Engenharia',
      'Engenharia Costeira e Portuária',
      'Engenharia Sanitária',
      'Marcenaria',
      'Carpintaria',
      'Hidráulica',
      'Elétrica',
      'Reforma e Pintura',
      'Jardinagem',
      'Serralheria',
    ],
  },
  {
    titulo: 'Operações Navais e Sistemas de Armas',
    itens: [
      'Guerra Eletrônica',
      'Manobras, Reparos e Sinais',
      'Mergulho',
      'Operador de Drone',
      'Controle Naval do Tráfego Marítimo',
      'Análise de Imagens Aplicadas à Inteligência Operacional',
      'Direção de Tiro',
      'Operador de Radar',
      'Operador de Sonar',
      'Sistema de Armas',
      'Sistema de Armas: Armamento',
      'Sistema de Armas: Eletrônica',
      'Sistema de Armas: Mecatrônica',
      'Sistema de Armas: Química',
      'Sistema de Armas: Potência Pulsada',
      'Adestramento',
    ],
  },
  {
    titulo: 'Patrimônio Histórico e Cultural',
    itens: [
      'Arqueologia',
      'Arquivologia e Gestão de Documentos',
      'Biblioteconomia',
      'Museologia',
      'História',
    ],
  },
  {
    titulo: 'Saúde',
    itens: [
      'Biologia (Área Médica)',
      'Enfermagem',
      'Farmácia',
      'Fisioterapia',
      'Fonoaudiologia',
      'Medicina',
      'Medicina Veterinária',
      'Nutrição',
      'Odontologia',
      'Psicologia (Área Clínica)',
      'Terapia Ocupacional',
      'Prótese',
      'Psiquiatria',
    ],
  },
  {
    titulo: 'Defesa Nacional',
    itens: [
      'Ciência Política',
      'Direito Aplicado às Operações Militares',
      'Direito Internacional Humanitário',
      'Direito Internacional Público',
      'Doutrina de Comando e Controle',
      'Doutrinas Marítima e Naval',
      'Economia e Indústria de Defesa',
      'Estratégia, Estratégia Marítima e Estratégia Naval',
      'Estudo de Operações Militares',
      'Geopolítica',
      'Gestão Estratégica',
      'Jogos de Guerra e de Crise',
      'Logística Militar Naval',
      'Planejamento Estratégico de Defesa',
      'Planejamento Militar',
      'Políticas de Defesa Nacional, Marítima Nacional e Naval',
      'Processo de Tomada de Decisão',
      'Relações Internacionais',
    ],
  },
  {
    titulo: 'Multidisciplinar',
    itens: ['Gestão Ambiental', 'Comunicação Social', 'Atendimento ao Público'],
  },
  {
    titulo: 'Ciência, Tecnologia e Inovação',
    itens: [
      'Acústica Submarina',
      'Biotecnologia Marinha',
      'Ciência Ambiental',
      'Controle e Automação',
      'Ecologia Marinha',
      'Engenharia de Produção Aplicada a Pesquisa Operacional e Gestão da Inovação',
      'Engenharia Oceânica',
      'Engenharia Submarina',
      'Ergonomia',
      'Física',
      'Matemática Aplicada',
      'Metrologia e Qualidade',
      'Nanotecnologia',
      'Oceanografia Química, Biológica e Acústica',
      'Pesquisa e Desenvolvimento de Materiais',
      'Processos Decisórios',
      'Propriedade Intelectual',
      'Sistemas Inerciais',
    ],
  },
  {
    titulo: 'Pessoal',
    itens: [
      'Gestão de Pessoal Civil',
      'Gestão de Pessoal Militar',
      'Identificação',
    ],
  },
];

export default function CadastroTTCScreen() {
  const [enviando, setEnviando] = useState(false);
  const [textoLivre, setTextoLivre] = useState('');
  const [distritosSelecionados, setDistritosSelecionados] = useState<string[]>([]);
  const [assuntosSelecionados, setAssuntosSelecionados] = useState<string[]>([]);
  const [categoriasAbertas, setCategoriasAbertas] = useState<Record<string, boolean>>({});

  const toggleCategoria = (titulo: string) => {
    setCategoriasAbertas((prev) => ({ ...prev, [titulo]: !prev[titulo] }));
  };

  const adicionarOuRemoverDistrito = (item: string) => {
    setDistritosSelecionados((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const toggleAssunto = (item: string) => {
    setAssuntosSelecionados((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleSalvar = async () => {
    setEnviando(true);
    try {
      const payload = {
        distritos: distritosSelecionados,
        assuntos: assuntosSelecionados,
        informacoesComplementares: textoLivre,
      };
      console.log('Enviando para /cadastro-ttc:', payload);
      setTimeout(() => {
        setEnviando(false);
        Alert.alert('Sucesso', 'Requerimento TTC salvo e publicado com sucesso!');
      }, 800);
    } catch {
      setEnviando(false);
      Alert.alert('Erro', 'Não foi possível concluir a publicação.');
    }
  };

  const handleRemover = () => {
    Alert.alert(
      'Remover Publicação',
      'Tem certeza que deseja despublicar este cadastro TTC?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            setDistritosSelecionados([]);
            setAssuntosSelecionados([]);
            setTextoLivre('');
            Alert.alert('Removido', 'Cadastro despublicado.');
          },
        },
      ]
    );
  };

  const distritosDisponiveis = todosDistritos.filter(
    (d) => !distritosSelecionados.includes(d)
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#003366" />

      {/* Header Fixo Padronizado Família Naval */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.drawerButton}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerSubtitle}>FAMÍLIA NAVAL</Text>
            <Text style={styles.headerTitle}>Cadastro TTC</Text>
          </View>
        </View>
        <Ionicons name="shield-checkmark-outline" size={20} color="#b0c4de" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Banner Informativo / Autorização */}
        <View style={styles.authBanner}>
          <Ionicons name="lock-closed-outline" size={20} color={COLORS.primary} style={{ marginRight: 10 }} />
          <Text style={styles.authBannerText}>
            Dados criptografados para seleção interna de pessoal TTC autorizado.
          </Text>
        </View>

        {/* DISTRITOS NAVAIS */}
        <Text style={styles.sectionTitle}>Distritos Navais Desejados</Text>
        <View style={styles.card}>
          {distritosSelecionados.length > 0 && (
            <View style={{ marginBottom: 14 }}>
              <Text style={styles.subLabel}>Selecionados ({distritosSelecionados.length})</Text>
              <View style={styles.chipsWrap}>
                {distritosSelecionados.map((item) => (
                  <TouchableOpacity
                    key={`sel-${item}`}
                    style={[styles.chipItem, styles.chipSelecionado]}
                    onPress={() => adicionarOuRemoverDistrito(item)}
                    accessibilityRole="button"
                    accessibilityLabel={`Remover distrito ${item}`}
                  >
                    <Text style={styles.chipTextoSelecionado}>{item}</Text>
                    <Ionicons name="close" size={14} color="#FFF" style={{ marginLeft: 4 }} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <Text style={styles.subLabel}>
            {distritosSelecionados.length > 0 ? 'Adicionar mais distritos:' : 'Toque para selecionar:'}
          </Text>
          <View style={styles.chipsWrap}>
            {distritosDisponiveis.map((item) => (
              <TouchableOpacity
                key={`disponivel-${item}`}
                style={[styles.chipItem, styles.chipDisponivel]}
                onPress={() => adicionarOuRemoverDistrito(item)}
                accessibilityRole="button"
                accessibilityLabel={`Adicionar distrito ${item}`}
              >
                <Text style={styles.chipTextoDisponivel}>{item}</Text>
                <Ionicons name="add" size={14} color={COLORS.primary} style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ÁREAS DE INTERESSE */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Áreas de Interesse</Text>
          <Text style={styles.counterBadge}>{assuntosSelecionados.length} selecionados</Text>
        </View>

        {categorias.map((categoria) => {
          const aberta = categoriasAbertas[categoria.titulo] ?? false;
          const selecionadosNaCat = categoria.itens.filter((i) =>
            assuntosSelecionados.includes(i)
          ).length;

          return (
            <View key={categoria.titulo} style={styles.categoriaContainer}>
              <TouchableOpacity
                style={[styles.categoriaHeader, aberta && styles.categoriaHeaderOpen]}
                onPress={() => toggleCategoria(categoria.titulo)}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityState={{ expanded: aberta }}
              >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={styles.categoriaTitulo}>{categoria.titulo}</Text>
                  {selecionadosNaCat > 0 && (
                    <View style={styles.badgeCountCat}>
                      <Text style={styles.badgeCountCatText}>{selecionadosNaCat}</Text>
                    </View>
                  )}
                </View>
                <Ionicons
                  name={aberta ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={aberta ? COLORS.primary : COLORS.textMuted}
                  style={{ marginLeft: 8 }}
                />
              </TouchableOpacity>

              {aberta && (
                <View style={styles.cardCategoria}>
                  {categoria.itens.map((item) => {
                    const selecionado = assuntosSelecionados.includes(item);
                    return (
                      <TouchableOpacity
                        key={item}
                        style={[styles.checkboxItem, selecionado && styles.checkboxItemActive]}
                        onPress={() => toggleAssunto(item)}
                        activeOpacity={0.7}
                        accessibilityRole="checkbox"
                        accessibilityState={{ checked: selecionado }}
                        accessibilityLabel={`Assunto ${item}`}
                      >
                        <Ionicons
                          name={selecionado ? 'checkbox' : 'square-outline'}
                          size={20}
                          color={selecionado ? COLORS.primary : '#999'}
                          style={{ marginRight: 10 }}
                        />
                        <Text style={[styles.checkboxTexto, selecionado && { fontWeight: '700', color: COLORS.primary }]}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}

        {/* INFORMAÇÕES COMPLEMENTARES */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Informações Complementares</Text>
        <View style={styles.card}>
          <TextInput
            multiline
            numberOfLines={5}
            placeholder="Detalhe experiências específicas, certificações ou disponibilidade..."
            placeholderTextColor="#999"
            style={styles.textArea}
            value={textoLivre}
            onChangeText={setTextoLivre}
            accessibilityLabel="Informações complementares"
          />
        </View>

        {/* BOTÕES DE AÇÃO */}
        <TouchableOpacity
          style={styles.botaoSalvar}
          onPress={handleSalvar}
          disabled={enviando}
          activeOpacity={0.8}
          accessibilityRole="button"
        >
          {enviando ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={18} color="#FFF" style={{ marginRight: 8 }} />
              <Text style={styles.botaoSalvarTexto}>Atualizar Perfil e Publicar</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoRemover}
          onPress={handleRemover}
          activeOpacity={0.8}
          accessibilityRole="button"
        >
          <Ionicons name="trash-outline" size={16} color={COLORS.danger} style={{ marginRight: 6 }} />
          <Text style={styles.botaoRemoverTexto}>Remover Publicação</Text>
        </TouchableOpacity>
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
  success: '#2E7D32',
  danger: '#C62828',
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
    backgroundColor: COLORS.bg,
    flexGrow: 1,
  },
  authBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1,
    borderColor: '#C5DDF3',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  authBannerText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
    lineHeight: 18,
  },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
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
  card: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    padding: 16,
  },
  subLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipDisponivel: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
  },
  chipSelecionado: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipTextoDisponivel: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextoSelecionado: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
  },
  categoriaContainer: {
    marginBottom: 10,
  },
  categoriaHeader: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderColor: COLORS.border,
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 3,
  },
  categoriaHeaderOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: COLORS.primaryLight,
    borderColor: '#C5DDF3',
  },
  categoriaTitulo: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  badgeCountCat: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeCountCatText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  cardCategoria: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderColor: '#C5DDF3',
    borderTopWidth: 0,
    borderWidth: 1,
    padding: 12,
  },
  checkboxItem: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  checkboxItemActive: {
    backgroundColor: '#F0F7FF',
  },
  checkboxTexto: {
    color: COLORS.text,
    fontSize: 13,
    flex: 1,
  },
  textArea: {
    backgroundColor: '#F8F9FA',
    borderColor: COLORS.borderLight,
    borderRadius: 10,
    borderWidth: 1,
    color: COLORS.text,
    fontSize: 14,
    minHeight: 110,
    padding: 12,
    textAlignVertical: 'top',
  },
  botaoSalvar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.success,
    borderRadius: 12,
    marginTop: 24,
    padding: 16,
    elevation: 2,
  },
  botaoSalvarTexto: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  botaoRemover: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEBEE',
    borderWidth: 1,
    borderColor: '#FFCDD2',
    borderRadius: 12,
    marginTop: 12,
    padding: 14,
  },
  botaoRemoverTexto: {
    color: COLORS.danger,
    fontSize: 14,
    fontWeight: 'bold',
  },
});