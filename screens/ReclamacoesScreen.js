import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../App';

const BACKEND_URL = 'http://177.192.23.102';

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
        <Button title="Enviar" onPress={enviarReclamacao} color="#ff69b4" />
        <Text style={styles.status}>{mensagemStatus}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff0f5' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ff1493', textAlign: 'center', marginBottom: 20 },
  form: { marginBottom: 20, padding: 15, backgroundColor: '#fff', borderRadius: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5, minHeight: 100 },
  status: { textAlign: 'center', marginTop: 10, color: 'red' },
});

export default ReclamacoesScreen;