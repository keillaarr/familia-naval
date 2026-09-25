import { Asset } from 'expo-asset';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { appDocuments } from '../constants/documents';

export default function WebViewScreen() {
  const { documentId, title, url } = useLocalSearchParams<{ documentId?: string; title?: string; url?: string }>();
  const [localUri, setLocalUri] = useState<string | null>(null);

  const document = useMemo(
    () => appDocuments.find((item) => item.id === documentId),
    [documentId]
  );

  const pageTitle = document?.title ?? title ?? 'Serviço';
  const remoteUrl = document?.remoteUrl ?? url ?? 'https://www.marinha.mil.br/svpm';
  const pageUrl = localUri ?? remoteUrl;

  useEffect(() => {
    let isActive = true;

    const loadLocalDocument = async () => {
      if (!document?.localAsset) {
        setLocalUri(null);
        return;
      }

      const asset = Asset.fromModule(document.localAsset);

      if (Platform.OS === 'web') {
        setLocalUri(asset.uri);
        return;
      }

      await asset.downloadAsync();

      if (isActive) {
        setLocalUri(asset.localUri ?? asset.uri);
      }
    };

    loadLocalDocument();

    return () => {
      isActive = false;
    };
  }, [document]);

  if (document && !localUri) {
    return (
      <View style={styles.loadingScreen}>
        <Stack.Screen options={{ title: pageTitle }} />
        <ActivityIndicator color="#1351B4" size="large" />
      </View>
    );
  }

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: pageTitle }} />
        {document
          ? React.createElement('iframe' as any, {
              src: pageUrl,
              style: styles.webFrame,
              title: pageTitle,
            })
          : (
            <View style={styles.webFallback}>
              <Text style={styles.webFallbackTitle}>{pageTitle}</Text>
              <Text style={styles.webFallbackText}>
                Este conteúdo não permite exibição incorporada no navegador. No aplicativo para celular, ele abre dentro do app.
              </Text>
              <TouchableOpacity style={styles.openButton} onPress={() => Linking.openURL(pageUrl)}>
                <Text style={styles.openButtonText}>Abrir documento</Text>
              </TouchableOpacity>
            </View>
          )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: pageTitle }} />
      <WebView
        source={{ uri: pageUrl }}
        allowFileAccess
        allowFileAccessFromFileURLs
        allowUniversalAccessFromFileURLs
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator color="#1351B4" size="large" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingScreen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  webFallback: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  webFallbackTitle: {
    color: '#003366',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },
  webFallbackText: {
    color: '#555555',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 22,
    maxWidth: 520,
    textAlign: 'center',
  },
  openButton: {
    alignItems: 'center',
    backgroundColor: '#1351B4',
    borderRadius: 8,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 18,
  },
  openButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  webFrame: {
    borderWidth: 0,
    height: '100%',
    width: '100%',
  },
});
