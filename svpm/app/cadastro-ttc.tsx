import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const API_BASE_URL = 'http://10.5.18.74:8080/api/v1/ttc'; // Ajuste o IP conforme seu ambiente (10.0.2.2 para emulador Android)
const CPF_USUARIO = '00000028797';

const distritos = [
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
      'Administração de Setores Específicos (Gatronomia)',
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
      'Modeo em Processos', 
      'Licitações e Contratos', 
      'Economia'
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
    itens: [
      'Serviço Social',
      'Teologia',
    ],
  },
  {
    titulo: 'Assuntos Marítimos',
    itens: [
      'Assuntos Marítimos e Portuários ',
      'Direito Marítimo',
      'Segurança do Tráfego Aquaviário',
      'Tecnoologia em Sistemas de Navegação'
    ],
  },
  {
    titulo: 'Engenharia Naval',
    itens: [
      'Desenho Industrial',
      'Eletrotécnica',
      'Engenharia de Mmateriais e Metalúrgica',
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
      'Engenharia de Computração',
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
      'Banco de dados'
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
    itens: [
      'Estado Maior',
      'Inteligência',
      'Política e estratégia'
    ],
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
      'Mecãnica de Carros de Combate', 
      'Segurança de Áreas e Instalações', 
      'Segurança Pessoal', 
      'Máquinas e Motores do CFN'
    ],
  },
  {
    titulo: 'Hidrografia, Navegação e Comunicações Navais',
    itens: [
      'Artes Gráficas',
      'Cartografia',
      'Geofisica e Geologia',
      'Hidrografia',
      'Navegação', 
      'Oceanografia Física', 
      'Sinalização Náutica', 
      'Sensoriamento Remoto', 
      'Comunicações Navais', 
      'Comunicações Interiores'
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
      'Serralheria'
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
    itens: [
      'Gestão Ambiental',
      'Comunicação Social',
      'Atendimento ao Público',
    ],
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
  const [textoLivre, setTextoLivre] = useState('');
  const [distritosSelecionados, setDistritosSelecionados] = useState<string[]>([]);
  const [assuntosSelecionados, setAssuntosSelecionados] = useState<string[]>([]);

  useEffect(() => {
    carregarDadosUsuario();
  }, []);

  const carregarDadosUsuario = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${CPF_USUARIO}`);
      if (response.ok) {
        const data = await response.json();
        setDistritosSelecionados(data.distritosDesejados || []);
        setAssuntosSelecionados(data.areasInteresse || []);
        setTextoLivre(data.informacoesComplementares || '');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

  const toggleDistrito = (item: string) => {
    if (distritosSelecionados.includes(item)) {
      setDistritosSelecionados(
        distritosSelecionados.filter((distrito) => distrito !== item),
      );
      return;
    }

    setDistritosSelecionados([...distritosSelecionados, item]);
  };

  const toggleAssunto = (item: string) => {
    if (assuntosSelecionados.includes(item)) {
      setAssuntosSelecionados(
        assuntosSelecionados.filter((assunto) => assunto !== item),
      );
      return;
    }

    setAssuntosSelecionados([...assuntosSelecionados, item]);
  };

  const handleSalvar = async () => {
    const payload = {
      cpf: CPF_USUARIO,
      distritosDesejados: distritosSelecionados,
      areasInteresse: assuntosSelecionados,
      informacoesComplementares: textoLivre,
    };

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Cadastro TTC atualizado e publicado!');
      } else {
        Alert.alert('Erro', 'Ocorreu uma falha ao salvar as informações.');
      }
    } catch (error) {
      console.error('Erro na requisição ao salvar:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  const handleRemover = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${CPF_USUARIO}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDistritosSelecionados([]);
        setAssuntosSelecionados([]);
        setTextoLivre('');
        Alert.alert('Sucesso', 'Publicação removida com sucesso!');
      } else {
        Alert.alert('Erro', 'Não foi possível remover a publicação.');
      }
    } catch (error) {
      console.error('Erro ao remover publicação:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoTexto}>⚓</Text>
          </View>

          <Text style={styles.titulo}>Família Naval</Text>
          <Text style={styles.subtitulo}>Cadastro TTC</Text>
        </View>

        {/* CONTEÚDO */}
        <View style={styles.corpo}>
          {/* TÍTULO */}
          <Text style={styles.secaoTitulo}>Cadastro TTC</Text>

          {/* STATUS */}
          <View style={styles.card}>
            <Text style={styles.texto}>
              Preencha as informações abaixo para atualização do cadastro TTC.
            </Text>
          </View>

          {/* AUTORIZAÇÃO */}
          <Text style={styles.secaoTitulo}>Autorização de divulgação</Text>

          <View style={styles.card}>
            <Text style={styles.texto}>
              Ao publicar o cadastro, os dados poderão ser utilizados
              internamente para seleção de pessoal TTC.
            </Text>
          </View>

          {/* DISTRITOS */}
          <Text style={styles.secaoTitulo}>Distritos Navais desejados</Text>

          <View style={styles.card}>
            {distritos.map((item) => {
              const selecionado = distritosSelecionados.includes(item);

              return (
                <TouchableOpacity
                  key={item}
                  style={styles.checkboxItem}
                  onPress={() => toggleDistrito(item)}>
                  <Text style={styles.checkbox}>
                    {selecionado ? '☑' : '☐'}
                  </Text>
                  <Text style={styles.checkboxTexto}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* TEXTO LIVRE */}
          <Text style={styles.secaoTitulo}>Informações complementares</Text>

          <View style={styles.card}>
            <TextInput
              multiline
              numberOfLines={6}
              placeholder="Digite informações complementares..."
              placeholderTextColor="#777"
              style={styles.textArea}
              value={textoLivre}
              onChangeText={setTextoLivre}
            />
          </View>

          {/* CATEGORIAS */}
          <Text style={styles.secaoTitulo}>Áreas de interesse</Text>

          {categorias.map((categoria) => (
            <View key={categoria.titulo} style={styles.categoriaContainer}>
              <View style={styles.categoriaHeader}>
                <Text style={styles.categoriaTitulo}>{categoria.titulo}</Text>
              </View>

              <View style={styles.cardCategoria}>
                {categoria.itens.map((item) => {
                  const selecionado = assuntosSelecionados.includes(item);

                  return (
                    <TouchableOpacity
                      key={item}
                      style={styles.checkboxItem}
                      onPress={() => toggleAssunto(item)}>
                      <Text style={styles.checkbox}>
                        {selecionado ? '☑' : '☐'}
                      </Text>
                      <Text style={styles.checkboxTexto}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}

          {/* BOTÕES */}
          <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
            <Text style={styles.botaoSalvarTexto}>
              Atualizar Perfil e Publicar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoRemover} onPress={handleRemover}>
            <Text style={styles.botaoRemoverTexto}>Remover Publicação</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#003366',
    padding: 40,
  },
  logoPlaceholder: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    marginBottom: 10,
    width: 60,
  },
  logoTexto: {
    fontSize: 30,
  },
  titulo: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: '#D1D1D1',
    fontSize: 14,
    fontStyle: 'italic',
  },
  corpo: {
    padding: 20,
  },
  secaoTitulo: {
    color: '#003366',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    borderRadius: 8,
    borderWidth: 1,
    elevation: 2,
    marginBottom: 10,
    padding: 15,
  },
  texto: {
    color: '#444',
    fontSize: 14,
    lineHeight: 22,
  },
  checkboxItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  checkbox: {
    color: '#003366',
    fontSize: 16,
    marginRight: 10,
  },
  checkboxTexto: {
    color: '#333',
    fontSize: 14,
  },
  textArea: {
    backgroundColor: '#F8F9FA',
    borderColor: '#DADCE0',
    borderRadius: 8,
    borderWidth: 1,
    color: '#333',
    fontSize: 14,
    minHeight: 120,
    padding: 12,
    textAlignVertical: 'top',
  },
  categoriaContainer: {
    marginTop: 15,
  },
  categoriaHeader: {
    backgroundColor: '#003366',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 12,
  },
  categoriaTitulo: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cardCategoria: {
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    padding: 15,
  },
  botaoSalvar: {
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    marginTop: 30,
    padding: 16,
  },
  botaoSalvarTexto: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  botaoRemover: {
    alignItems: 'center',
    backgroundColor: '#C62828',
    borderRadius: 8,
    marginBottom: 30,
    marginTop: 12,
    padding: 16,
  },
  botaoRemoverTexto: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});