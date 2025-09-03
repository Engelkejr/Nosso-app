import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../App';

const BACKEND_URL = 'https://nossahistoria.up.railway.app';
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
  <Text style={styles.item}>🙏 {item.mensagem}</Text>
);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🙏 Elogios</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Escreva um elogio" value={mensagem} onChangeText={setMensagem} />
        <TouchableOpacity style={styles.button} onPress={salvarElogio} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
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
  itemContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  itemTitle: { fontWeight: 'bold', fontSize: 18, color: '#ff1493' },
  itemDescription: { fontSize: 16 },
  // Estilos específicos para a tela
  progressBar: { height: 20, marginBottom: 10, borderRadius: 50 },
  progressText: { textAlign: 'center', fontWeight: 'bold', color: '#ff1493' },
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

export default ElogiosScreen;