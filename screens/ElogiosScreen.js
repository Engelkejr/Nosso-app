import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../App';

const BACKEND_URL = 'http://177.192.23.102';

const ElogiosScreen = () => {
  const [mensagem, setMensagem] = useState('');
  const [elogios, setElogios] = useState([]);
  const [statusMensagem, setStatusMensagem] = useState('');
  const { user } = useAuth();

  const carregarElogios = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/elogios`, {
        headers: { 'Authorization': user },
      });
      const dados = await response.json();
      setElogios(dados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os elogios.');
    }
  };

  const salvarElogio = async () => {
    if (!mensagem) {
      setStatusMensagem('A mensagem é obrigatória.');
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/elogios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user,
        },
        body: JSON.stringify({ mensagem }),
      });
      if (response.ok) {
        setStatusMensagem('Elogio salvo com sucesso!');
        setMensagem('');
        carregarElogios();
      } else {
        setStatusMensagem('Erro ao salvar elogio.');
      }
    } catch (error) {
      setStatusMensagem('Erro ao salvar elogio.');
      console.error(error);
    }
  };

  useEffect(() => {
    carregarElogios();
  }, []);

  const renderItem = ({ item }) => (
    <Text style={styles.item}>🙏 {item.titulo}</Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🙏 Elogios</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Escreva um elogio" value={mensagem} onChangeText={setMensagem} />
        <Button title="Salvar" onPress={salvarElogio} color="#ff69b4" />
        <Text style={styles.status}>{statusMensagem}</Text>
      </View>
      <FlatList
        data={elogios}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff0f5' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ff1493', textAlign: 'center', marginBottom: 20 },
  form: { marginBottom: 20, padding: 15, backgroundColor: '#fff', borderRadius: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  status: { textAlign: 'center', marginTop: 10, color: 'red' },
  item: { padding: 10, backgroundColor: '#fff', marginBottom: 10, borderRadius: 8 },
});

export default ElogiosScreen;