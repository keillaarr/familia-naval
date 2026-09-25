import bemVindoReservaPdf from '../assets/documents/Bem-Vindo á Reserva - atualizado em 16ABR2026.pdf';
import cartaServicosPdf from '../assets/documents/CARTA DE SERVIÇOS - 30JAN26.pdf';
import jornalVeteranosPdf from '../assets/documents/JVP - 60ª EDIÇÃO Aprovado.pdf';

export type AppDocument = {
  id: string;
  title: string;
  remoteUrl: string;
  localAsset: number;
  localFileName?: string;
};

export const appDocuments: AppDocument[] = [
  {
    id: 'carta-servicos',
    title: 'Carta de Serviços',
    remoteUrl:
      'https://assets.marinha.mil.br/svpm/sites/www.marinha.mil.br.svpm/files/2026-01/CARTA%20DE%20SERVI%C3%87OS%20-%2030JAN26.pdf',
    localAsset: cartaServicosPdf,
    localFileName: 'CARTA DE SERVIÇOS - 30JAN26.pdf',
  },
  {
    id: 'jornal-veteranos-pensionistas',
    title: 'Jornal dos Veteranos e Pensionistas',
    remoteUrl:
      'https://assets.marinha.mil.br/svpm/sites/www.marinha.mil.br.svpm/files/2026-01/CARTA%20DE%20SERVI%C3%87OS%20-%2030JAN26.pdf',
    localAsset: jornalVeteranosPdf,
    localFileName: 'JVP - 60ª EDIÇÃO Aprovado.pdf',
  },
  {
    id: 'bem-vindo-reserva',
    title: 'Bem-vindo à Reserva',
    remoteUrl:
      'https://assets.marinha.mil.br/svpm/sites/www.marinha.mil.br.svpm/files/2026-04/Bem-Vindo%20%C3%A1%20Reserva%20-%20atualizado%20em%2016ABR2026.pdf',
    localAsset: bemVindoReservaPdf,
    localFileName: 'Bem-Vindo á Reserva - atualizado em 16ABR2026.pdf',
  },
];
