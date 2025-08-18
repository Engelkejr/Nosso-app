import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../App';

const BACKEND_URL = 'http://177.192.23.102';

const TimelineScreen = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataEvento, setDataEvento] = useState('');
  const [eventos, setEventos] = useState([]);
  const { user } = useAuth();

  const carregarEventos = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/timeline/listar`, {
        headers: { 'Authorization': user },
      });
      const dados = await response.json();
      setEventos(dados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os eventos.');
    }
  };

  const adicionarEvento = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/timeline/adicionar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user,
        },
        body: JSON.stringify({ titulo, descricao, data_evento: dataEvento }),
      });
      if (response.ok) {
        Alert.alert('Sucesso', 'Evento adicionado!');
        setTitulo('');
        setDescricao('');
        setDataEvento('');
        carregarEventos();
      } else {
        Alert.alert('Erro', 'Não foi possível adicionar o evento.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão com o servidor.');
    }
  };

  useEffect(() => {
    carregarEventos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.titulo}</Text>
      <Text style={styles.itemDescription}>{item.descricao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Nossa Linha do Tempo</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
        <TextInput style={styles.input} placeholder="Descrição" value={descricao} onChangeText={setDescricao} />
        <TextInput style={styles.input} placeholder="Data (YYYY-MM-DD)" value={dataEvento} onChangeText={setDataEvento} />
        <Button title="Adicionar Evento" onPress={adicionarEvento} color="#ff69b4" />
      </View>
      <FlatList
        data={eventos}
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

export default TimelineScreen;