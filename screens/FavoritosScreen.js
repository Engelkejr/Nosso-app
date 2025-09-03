import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../App';

const BACKEND_URL = 'https://nossahistoria.up.railway.app';
const FavoritosScreen = () => {
  const [mensagem, setMensagem] = useState('');
  const [favoritos, setFavoritos] = useState([]);
  const { user } = useAuth();

  const carregarFavoritos = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/favoritos`, {
        headers: { 'Authorization': user },
      });
      const dados = await response.json();
      setFavoritos(dados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os favoritos.');
    }
  };

  const salvarFavorito = async () => {
    if (!mensagem) {
      Alert.alert('Erro', 'A mensagem é obrigatória.');
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/favoritos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user,
        },
        body: JSON.stringify({ titulo: mensagem }),
      });
      if (response.ok) {
        Alert.alert('Sucesso', 'Favorito salvo!');
        setMensagem('');
        carregarFavoritos();
      } else {
        Alert.alert('Erro', 'Erro ao salvar favorito.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão com o servidor.');
    }
  };

  useEffect(() => {
    carregarFavoritos();
  }, []);

const renderItem = ({ item }) => (
  <Text style={styles.item}>💖 {item.mensagem}</Text>
);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>💖 Meus Favoritos</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Digite algo que você ama..." value={mensagem} onChangeText={setMensagem} />
        <TouchableOpacity style={styles.button} onPress={salvarFavorito} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={favoritos}
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
export default FavoritosScreen;
