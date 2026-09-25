import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AuxilioInvalidezScreen() {
  const [exerceAtividade, setExerceAtividade] = useState(false);

  const [form, setForm] = useState({
    cep: '',
    endereco: '',
    bairro: '',
    cidade: '',
    uf: '',
    telefone: '',
    email: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEnviar = () => {
    console.log(form);

    Alert.alert(
      'Declaração enviada',
      'Sua declaração foi enviada com sucesso.',
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>⚓</Text>
          </View>

          <Text style={styles.appTitle}>
            Família Naval
          </Text>

          <Text style={styles.appSubtitle}>
            Declaração Auxílio-Invalidez
          </Text>
        </View>

        {/* FORM */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>
            DECLARAÇÃO ANUAL PARA PERCEPÇÃO
            DO AUXÍLIO-INVALIDEZ
          </Text>

          <Text style={styles.description}>
            Declaro, para fins do artigo 78 do Decreto
            nº 4.307 de 18 de julho de 2002:
          </Text>

          {/* SWITCH */}
          <View style={styles.section}>
            <Text style={styles.label}>
              Exerce atividade remunerada pública ou privada?
            </Text>

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>
                {exerceAtividade
                  ? 'EXERÇO'
                  : 'NÃO EXERÇO'}
              </Text>

              <Switch
                value={exerceAtividade}
                onValueChange={setExerceAtividade}
              />
            </View>
          </View>

          {/* AVISOS */}
          <Text style={styles.warningText}>
            Estou ciente de que, anualmente,
            deverei encaminhar nova declaração ao SVPM.
          </Text>

          <Text style={styles.warningText}>
            O não atendimento desta exigência poderá
            implicar na retirada da parcela da remuneração.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>
            Dados de contato e endereço
          </Text>

          <InputField
            label="CEP"
            placeholder="00000-000"
            value={form.cep}
            onChangeText={(text) =>
              handleChange('cep', text)
            }
          />

          <InputField
            label="Endereço"
            placeholder="Rua, número, apartamento..."
            value={form.endereco}
            onChangeText={(text) =>
              handleChange('endereco', text)
            }
          />

          <InputField
            label="Bairro"
            placeholder="Digite o bairro"
            value={form.bairro}
            onChangeText={(text) =>
              handleChange('bairro', text)
            }
          />

          <InputField
            label="Cidade"
            placeholder="Digite a cidade"
            value={form.cidade}
            onChangeText={(text) =>
              handleChange('cidade', text)
            }
          />

          <InputField
            label="UF"
            placeholder="RJ"
            value={form.uf}
            onChangeText={(text) =>
              handleChange('uf', text)
            }
          />

          <InputField
            label="Telefone"
            placeholder="(00) 00000-0000"
            value={form.telefone}
            onChangeText={(text) =>
              handleChange('telefone', text)
            }
          />

          <InputField
            label="E-mail"
            placeholder="email@exemplo.com"
            value={form.email}
            onChangeText={(text) =>
              handleChange('email', text)
            }
          />

          {/* BOTÕES */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleEnviar}>
            <Text style={styles.submitButtonText}>
              Enviar Declaração
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}>
            <Text style={styles.backButtonText}>
              Voltar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type InputFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};

function InputField({
  label,
  placeholder,
  value,
  onChangeText,
}: InputFieldProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D5AA3',
  },

  content: {
    paddingBottom: 30,
  },

  header: {
    alignItems: 'center',
    backgroundColor: '#003B75',
    paddingBottom: 30,
    paddingTop: 30,
  },

  logoContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    marginBottom: 12,
    width: 60,
  },

  logo: {
    fontSize: 28,
  },

  appTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
  },

  appSubtitle: {
    color: '#D6E4F0',
    fontSize: 14,
    marginTop: 4,
  },

  formCard: {
    backgroundColor: '#ECEAF7',
    borderRadius: 4,
    margin: 18,
    padding: 18,
  },

  formTitle: {
    color: '#002F6C',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 28,
    marginBottom: 20,
    textAlign: 'center',
  },

  description: {
    color: '#222',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    color: '#002F6C',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 18,
  },

  switchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  switchLabel: {
    color: '#111',
    fontSize: 14,
    fontWeight: 'bold',
  },

  warningText: {
    color: '#333',
    fontSize: 13,
    lineHeight: 21,
    marginBottom: 8,
  },

  divider: {
    backgroundColor: '#C8CEDA',
    height: 1,
    marginVertical: 20,
  },

  inputContainer: {
    marginBottom: 16,
  },

  label: {
    color: '#222',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#C9CED8',
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 14,
    height: 48,
    paddingHorizontal: 12,
  },

  submitButton: {
    alignItems: 'center',
    backgroundColor: '#3E9B40',
    borderRadius: 4,
    marginTop: 10,
    paddingVertical: 15,
  },

  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  backButton: {
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    marginTop: 12,
    paddingVertical: 14,
  },

  backButtonText: {
    color: '#222',
    fontSize: 14,
    fontWeight: 'bold',
  },
});