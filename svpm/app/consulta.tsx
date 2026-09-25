import { router } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ConsultasScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoTexto}>⚓</Text>
          </View>

          <Text style={styles.titulo}>
            Família Naval
          </Text>

          <Text style={styles.subtitulo}>
            Área de Consultas
          </Text>
        </View>

        {/* CONTEÚDO */}
        <View style={styles.corpo}>
          <Text style={styles.secaoTitulo}>
            Consultas disponíveis
          </Text>

          {/* PROVA DE VIDA */}
          <TouchableOpacity
            style={styles.botao}
            onPress={() =>
              router.push('/consulta/prova-vida')
            }>
            <View style={styles.botaoIcone}>
              <Text style={styles.icone}>🪪</Text>
            </View>

            <View style={styles.botaoConteudo}>
              <Text style={styles.botaoTitulo}>
                Prova de Vida
              </Text>

              <Text style={styles.botaoDescricao}>
                Consulte informações do último
                recadastramento.
              </Text>
            </View>
          </TouchableOpacity>

          {/* AUXÍLIO INVALIDEZ */}
          <TouchableOpacity
            style={styles.botao}
            onPress={() =>
              router.push(
                '/consulta/auxilio-invalidez',
              )
            }>
            <View style={styles.botaoIcone}>
              <Text style={styles.icone}>📄</Text>
            </View>

            <View style={styles.botaoConteudo}>
              <Text style={styles.botaoTitulo}>
                Auxílio Invalidez
              </Text>

              <Text style={styles.botaoDescricao}>
                Consulte situação e próximas
                declarações.
              </Text>
            </View>
          </TouchableOpacity>

          {/* REQUISIÇÃO */}
          <TouchableOpacity
            style={styles.botao}
            onPress={() =>
              router.push('/consulta/requisicao')
            }>
            <View style={styles.botaoIcone}>
              <Text style={styles.icone}>🔎</Text>
            </View>

            <View style={styles.botaoConteudo}>
              <Text style={styles.botaoTitulo}>
                Requisição
              </Text>

              <Text style={styles.botaoDescricao}>
                Consulte requisições através do
                número informado.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  botao: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
    flexDirection: 'row',
    marginBottom: 15,
    padding: 18,
  },

  botaoIcone: {
    alignItems: 'center',
    backgroundColor: '#EAF1FB',
    borderRadius: 12,
    height: 55,
    justifyContent: 'center',
    marginRight: 15,
    width: 55,
  },

  icone: {
    fontSize: 24,
  },

  botaoConteudo: {
    flex: 1,
  },

  botaoTitulo: {
    color: '#003366',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  botaoDescricao: {
    color: '#666',
    fontSize: 13,
    lineHeight: 20,
  },
});