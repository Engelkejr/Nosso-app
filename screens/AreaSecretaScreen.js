import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../App';

const BACKEND_URL = 'http://177.192.23.102'; // SUBSTITUA PELO IP DO SEU COMPUTADOR E A PORTA DO SERVIDOR

const AreaSecretaScreen = () => {
  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState([]);
  const [statusMensagem, setStatusMensagem] = useState('');
  const { user } = useAuth();

  const carregarMensagens = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/areasecreta/listar`, {
        headers: { 'Authorization': user },
      });
      const dados = await response.json();
      if (response.ok) {
        setMensagens(dados);
      } else {
        setStatusMensagem(dados.error || 'Erro ao carregar mensagens.');
      }
    } catch (error) {
      setStatusMensagem('Erro ao carregar mensagens.');
      console.error(error);
    }
  };

  const enviarMensagem = async () => {
    if (!mensagem) {
      setStatusMensagem('A mensagem não pode ser vazia.');
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/areasecreta/enviar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user,
        },
        body: JSON.stringify({ mensagem }),
      });
      if (response.ok) {
        setStatusMensagem('Mensagem secreta enviada com sucesso!');
        setMensagem('');
        carregarMensagens();
      } else {
        setStatusMensagem('Erro ao enviar mensagem.');
      }
    } catch (error) {
      setStatusMensagem('Erro ao enviar mensagem.');
      console.error(error);
    }
  };

  useEffect(() => {
    carregarMensagens();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemDate}>
        {new Date(item.data_envio).toLocaleDateString('pt-BR')}
      </Text>
      <Text>{item.mensagem}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔒 Área Secreta</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Escreva uma mensagem secreta..."
          value={mensagem}
          onChangeText={setMensagem}
          multiline
        />
        <Button title="Enviar" onPress={enviarMensagem} color="#ff69b4" />
        <Text style={styles.status}>{statusMensagem}</Text>
      </View>
      <Text style={styles.listTitle}>💖 Mensagens Recebidas</Text>
      <FlatList
        data={mensagens}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text style={styles.noMessages}>Nenhuma mensagem secreta no momento.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff0f5' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ff1493', textAlign: 'center', marginBottom: 20 },
  form: { marginBottom: 20, padding: 15, backgroundColor: '#fff', borderRadius: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5, minHeight: 80 },
  status: { textAlign: 'center', marginTop: 10, color: 'red' },
  listTitle: { fontSize: 20, fontWeight: 'bold', color: '#ff1493', marginBottom: 10 },
  itemContainer: { padding: 15, backgroundColor: '#fff', marginBottom: 10, borderRadius: 8 },
  itemDate: { fontWeight: 'bold' },
  noMessages: { textAlign: 'center', color: '#999' },
});

export default AreaSecretaScreen;