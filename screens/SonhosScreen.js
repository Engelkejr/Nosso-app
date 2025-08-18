import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../App';

const BACKEND_URL = 'http://177.192.23.102';

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
        <Button title="Enviar Sonho" onPress={enviarSonho} color="#ff69b4" />
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
  form: { marginBottom: 20, padding: 15, backgroundColor: '#fff', borderRadius: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  itemContainer: { padding: 15, backgroundColor: '#fff', borderRadius: 10, marginBottom: 10 },
  itemTitle: { fontWeight: 'bold', fontSize: 18, color: '#ff1493' },
  itemDescription: { fontSize: 16 },
});

export default SonhosScreen;