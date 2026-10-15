import bemVindoReservaPdf from '../assets/documents/bemvindoreserva.pdf';
import cartaServicoPdf from '../assets/documents/cartaservico.pdf';
import jvpPdf from '../assets/documents/JVP60EDICAO.pdf';
import pensaoCivilPdf from '../assets/documents/pensaocivil.pdf';
import pensaoMilitarPdf from '../assets/documents/pensaomilitar.pdf';

export const PRINCIPAIS_SERVICOS_LIST = [
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
    url: 'https://www.gov.br/pt-br'
  },
  {
    title: 'Declaração Anual Para Percepção Do Auxílio-Invalidez',
    icon: 'file-document-edit-outline',
    iconLib: 'MaterialCommunityIcons',
    color: '#003366',
    route: 'auxilio-invalidez',
  },
];

export const SOLICITACOES_LIST = [
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

export const LINKS_UTEIS_LIST = [
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

export const SECOES_MENU_LATERAL = [
  {
    titulo: 'Informações Pessoais',
    itens: [
      { rotulo: 'Meus Dados', icone: 'person-outline', rota: 'dados' },
      { rotulo: 'Meus Dependentes', icone: 'people-outline', rota: 'consulta-dependentes' },
      { rotulo: 'Notificações', icone: 'notifications-outline', chaveAcao: 'notificacoes' },
    ],
  },
  {
    titulo: 'Informativos',
    itens: [
      { rotulo: 'Carta de Serviço', icone: 'document-text-outline', documentoAsset: cartaServicoPdf },
      { rotulo: 'Bem vindo à Reserva', icone: 'ribbon-outline', documentoAsset: bemVindoReservaPdf },
      { rotulo: 'JVP', icone: 'newspaper-outline', documentoAsset: jvpPdf },
      { rotulo: 'Guia Rápido de Pensão Civil', icone: 'book-outline', documentoAsset: pensaoCivilPdf },
      { rotulo: 'Guia Rápido de Pensão Militar', icone: 'book-outline', documentoAsset: pensaoMilitarPdf },
    ],
  },
  {
    titulo: 'Mídias Sociais',
    itens: [
      { rotulo: 'Telegram', icone: 'paper-plane-outline', urlExterna: 'https://t.me/marinhadobrasil' },
      { rotulo: 'Canal do WhatsApp', icone: 'logo-whatsapp', urlExterna: 'https://whatsapp.com' },
    ],
  },
];