import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../App';

const BACKEND_URL = 'https://nossahistoria.up.railway.app';
const ReclamacoesScreen = () => {
  const [mensagem, setMensagem] = useState('');
  const [mensagemStatus, setMensagemStatus] = useState('');
  const { user } = useAuth();

  const enviarReclamacao = async () => {
    if (!mensagem) {
      setMensagemStatus('Mensagem não pode ser vazia.');
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/reclamacoes/enviar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user,
        },
        body: JSON.stringify({ mensagem }),
      });
      if (response.ok) {
        setMensagemStatus('Reclamação enviada com sucesso!');
        setMensagem('');
      } else {
        setMensagemStatus('Erro ao enviar reclamação.');
      }
    } catch (error) {
      setMensagemStatus('Erro ao enviar reclamação.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Enviar Reclamação</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua reclamação"
          value={mensagem}
          onChangeText={setMensagem}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={enviarReclamacao} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
        <Text style={styles.status}>{mensagemStatus}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff0f5' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ff1493', textAlign: 'center', marginBottom: 20 },
  form: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  item: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  button: {
    backgroundColor: '#ff69b4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ReclamacoesScreen;