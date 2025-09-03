import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../App';

const BACKEND_URL = 'https://nossahistoria.up.railway.app';
const SonhosScreen = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [sonhos, setSonhos] = useState([]);
  const { user } = useAuth();

  const carregarSonhos = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/sonhos`, {
        headers: { 'Authorization': user },
      });
      const dados = await response.json();
      setSonhos(dados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os sonhos.');
    }
  };

  const enviarSonho = async () => {
    if (!titulo || !descricao) {
      Alert.alert('Erro', 'Título e descrição são obrigatórios.');
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/sonhos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user,
        },
        body: JSON.stringify({ titulo, descricao }),
      });
      if (response.ok) {
        Alert.alert('Sucesso', 'Sonho enviado!');
        setTitulo('');
        setDescricao('');
        carregarSonhos();
      } else {
        Alert.alert('Erro', 'Erro ao enviar sonho.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão com o servidor.');
    }
  };

  useEffect(() => {
    carregarSonhos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.titulo}</Text>
      <Text style={styles.itemDescription}>{item.descricao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌟 Meus Sonhos</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Título do sonho" value={titulo} onChangeText={setTitulo} />
        <TextInput style={styles.input} placeholder="Descreva seu sonho..." value={descricao} onChangeText={setDescricao} multiline />
        <TouchableOpacity style={styles.button} onPress={enviarSonho} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sonhos}
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
});
export default SonhosScreen;