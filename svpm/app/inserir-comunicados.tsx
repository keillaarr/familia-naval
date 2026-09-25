import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const formatCPF = (digits: string) => {
  const d = digits.slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
};

const onlyDigits = (s: string) => s.replace(/\D/g, '');

export default function InserirComunicados() {
  const [cpf, setCpf] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showPicker, setShowPicker] = useState(false);
  const [subject, setSubject] = useState('Selecione...');
  const [pdfFile, setPdfFile] = useState<{ name: string; uri: string } | null>(null);

  const onChange = (_event: any, selected?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selected) setDate(selected);
  };

  const formattedDate = date ? date.toLocaleDateString('pt-BR') : '';

  const pickPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setPdfFile({ name: file.name || 'arquivo.pdf', uri: file.uri });
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao selecionar arquivo PDF');
    }
  };

  const handleSubmit = () => {
    if (!cpf || cpf.length < 14 || !date || subject === 'Selecione...' || !pdfFile) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente');
      return;
    }
    Alert.alert('Sucesso', `Comunicado enviado!\nCPF: ${cpf}\nData: ${formattedDate}\nAssunto: ${subject}\nArquivo: ${pdfFile.name}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoTexto}>⚓</Text>
          </View>
          <Text style={styles.headerTitle}>Família Naval</Text>
          <Text style={styles.headerSubtitle}>Inserir Comunicados</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Inserir comunicados</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>CPF</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={cpf}
              onChangeText={(t) => setCpf(formatCPF(onlyDigits(t)))}
              placeholder="000.000.000-00"
              maxLength={14}
            />

            <Text style={styles.label}>Data do documento</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => {
                if (Platform.OS === 'android') {
                  DateTimePickerAndroid.open({
                    value: date ?? new Date(),
                    onChange,
                    mode: 'date',
                    is24Hour: true,
                  });
                } else {
                  setShowPicker(true);
                }
              }}>
              <Text style={styles.dateText}>{formattedDate || 'Selecione uma data'}</Text>
            </TouchableOpacity>

            {showPicker && Platform.OS === 'ios' && (
              <DateTimePicker value={date ?? new Date()} mode="date" display="calendar" onChange={onChange} />
            )}

            <Text style={styles.label}>Selecione o Assunto</Text>
            <TouchableOpacity
              style={styles.subjectInput}
              onPress={() => {
                Alert.alert('Selecione o Assunto', '', [
                  { text: 'Selecione...', onPress: () => setSubject('Selecione...') },
                  { text: 'Inspeção de Saúde', onPress: () => setSubject('Inspeção de Saúde') },
                  { text: 'Declaração de Dependentes', onPress: () => setSubject('Declaração de Dependentes') },
                  { text: 'Cancelar', style: 'cancel' },
                ]);
              }}>
              <Text style={styles.subjectText}>{subject}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Escolha um arquivo para enviar (somente PDF)</Text>
            <View style={styles.fileSelectorContainer}>
              <Text style={styles.fileText}>{pdfFile ? `Arquivo: ${pdfFile.name}` : 'Nenhum arquivo selecionado'}</Text>
              <TouchableOpacity style={styles.browseButton} onPress={pickPDF}>
                <Text style={styles.browseButtonText}>Procurar</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Enviar</Text>
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
  card: {
    backgroundColor: '#003366',
    borderRadius: 12,
    padding: 24,
    elevation: 2,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
  },
  label: { color: '#666', fontSize: 12, marginTop: 12 },
  input: { borderBottomWidth: 1, borderBottomColor: '#E6E6E6', paddingVertical: 8, fontSize: 16 },
  dateInput: {
    backgroundColor: '#F9F9F9',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  dateText: { color: '#111', fontSize: 16 },
  subjectInput: {
    backgroundColor: '#F9F9F9',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  subjectText: { color: '#111', fontSize: 16 },
  fileSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 12,
  },
  fileText: { flex: 1, color: '#666', fontSize: 14 },
  browseButton: {
    backgroundColor: '#003366',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  browseButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  submitButton: {
    backgroundColor: '#003366',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 24,
    alignItems: 'center',
  },
  submitButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
