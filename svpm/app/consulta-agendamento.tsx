import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ConsultaAgendamento() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showPicker, setShowPicker] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);

  const onChange = (_event: any, selected?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selected) setDate(selected);
  };

  const formattedDate = date ? date.toLocaleDateString('pt-BR') : '';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoTexto}>⚓</Text>
          </View>
          <Text style={styles.headerTitle}>Família Naval</Text>
          <Text style={styles.headerSubtitle}>Consulta Agendamento</Text>
        </View>
    
        <View style={styles.content}>
          <Text style={styles.label}>Data do agendamento</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => {
              if (Platform.OS === 'android') {
                DateTimePickerAndroid.open({ value: date ?? new Date(), onChange, mode: 'date', is24Hour: true });
              } else {
                setShowPicker(true);
              }
            }}>
            <Text style={styles.dateText}>{formattedDate || 'Selecione uma data'}</Text>
          </TouchableOpacity>

          {showPicker && Platform.OS === 'ios' && (
            <DateTimePicker value={date ?? new Date()} mode="date" display="calendar" onChange={onChange} />
          )}

          <TouchableOpacity style={styles.button} onPress={() => setResultsVisible(true)}>
            <Text style={styles.buttonText}>Consultar</Text>
          </TouchableOpacity>

          {resultsVisible && (
            <View style={styles.resultsBox}>
              <View style={styles.rowHeader}>
                <Text style={[styles.cell, styles.cellHeader]}>NOME</Text>
                <Text style={[styles.cell, styles.cellHeader]}>CPF</Text>
                <Text style={[styles.cell, styles.cellHeader]}>DATA</Text>
                <Text style={[styles.cell, styles.cellHeader]}>HORA</Text>
                <Text style={[styles.cell, styles.cellHeader]}>TIPO DE ATENDIMENTO</Text>
              </View>

              <View style={styles.rowContent}>
                <Text style={[styles.emptyText]}>Não existem agendamentos para esse dia</Text>
              </View>
            </View>
          )}
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
  label: { color: '#666', fontSize: 14, marginBottom: 8 },
  dateInput: { backgroundColor: '#FFFFFF', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#E0E0E0' },
  dateText: { color: '#111', fontSize: 16 },
  button: { backgroundColor: '#003366', borderRadius: 8, paddingVertical: 14, marginTop: 16, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  resultsBox: { marginTop: 18, backgroundColor: '#FFFFFF', borderRadius: 8, borderWidth: 1, borderColor: '#E0E0E0', overflow: 'hidden' },
  rowHeader: { flexDirection: 'row', backgroundColor: '#f6f6f6' },
  rowContent: { padding: 20, alignItems: 'center', justifyContent: 'center' },
  cell: { flex: 1, padding: 12, textAlign: 'center', fontSize: 12 },
  cellHeader: { fontWeight: '700', color: '#333' },
  emptyText: { color: '#666', fontSize: 14 },
});
