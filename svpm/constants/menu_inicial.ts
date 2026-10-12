import bemVindoReservaPdf from '../assets/documents/bemvindoreserva.pdf';
import cartaServicoPdf from '../assets/documents/cartaservico.pdf';
import jvpPdf from '../assets/documents/JVP60EDICAO.pdf';
import pensaoCivilPdf from '../assets/documents/pensaocivil.pdf';
import pensaoMilitarPdf from '../assets/documents/pensaomilitar.pdf';

export interface DrawerItemConfig {
  rotulo: string;
  icone: string;
  rota?: string;
  documentoAsset?: any;
  urlExterna?: string;
  chaveAcao?: string;
}

export interface DrawerSecao {
  titulo: string;
  itens: DrawerItemConfig[];
}

export const SECOES_MENU_LATERAL: DrawerSecao[] = [
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