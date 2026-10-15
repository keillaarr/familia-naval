import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';

const API_BASE_URL = 'http://10.0.2.2:8080/api/v1';

const todosDistritos = [
  'COM1DN', 'COM2DN', 'COM3DN', 'COM4DN', 'COM5DN',
  'COM6DN', 'COM7DN', 'COM8DN', 'COM9DN',
];

const categoriasEstaticas = [
  {
    titulo: 'Administração/Intendência',
    itens: [
      { id: 1, nome: 'Administração em Geral' },
      { id: 2, nome: 'Administração de Produção' },
      { id: 3, nome: 'Administração de Setores Específicos (Gastronomia)' },
      { id: 4, nome: 'Administração de Setores Específicos (Hotelaria)' },
      { id: 5, nome: 'Administração de Setores Específicos (Hospitalar)' },
      { id: 6, nome: 'Auditoria' },
      { id: 7, nome: 'Ciência e Tecnologia de Alimentos' },
      { id: 8, nome: 'Contabilidade' },
      { id: 9, nome: 'Cozinheiro' },
      { id: 10, nome: 'Direito em Geral' },
      { id: 11, nome: 'Direito Financeiro' },
      { id: 12, nome: 'Direito Aplicado a Atributos' },
      { id: 13, nome: 'Escrevente' },
      { id: 14, nome: 'Estatística' },
      { id: 15, nome: 'Gestão de Conhecimentos' },
      { id: 16, nome: 'Gestão de Projetos' },
      { id: 17, nome: 'Gestão Pública' },
      { id: 18, nome: 'Intendência' },
      { id: 19, nome: 'Logística Material' },
      { id: 20, nome: 'Paiol' },
      { id: 21, nome: 'Secretaria' },
      { id: 22, nome: 'Barbearia' },
      { id: 23, nome: 'Parceria Pública-Privada' },
      { id: 24, nome: 'Direito Aplicado a Patrimônio' },
      { id: 25, nome: 'Negociação' },
      { id: 26, nome: 'Modelagem em Processos' },
      { id: 27, nome: 'Licitações e Contratos' },
      { id: 28, nome: 'Economia' },
    ],
  },
  {
    titulo: 'Mecânica e Elétrica',
    itens: [
      { id: 29, nome: 'Eletricidade' },
      { id: 30, nome: 'Eletrônica' },
      { id: 31, nome: 'Mecânica' },
      { id: 32, nome: 'Mecatrônica' },
      { id: 33, nome: 'Metalurgia' },
      { id: 34, nome: 'Refrigeração' },
      { id: 35, nome: 'Funilaria' },
    ],
  },
  {
    titulo: 'Assistência Social',
    itens: [
      { id: 36, nome: 'Serviço Social' },
      { id: 37, nome: 'Teologia' },
    ],
  },
  {
    titulo: 'Assuntos Marítimos',
    itens: [
      { id: 38, nome: 'Assuntos Marítimos e Portuários' },
      { id: 39, nome: 'Direito Marítimo' },
      { id: 40, nome: 'Segurança do Tráfego Aquaviário' },
      { id: 41, nome: 'Tecnologia em Sistemas de Navegação' },
    ],
  },
  {
    titulo: 'Engenharia Naval',
    itens: [
      { id: 42, nome: 'Desenho Industrial' },
      { id: 43, nome: 'Eletrotécnica' },
      { id: 44, nome: 'Engenharia de Materiais e Metalúrgica' },
      { id: 45, nome: 'Engenharia de Produção' },
      { id: 46, nome: 'Engenharia Industrial' },
      { id: 47, nome: 'Engenharia Mecânica' },
      { id: 48, nome: 'Engenharia Mecatrônica' },
      { id: 49, nome: 'Engenharia Naval' },
      { id: 50, nome: 'Engenharia Nuclear' },
      { id: 51, nome: 'Engenharia Química' },
      { id: 52, nome: 'Estruturas Navais' },
      { id: 53, nome: 'Máquinas e Motores' },
      { id: 54, nome: 'Mecânica e Marcenaria' },
    ],
  },
  {
    titulo: 'Informática',
    itens: [
      { id: 55, nome: 'Ciência da Computação' },
      { id: 56, nome: 'Computação Gráfica' },
      { id: 57, nome: 'Criptografia' },
      { id: 58, nome: 'Engenharia de Computação' },
      { id: 59, nome: 'Engenharia de Software' },
      { id: 60, nome: 'Guerra Cibernética' },
      { id: 61, nome: 'Redes de Computadores' },
      { id: 62, nome: 'Segurança da Informação' },
      { id: 63, nome: 'Governança de TI' },
      { id: 64, nome: 'Programação' },
      { id: 65, nome: 'Programação PHP' },
      { id: 66, nome: 'Programação JAVA' },
      { id: 67, nome: 'Telecomunicações' },
      { id: 68, nome: 'Webdesign' },
      { id: 69, nome: 'Banco de Dados' },
    ],
  },
  {
    titulo: 'Ensino',
    itens: [
      { id: 70, nome: 'Ciências Biológicas' },
      { id: 71, nome: 'Ensino Técnico-Profissional' },
      { id: 72, nome: 'Educação Física' },
      { id: 73, nome: 'Física' },
      { id: 74, nome: 'História' },
      { id: 75, nome: 'Geografia' },
      { id: 76, nome: 'Liderança' },
      { id: 77, nome: 'Matemática' },
      { id: 78, nome: 'Pedagogia' },
      { id: 79, nome: 'Psicologia (Exceto Área Clínica)' },
      { id: 80, nome: 'Redação' },
      { id: 81, nome: 'Redação de Textos Acadêmicos' },
      { id: 82, nome: 'Seleção de Pessoal' },
      { id: 83, nome: 'Tradução Simultânea' },
      { id: 84, nome: 'Tradução Literária' },
      { id: 85, nome: 'Letras' },
      { id: 86, nome: 'Tecnologia Educacional' },
    ],
  },
  {
    titulo: 'Estudos Militares',
    itens: [
      { id: 87, nome: 'Estado Maior' },
      { id: 88, nome: 'Inteligência' },
      { id: 89, nome: 'Política e Estratégia' },
    ],
  },
  {
    titulo: 'Fuzileiros Navais',
    itens: [
      { id: 90, nome: 'Armamento' },
      { id: 91, nome: 'Artilharia' },
      { id: 92, nome: 'Comunicações' },
      { id: 93, nome: 'Condução de Viatura Militar' },
      { id: 94, nome: 'Defesa QBN em Ambiente Terrestre' },
      { id: 95, nome: 'Engenharia Militar' },
      { id: 96, nome: 'Guerra Anfíbia' },
      { id: 97, nome: 'Mecânica de Carros de Combate' },
      { id: 98, nome: 'Segurança de Áreas e Instalações' },
      { id: 99, nome: 'Segurança Pessoal' },
      { id: 100, nome: 'Máquinas e Motores do CFN' },
    ],
  },
  {
    titulo: 'Hidrografia, Navegação e Comunicações Navais',
    itens: [
      { id: 101, nome: 'Artes Gráficas' },
      { id: 102, nome: 'Cartografia' },
      { id: 103, nome: 'Geofísica e Geologia' },
      { id: 104, nome: 'Hidrografia' },
      { id: 105, nome: 'Navegação' },
      { id: 106, nome: 'Oceanografia Física' },
      { id: 107, nome: 'Sinalização Náutica' },
      { id: 108, nome: 'Sensoriamento Remoto' },
      { id: 109, nome: 'Comunicações Navais' },
      { id: 110, nome: 'Comunicações Interiores' },
    ],
  },
  {
    titulo: 'Obras',
    itens: [
      { id: 111, nome: 'Arquitetura e Urbanismo' },
      { id: 112, nome: 'Engenharia' },
      { id: 113, nome: 'Engenharia Costeira e Portuária' },
      { id: 114, nome: 'Engenharia Sanitária' },
      { id: 115, nome: 'Marcenaria' },
      { id: 116, nome: 'Carpintaria' },
      { id: 117, nome: 'Hidráulica' },
      { id: 118, nome: 'Elétrica' },
      { id: 119, nome: 'Reforma e Pintura' },
      { id: 120, nome: 'Jardinagem' },
      { id: 121, nome: 'Serralheria' },
    ],
  },
  {
    titulo: 'Operações Navais e Sistemas de Armas',
    itens: [
      { id: 122, nome: 'Guerra Eletrônica' },
      { id: 123, nome: 'Manobras, Reparos e Sinais' },
      { id: 124, nome: 'Mergulho' },
      { id: 125, nome: 'Operador de Drone' },
      { id: 126, nome: 'Controle Naval do Tráfego Marítimo' },
      { id: 127, nome: 'Análise de Imagens Aplicadas à Inteligência Operacional' },
      { id: 128, nome: 'Direção de Tiro' },
      { id: 129, nome: 'Operador de Radar' },
      { id: 130, nome: 'Operador de Sonar' },
      { id: 131, nome: 'Sistema de Armas' },
      { id: 132, nome: 'Sistema de Armas: Armamento' },
      { id: 133, nome: 'Sistema de Armas: Eletrônica' },
      { id: 134, nome: 'Sistema de Armas: Mecatrônica' },
      { id: 135, nome: 'Sistema de Armas: Química' },
      { id: 136, nome: 'Sistema de Armas: Potência Pulsada' },
      { id: 137, nome: 'Adestramento' },
    ],
  },
  {
    titulo: 'Patrimônio Histórico e Cultural',
    itens: [
      { id: 138, nome: 'Arqueologia' },
      { id: 139, nome: 'Arquivologia e Gestão de Documentos' },
      { id: 140, nome: 'Biblioteconomia' },
      { id: 141, nome: 'Museologia' },
      { id: 142, nome: 'História' },
    ],
  },
  {
    titulo: 'Saúde',
    itens: [
      { id: 143, nome: 'Biologia (Área Médica)' },
      { id: 144, nome: 'Enfermagem' },
      { id: 145, nome: 'Farmácia' },
      { id: 146, nome: 'Fisioterapia' },
      { id: 147, nome: 'Fonoaudiologia' },
      { id: 148, nome: 'Medicina' },
      { id: 149, nome: 'Medicina Veterinária' },
      { id: 150, nome: 'Nutrição' },
      { id: 151, nome: 'Odontologia' },
      { id: 152, nome: 'Psicologia (Área Clínica)' },
      { id: 153, nome: 'Terapia Ocupacional' },
      { id: 154, nome: 'Prótese' },
      { id: 155, nome: 'Psiquiatria' },
    ],
  },
  {
    titulo: 'Defesa Nacional',
    itens: [
      { id: 156, nome: 'Ciência Política' },
      { id: 157, nome: 'Direito Aplicado às Operações Militares' },
      { id: 158, nome: 'Direito Internacional Humanitário' },
      { id: 159, nome: 'Direito Internacional Público' },
      { id: 160, nome: 'Doutrina de Comando e Controle' },
      { id: 161, nome: 'Doutrinas Marítima e Naval' },
      { id: 162, nome: 'Economia e Indústria de Defesa' },
      { id: 163, nome: 'Estratégia, Estratégia Marítima e Estratégia Naval' },
      { id: 164, nome: 'Estudo de Operações Militares' },
      { id: 165, nome: 'Geopolítica' },
      { id: 166, nome: 'Gestão Estratégica' },
      { id: 167, nome: 'Jogos de Guerra e de Crise' },
      { id: 168, nome: 'Logística Militar Naval' },
      { id: 169, nome: 'Planejamento Estratégico de Defesa' },
      { id: 170, nome: 'Planejamento Militar' },
      { id: 171, nome: 'Políticas de Defesa Nacional, Marítima Nacional e Naval' },
      { id: 172, nome: 'Processo de Tomada de Decisão' },
      { id: 173, nome: 'Relações Internacionais' },
    ],
  },
  {
    titulo: 'Multidisciplinar',
    itens: [
      { id: 174, nome: 'Gestão Ambiental' },
      { id: 175, nome: 'Comunicação Social' },
      { id: 176, nome: 'Atendimento ao Público' },
    ],
  },
  {
    titulo: 'Ciência, Tecnologia e Inovação',
    itens: [
      { id: 177, nome: 'Acústica Submarina' },
      { id: 178, nome: 'Biotecnologia Marinha' },
      { id: 179, nome: 'Ciência Ambiental' },
      { id: 180, nome: 'Controle e Automação' },
      { id: 181, nome: 'Ecologia Marinha' },
      { id: 182, nome: 'Engenharia de Produção Aplicada a Pesquisa Operacional e Gestão da Inovação' },
      { id: 183, nome: 'Engenharia Oceânica' },
      { id: 184, nome: 'Engenharia Submarina' },
      { id: 185, nome: 'Ergonomia' },
      { id: 186, nome: 'Física' },
      { id: 187, nome: 'Matemática Aplicada' },
      { id: 188, nome: 'Metrologia e Qualidade' },
      { id: 189, nome: 'Nanotecnologia' },
      { id: 190, nome: 'Oceanografia Química, Biológica e Acústica' },
      { id: 191, nome: 'Pesquisa e Desenvolvimento de Materiais' },
      { id: 192, nome: 'Processos Decisórios' },
      { id: 193, nome: 'Propriedade Intelectual' },
      { id: 194, nome: 'Sistemas Inerciais' },
    ],
  },
  {
    titulo: 'Pessoal',
    itens: [
      { id: 195, nome: 'Gestão de Pessoal Civil' },
      { id: 196, nome: 'Gestão de Pessoal Militar' },
      { id: 197, nome: 'Identificação' },
    ],
  },
];

interface ItemOpcao {
  id: number;
  nome: string;
  sigla?: string;
}

export default function CadastroTTCScreen() {
  const { usuario } = useAuth();
  const [enviando, setEnviando] = useState(false);
  const [textoLivre, setTextoLivre] = useState('');

  const [listaOms, setListaOms] = useState<ItemOpcao[]>([]);
  const [omDesejadaId, setOmDesejadaId] = useState<number | null>(null);
  const [modalOmVisivel, setModalOmVisivel] = useState(false);
  const [buscaOm, setBuscaOm] = useState('');

  const [distritosSelecionados, setDistritosSelecionados] = useState<string[]>([]);
  const [assuntosSelecionadosIds, setAssuntosSelecionadosIds] = useState<number[]>([]);
  const [categoriasAbertas, setCategoriasAbertas] = useState<Record<string, boolean>>({});

  const idPessoaReal = usuario?.idPessoa || usuario?.pessoa?.idPessoa || '325607';

  async function carregarDadosIniciais() {
    try {
      let omsLocal: ItemOpcao[] = [];
      const resOms = await fetch(`${API_BASE_URL}/ttc/oms`, { credentials: 'include' });
      if (resOms.ok) {
        omsLocal = await resOms.json();
        setListaOms(omsLocal);
      }

      if (idPessoaReal) {
        const response = await fetch(`${API_BASE_URL}/ttc/usuario/${idPessoaReal}`, {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          
          if (data) {
            setTextoLivre(
              data.outrasInformacoes ||
              data.outrasinformacoes ||
              data.infoComplementar ||
              ''
            );

            const rawOmId =
              data.omPretendidaId ??
              data.om_pretendida_id ??
              data.omId ??
              data.idOmPretendida;

            const parsedOmId = Number(rawOmId);
            if (!isNaN(parsedOmId) && parsedOmId > 0) {
              setOmDesejadaId(parsedOmId);
            } else {
              setOmDesejadaId(null);
            }

            const rawComando =
              data.comando ??
              data.comandosDecodificados ??
              data.comandosServir ??
              data.ComandosServir ??
              data.distrito;

            let idsComandos: number[] = [];
            if (Array.isArray(rawComando)) {
              idsComandos = rawComando.map(Number);
            } else if (rawComando !== undefined && rawComando !== null) {
              const num = Number(rawComando);
              if (!isNaN(num)) idsComandos = [num];
            }

            const distritosMapeados: string[] = [];
            idsComandos.forEach((id) => {
              if (id >= 1 && id <= todosDistritos.length) {
                distritosMapeados.push(todosDistritos[id - 1]);
              }
            });
            setDistritosSelecionados(distritosMapeados);

            const assuntosSalvos =
              data.ids_areas_interesse ||
              data.assuntosUsuario ||
              data.assuntos ||
              [];

            if (Array.isArray(assuntosSalvos) && assuntosSalvos.length > 0) {
              setAssuntosSelecionadosIds(assuntosSalvos.map(Number));
            } else {
              setAssuntosSelecionadosIds([]);
            }
          }
        }
      }
    } catch (e) {
      console.error('Erro ao carregar dados iniciais:', e);
    }
  }

  useEffect(() => {
    carregarDadosIniciais();
  }, [idPessoaReal]);

  const toggleCategoria = (titulo: string) => {
    setCategoriasAbertas((prev) => ({ ...prev, [titulo]: !prev[titulo] }));
  };

  const toggleDistrito = (item: string) => {
    setDistritosSelecionados((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const toggleAssunto = (id: number) => {
    setAssuntosSelecionadosIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const omSelecionadaObj = listaOms.find((o) => Number(o.id) === Number(omDesejadaId));
  const omsFiltradas = listaOms.filter(
    (om) =>
      om.nome.toLowerCase().includes(buscaOm.toLowerCase()) ||
      (om.sigla && om.sigla.toLowerCase().includes(buscaOm.toLowerCase()))
  );

  const handleSalvar = async () => {
    setEnviando(true);
    try {
      const mapaDistritos: Record<string, number> = {
        'COM1DN': 1,
        'COM2DN': 2,
        'COM3DN': 3,
        'COM4DN': 4,
        'COM5DN': 5,
        'COM6DN': 6,
        'COM7DN': 7,
        'COM8DN': 8,
        'COM9DN': 9,
      };

      const idsComandos = distritosSelecionados.map((dist) => {
        return mapaDistritos[dist] || 1;
      });

      const payload = {
        idPessoa: Number(idPessoaReal),
        comandoServir: idsComandos,
        comandosServir: idsComandos,
        comando: idsComandos,
        infoComplementar: textoLivre,
        omPretendidaId: omDesejadaId ? Number(omDesejadaId) : null,
        assuntos: assuntosSelecionadosIds,
      };

      const response = await fetch(`${API_BASE_URL}/ttc/salvar`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const erroTexto = await response.text();
        console.error('Erro retornado pela API:', erroTexto);
        throw new Error('Falha ao salvar cadastro TTC.');
      }

      Alert.alert('Sucesso', 'Requerimento TTC salvo e publicado com sucesso!');
      await carregarDadosIniciais(); 
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível concluir a publicação.');
    } finally {
      setEnviando(false);
    }
  };

  const handleRemover = async () => {
    Alert.alert(
      'Remover Publicação',
      'Tem certeza que deseja despublicar este cadastro TTC?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              if (idPessoaReal) {
                await fetch(`${API_BASE_URL}/ttc/remover-publicacao/${idPessoaReal}`, {
                  method: 'POST',
                  credentials: 'include',
                });
              }
              Alert.alert('Removido', 'Cadastro despublicado.');
              await carregarDadosIniciais(); 
            } catch (e) {
              Alert.alert('Erro', 'Não foi possível remover a publicação.');
            }
          },
        },
      ]
    );
  };

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
            <Text style={styles.headerTitle}>Cadastro TTC</Text>
          </View>
        </View>
        <Ionicons name="shield-checkmark-outline" size={20} color="#b0c4de" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.authBanner}>
          <Ionicons name="lock-closed-outline" size={20} color={COLORS.primary} style={{ marginRight: 10 }} />
          <Text style={styles.authBannerText}>
            Dados criptografados para seleção interna de pessoal TTC autorizado.
          </Text>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Distritos Navais Desejados (Comandos a Servir)</Text>
          <Text style={styles.counterBadge}>{distritosSelecionados.length} selecionados</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.subLabel}>Selecione um ou mais distritos:</Text>
          <View style={styles.chipsWrap}>
            {todosDistritos.map((item) => {
              const selecionado = distritosSelecionados.includes(item);
              return (
                <TouchableOpacity
                  key={`distrito-${item}`}
                  style={[styles.chipItem, selecionado ? styles.chipSelecionado : styles.chipDisponivel]}
                  onPress={() => toggleDistrito(item)}
                >
                  <Text style={selecionado ? styles.chipTextoSelecionado : styles.chipTextoDisponivel}>{item}</Text>
                  {selecionado && <Ionicons name="checkmark" size={14} color="#FFF" style={{ marginLeft: 4 }} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Título atualizado com (Opcional) */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>OM Desejada (Opcional)</Text>
        <TouchableOpacity
          style={styles.seletorOmCard}
          onPress={() => setModalOmVisivel(true)}
          activeOpacity={0.7}
        >
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text style={styles.seletorLabel}>OM Pretendida (Opcional)</Text>
            <Text style={[styles.seletorValor, !omSelecionadaObj && styles.seletorPlaceholder]} numberOfLines={1}>
              {omSelecionadaObj ? omSelecionadaObj.nome : 'Selecione uma Organização Militar...'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Áreas de Interesse</Text>
          <Text style={styles.counterBadge}>{assuntosSelecionadosIds.length} selecionados</Text>
        </View>

        {categoriasEstaticas.map((categoria) => {
          const aberta = categoriasAbertas[categoria.titulo] ?? false;
          const selecionadosNaCat = categoria.itens.filter((i) =>
            assuntosSelecionadosIds.includes(i.id)
          ).length;

          return (
            <View key={categoria.titulo} style={styles.categoriaContainer}>
              <TouchableOpacity
                style={[styles.categoriaHeader, aberta && styles.categoriaHeaderOpen]}
                onPress={() => toggleCategoria(categoria.titulo)}
                activeOpacity={0.8}
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
                  {categoria.itens.map((subItem) => {
                    const selecionado = assuntosSelecionadosIds.includes(subItem.id);
                    return (
                      <TouchableOpacity
                        key={`sub-${subItem.id}`}
                        style={[styles.checkboxItem, selecionado && styles.checkboxItemActive]}
                        onPress={() => toggleAssunto(subItem.id)}
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name={selecionado ? 'checkbox' : 'square-outline'}
                          size={20}
                          color={selecionado ? COLORS.primary : '#999'}
                          style={{ marginRight: 10 }}
                        />
                        <Text style={[styles.checkboxTexto, selecionado && { fontWeight: '700', color: COLORS.primary }]}>
                          {subItem.nome}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}

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
          />
        </View>

        <TouchableOpacity
          style={styles.botaoSalvar}
          onPress={handleSalvar}
          disabled={enviando}
          activeOpacity={0.8}
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
        >
          <Ionicons name="trash-outline" size={16} color={COLORS.danger} style={{ marginRight: 6 }} />
          <Text style={styles.botaoRemoverTexto}>Remover Publicação</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalOmVisivel} animationType="slide" transparent>
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecionar OM Desejada</Text>
              <TouchableOpacity onPress={() => setModalOmVisivel(false)}>
                <Ionicons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.buscaBox}>
              <Ionicons name="search" size={18} color="#999" style={{ marginRight: 8 }} />
              <TextInput
                placeholder="Pesquisar por sigla ou nome..."
                placeholderTextColor="#999"
                style={styles.inputBusca}
                value={buscaOm}
                onChangeText={setBuscaOm}
              />
              {buscaOm.length > 0 && (
                <TouchableOpacity onPress={() => setBuscaOm('')}>
                  <Ionicons name="close-circle" size={18} color="#999" />
                </TouchableOpacity>
              )}
            </View>

            <ScrollView style={{ marginTop: 10 }}>
              <TouchableOpacity
                style={[styles.omOptionItem, !omDesejadaId && styles.omOptionItemActive]}
                onPress={() => {
                  setOmDesejadaId(null);
                  setModalOmVisivel(false);
                  setBuscaOm('');
                }}
              >
                <Text style={[styles.omOptionTexto, !omDesejadaId && styles.omOptionTextoActive]}>
                  Nenhuma (Opcional)
                </Text>
                {!omDesejadaId && <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />}
              </TouchableOpacity>

              {omsFiltradas.map((om) => {
                const selecionada = Number(omDesejadaId) === Number(om.id);
                return (
                  <TouchableOpacity
                    key={`modal-om-${om.id}`}
                    style={[styles.omOptionItem, selecionada && styles.omOptionItemActive]}
                    onPress={() => {
                      setOmDesejadaId(om.id);
                      setModalOmVisivel(false);
                      setBuscaOm('');
                    }}
                  >
                    <Text style={[styles.omOptionTexto, selecionada && styles.omOptionTextoActive]}>
                      {om.nome}
                    </Text>
                    {selecionada && <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />}
                  </TouchableOpacity>
                );
              })}
              {omsFiltradas.length === 0 && (
                <Text style={styles.emptyText}>Nenhuma Organização Militar encontrada.</Text>
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
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
  success: '#2E7D32',
  danger: '#C62828',
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#003366' },
  headerBar: { backgroundColor: '#003366', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  drawerButton: { marginRight: 12 },
  headerSubtitle: { color: '#b0c4de', fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40, backgroundColor: COLORS.bg, flexGrow: 1 },
  authBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primaryLight, borderWidth: 1, borderColor: '#C5DDF3', borderRadius: 12, padding: 14, marginBottom: 16 },
  authBannerText: { color: COLORS.primary, fontSize: 12, fontWeight: '600', flex: 1, lineHeight: 18 },
  sectionTitle: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold', marginBottom: 10, marginTop: 12 },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, marginBottom: 10 },
  counterBadge: { backgroundColor: '#E2E8F0', color: COLORS.textMuted, fontSize: 11, fontWeight: '600', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  card: { backgroundColor: COLORS.white, borderColor: COLORS.border, borderRadius: 16, borderWidth: 1, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, padding: 16 },
  subLabel: { color: COLORS.textMuted, fontSize: 12, fontWeight: '600', marginBottom: 8 },

  seletorOmCard: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
  },
  seletorLabel: { color: COLORS.textMuted, fontSize: 11, fontWeight: '600', marginBottom: 2 },
  seletorValor: { color: COLORS.primary, fontSize: 14, fontWeight: 'bold' },
  seletorPlaceholder: { color: '#999', fontWeight: 'normal' },

  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chipItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1 },
  chipDisponivel: { backgroundColor: COLORS.white, borderColor: COLORS.border },
  chipSelecionado: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipTextoDisponivel: { color: COLORS.primary, fontSize: 13, fontWeight: '600' },
  chipTextoSelecionado: { color: COLORS.white, fontSize: 13, fontWeight: '600' },
  categoriaContainer: { marginBottom: 10 },
  categoriaHeader: { backgroundColor: COLORS.white, borderRadius: 12, borderColor: COLORS.border, borderWidth: 1, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 1, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 3 },
  categoriaHeaderOpen: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0, backgroundColor: COLORS.primaryLight, borderColor: '#C5DDF3' },
  categoriaTitulo: { color: COLORS.primary, fontSize: 14, fontWeight: 'bold' },
  badgeCountCat: { backgroundColor: COLORS.primary, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  badgeCountCatText: { color: '#FFF', fontSize: 11, fontWeight: 'bold' },
  cardCategoria: { backgroundColor: COLORS.white, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, borderColor: '#C5DDF3', borderTopWidth: 0, borderWidth: 1, padding: 12 },
  checkboxItem: { alignItems: 'center', flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 8, borderRadius: 8 },
  checkboxItemActive: { backgroundColor: '#F0F7FF' },
  checkboxTexto: { color: COLORS.text, fontSize: 13, flex: 1 },
  textArea: { backgroundColor: '#F8F9FA', borderColor: COLORS.borderLight, borderRadius: 10, borderWidth: 1, color: COLORS.text, fontSize: 14, minHeight: 110, padding: 12, textAlignVertical: 'top' },
  botaoSalvar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.success, borderRadius: 12, marginTop: 24, padding: 16, elevation: 2 },
  botaoSalvarTexto: { color: COLORS.white, fontSize: 15, fontWeight: 'bold' },
  botaoRemover: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFEBEE', borderColor: '#FFCDD2', borderWidth: 1, borderRadius: 12, marginTop: 12, padding: 14 },
  botaoRemoverTexto: { color: COLORS.danger, fontSize: 14, fontWeight: 'bold' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: COLORS.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '80%', padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary },
  buscaBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F4F8', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: COLORS.border },
  inputBusca: { flex: 1, fontSize: 14, color: COLORS.text },
  omOptionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
  omOptionItemActive: { backgroundColor: COLORS.primaryLight },
  omOptionTexto: { fontSize: 14, color: COLORS.text, flex: 1, marginRight: 8 },
  omOptionTextoActive: { color: COLORS.primary, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', color: COLORS.textMuted, marginVertical: 20, fontSize: 14 },
});