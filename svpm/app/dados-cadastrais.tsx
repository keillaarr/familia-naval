import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DadosCadastrais() {
  const data = {
    nome: 'usuário',
    logradouro: 'Rua longe',
    numero: '12',
    complemento: 'um pouco perto',
    bairro: 'centro',
    cidade: 'Cidade Exemplo',
    cep: '00000-000',
    telefone: '(00) 0000-0000',
    celular: '(00) 00000-0000',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoTexto}>⚓</Text>
          </View>
          <Text style={styles.headerTitle}>Família Naval</Text>
          <Text style={styles.headerSubtitle}>Dados Cadastrais</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Nome</Text>
              <Text style={styles.infoValue}>{data.nome}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Logradouro</Text>
              <Text style={styles.infoValue}>{data.logradouro}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Número</Text>
              <Text style={styles.infoValue}>{data.numero}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Complemento</Text>
              <Text style={styles.infoValue}>{data.complemento}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Bairro</Text>
              <Text style={styles.infoValue}>{data.bairro}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Cidade</Text>
              <Text style={styles.infoValue}>{data.cidade}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>CEP</Text>
              <Text style={styles.infoValue}>{data.cep}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Telefone</Text>
              <Text style={styles.infoValue}>{data.telefone}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Celular</Text>
              <Text style={styles.infoValue}>{data.celular}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => router.push('/dados-cadastrais-edit' as any)}>
            <Text style={styles.buttonText}>Alterar Dados</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFDFD' },
  header: { alignItems: 'center', backgroundColor: '#003366', padding: 40 },
  logoPlaceholder: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    marginBottom: 10,
    width: 60,
  },
  logoTexto: { fontSize: 30 },
  headerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  headerSubtitle: { color: '#D1D1D1', fontSize: 14, fontStyle: 'italic', marginTop: 4 },
  content: { padding: 20 },
  infoContainer: { gap: 12 },
  infoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 14,
    elevation: 2,
  },
  infoLabel: { color: '#666', fontSize: 12, marginBottom: 6 },
  infoValue: { color: '#111', fontSize: 16 },
  button: { backgroundColor: '#003366', borderRadius: 8, paddingVertical: 14, marginTop: 20, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
