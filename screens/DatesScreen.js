import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../App';

const BACKEND_URL = 'http://177.192.23.102';

const DatesScreen = () => {
  const [descricao, setDescricao] = useState('');
  const [dates, setDates] = useState([]);
  const { user } = useAuth();

  const carregarDates = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/dates`, {
        headers: { 'Authorization': user },
      });
      const dados = await response.json();
      setDates(dados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dates.');
    }
  };

  const salvarDate = async () => {
    if (!descricao) {
      Alert.alert('Erro', 'A descrição é obrigatória.');
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/dates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user,
        },
        body: JSON.stringify({ descricao }),
      });
      if (response.ok) {
        Alert.alert('Sucesso', 'Date salvo com sucesso!');
        setDescricao('');
        carregarDates();
      } else {
        Alert.alert('Erro', 'Erro ao salvar o date.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão com o servidor.');
    }
  };

  useEffect(() => {
    carregarDates();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.descricao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌹 Nossos Dates</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Descreva o date..." value={descricao} onChangeText={setDescricao} multiline />
        <Button title="Salvar Date" onPress={salvarDate} color="#ff69b4" />
      </View>
      <FlatList
        data={dates}
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
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5, minHeight: 80 },
  itemContainer: { padding: 15, backgroundColor: '#fff', marginBottom: 10, borderRadius: 8 },
  itemText: { fontSize: 16 },
});

export default DatesScreen;