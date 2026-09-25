import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const onlyDigits = (s: string) => s.replace(/\D/g, '');
const formatCEP = (digits: string) => {
  const d = digits.slice(0, 8);
  if (d.length <= 5) return d;
  return d.slice(0, 5) + '-' + d.slice(5);
};
const formatPhone = (digits: string) => {
  const d = digits.slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

export default function EditDadosCadastrais() {
  const [nome, setNome] = useState('usuário');
  const [logradouro, setLogradouro] = useState('Rua longe');
  const [numero, setNumero] = useState('12');
  const [complemento, setComplemento] = useState('um pouco perto');
  const [bairro, setBairro] = useState('centro');
  const [cidade, setCidade] = useState('Cidade Exemplo');
  const [cep, setCep] = useState('00000-000');
  const [telefone, setTelefone] = useState('(00) 0000-0000');
  const [celular, setCelular] = useState('(00) 00000-0000');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoTexto}>⚓</Text>
          </View>
          <Text style={styles.headerTitle}>Família Naval</Text>
          <Text style={styles.headerSubtitle}>Editar Dados</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.form}>
            <Text style={styles.label}>Nome</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} />

            <Text style={styles.label}>Logradouro</Text>
            <TextInput style={styles.input} value={logradouro} onChangeText={setLogradouro} />

            <Text style={styles.label}>Número</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={numero}
              onChangeText={(t) => setNumero(onlyDigits(t))}
            />

            <Text style={styles.label}>Complemento</Text>
            <TextInput style={styles.input} value={complemento} onChangeText={setComplemento} />

            <Text style={styles.label}>Bairro</Text>
            <TextInput style={styles.input} value={bairro} onChangeText={setBairro} />

            <Text style={styles.label}>Cidade</Text>
            <TextInput style={styles.input} value={cidade} onChangeText={setCidade} />

            <Text style={styles.label}>CEP</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={cep}
              onChangeText={(t) => setCep(formatCEP(onlyDigits(t)))}
              maxLength={9}
            />

            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={telefone}
              onChangeText={(t) => setTelefone(formatPhone(onlyDigits(t)))}
              maxLength={15}
            />

            <Text style={styles.label}>Celular</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={celular}
              onChangeText={(t) => setCelular(formatPhone(onlyDigits(t)))}
              maxLength={15}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Alert.alert('Salvo', 'Dados salvos com sucesso.');
                router.back();
              }}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
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
  form: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E0E0E0', padding: 16 },
  label: { color: '#666', fontSize: 12, marginTop: 12 },
  input: { borderBottomWidth: 1, borderBottomColor: '#E6E6E6', paddingVertical: 8, fontSize: 16 },
  button: { backgroundColor: '#003366', borderRadius: 8, paddingVertical: 14, marginTop: 24, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
