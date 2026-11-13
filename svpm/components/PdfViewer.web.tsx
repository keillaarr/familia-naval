import { View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

type PdfViewerProps = {
  uri: string;
  style?: StyleProp<ViewStyle>;
};

export default function PdfViewer({ uri, style }: PdfViewerProps) {
  return (
    <View style={style}>
      <iframe
        title="Visualizador de documento PDF"
        src={uri}
        style={{ width: '100%', height: '100%', border: 0 }}
      />
    </View>
  );
}
