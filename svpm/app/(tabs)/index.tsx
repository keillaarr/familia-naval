import { router } from 'expo-router';
import React from 'react';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const declaracaoDependentesUrl =
  'https://portalcidadao.dataprev.gov.br/#/mb/r/novo-pedido/informacao/2709/declaracao-de-dependentes-para-fins-de-imposto-de-renda-retido-na-fonte';

const openExternalLink = (url: string) => {
  Linking.openURL(url);
};

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoTexto}>⚓</Text>
          </View>

          <Text style={styles.titulo}>Família Naval</Text>

          <Text style={styles.subtitulo}>
            O Sr. está no SVPM!
          </Text>
        </View>

        <View style={styles.corpo}>
          <Text style={styles.secaoTitulo}>
            Serviços mais usados do SVPM
          </Text>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              openExternalLink(declaracaoDependentesUrl)
            }>
            <Text style={styles.cardTexto}>
              • Declaração de Dependentes para IRRF
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push('/dacp')}>
            <Text style={styles.cardTexto}>
               • Declaração Auxílio-Invalidez
            </Text>
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
    backgroundColor: '#003B75',
    paddingBottom: 40,
    paddingTop: 50,
  },

  logoPlaceholder: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    height: 80,
    justifyContent: 'center',
    marginBottom: 15,
    width: 80,
  },

  logoTexto: {
    fontSize: 40,
  },

  titulo: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  subtitulo: {
    color: '#D6E4F0',
    fontSize: 16,
    fontStyle: 'italic',
  },

  corpo: {
    padding: 20,
  },

  secaoTitulo: {
    color: '#003366',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
    marginBottom: 14,
    padding: 18,
  },

  cardTexto: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '500',
  },
});