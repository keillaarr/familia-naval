import Pdf from 'react-native-pdf';
import type { PdfProps } from 'react-native-pdf';

type PdfViewerProps = {
  uri: string;
  style?: PdfProps['style'];
};

export default function PdfViewer({ uri, style }: PdfViewerProps) {
  return <Pdf source={{ uri, cache: true }} trustAllCerts={false} style={style} />;
}
