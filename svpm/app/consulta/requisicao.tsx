import React, { useState } from 'react';
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

export default function RequisicaoScreen() {
  const [numeroRequisicao, setNumeroRequisicao] =
    useState('');

  // futuramente virá do banco/API
  const requisicao = {
    numero: '2026001548',
    status: 'Em análise',
    solicitacao: 'Auxílio Transporte',
    data: '10/05/2026',
  };

  const handleConsultar = () => {
    if (!numeroRequisicao) {
      Alert.alert(
        'Atenção',
        'Digite o número da requisição.',
      );

      return;
    }

    console.log(numeroRequisicao);
  };

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
            Consulta de Requisição
          </Text>
        </View>

        {/* CONTEÚDO */}
        <View style={styles.corpo}>
          <Text style={styles.secaoTitulo}>
            Consultar Requisição
          </Text>

          {/* FORMULÁRIO */}
          <View style={styles.card}>
            <Text style={styles.label}>
              Nº da Requisição
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Digite somente números"
              keyboardType="numeric"
              value={numeroRequisicao}
              onChangeText={setNumeroRequisicao}
            />

            <Text style={styles.helperText}>
              Somente números
            </Text>

            <TouchableOpacity
              style={styles.botao}
              onPress={handleConsultar}>
              <Text style={styles.botaoTexto}>
                Consultar
              </Text>
            </TouchableOpacity>
          </View>

          {/* RESULTADO */}
          <Text style={styles.secaoTitulo}>
            Resultado da Consulta
          </Text>

          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Número
              </Text>

              <Text style={styles.infoValor}>
                {requisicao.numero}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Solicitação
              </Text>

              <Text style={styles.infoValor}>
                {requisicao.solicitacao}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Data
              </Text>

              <Text style={styles.infoValor}>
                {requisicao.data}
              </Text>
            </View>

            <View style={styles.statusContainer}>
              <Text style={styles.statusTexto}>
                Status:
                {' '}
                {requisicao.status}
              </Text>
            </View>
          </View>
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

  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
    marginBottom: 20,
    padding: 20,
  },

  label: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },

  input: {
    backgroundColor: '#F8F9FA',
    borderColor: '#DADCE0',
    borderRadius: 8,
    borderWidth: 1,
    color: '#333',
    fontSize: 16,
    height: 50,
    paddingHorizontal: 14,
  },

  helperText: {
    color: '#777',
    fontSize: 12,
    marginTop: 8,
  },

  botao: {
    alignItems: 'center',
    backgroundColor: '#003366',
    borderRadius: 8,
    marginTop: 20,
    padding: 15,
  },

  botaoTexto: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  infoRow: {
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingBottom: 16,
  },

  infoLabel: {
    color: '#666',
    fontSize: 13,
    marginBottom: 6,
  },

  infoValor: {
    color: '#003366',
    fontSize: 17,
    fontWeight: 'bold',
  },

  statusContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    borderRadius: 10,
    marginTop: 10,
    padding: 16,
  },

  statusTexto: {
    color: '#EF6C00',
    fontSize: 16,
    fontWeight: 'bold',
  },
});