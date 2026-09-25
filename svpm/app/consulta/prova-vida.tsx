import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ProvaVidaScreen() {
  // futuramente virá da API
  const dados = {
    ultimoRecadastramento: '05 de maio de 2026',
    proximoRecadastramento: 'maio de 2027',
    situacao: 'Regular',
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
            Consulta de Prova de Vida
          </Text>
        </View>

        {/* CONTEÚDO */}
        <View style={styles.corpo}>
          <Text style={styles.secaoTitulo}>
            Informações do Recadastramento
          </Text>

          <View style={styles.card}>
            {/* ÚLTIMO */}
            <View style={styles.infoRow}>
              <Text style={styles.label}>
                Último Recadastramento
              </Text>

              <Text style={styles.valor}>
                {dados.ultimoRecadastramento}
              </Text>
            </View>

            {/* PRÓXIMO */}
            <View style={styles.infoRow}>
              <Text style={styles.label}>
                Próximo Recadastramento
              </Text>

              <Text style={styles.valor}>
                {dados.proximoRecadastramento}
              </Text>
            </View>

            {/* SITUAÇÃO */}
            <View style={styles.statusContainer}>
              <Text style={styles.statusTexto}>
                Situação:
                {' '}
                {dados.situacao}
              </Text>
            </View>
          </View>

          {/* BOTÃO */}
          <TouchableOpacity style={styles.botao}>
            <Text style={styles.botaoTexto}>
              Atualizar Dados
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
    padding: 20,
  },

  infoRow: {
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    marginBottom: 18,
    paddingBottom: 18,
  },

  label: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },

  valor: {
    color: '#003366',
    fontSize: 18,
    fontWeight: 'bold',
  },

  statusContainer: {
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    marginTop: 10,
    padding: 16,
  },

  statusTexto: {
    color: '#2E7D32',
    fontSize: 16,
    fontWeight: 'bold',
  },

  botao: {
    alignItems: 'center',
    backgroundColor: '#003366',
    borderRadius: 10,
    marginTop: 25,
    padding: 16,
  },

  botaoTexto: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});