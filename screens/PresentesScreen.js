import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../App';

const BACKEND_URL = 'http://177.192.23.102';
const PresentesScreen = () => {
  const [mensagem, setMensagem] = useState('');
  const [presentes, setPresentes] = useState([]);
  const { user } = useAuth();

  const carregarPresentes = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/presentes`, {
        headers: { 'Authorization': user },
      });
      const dados = await response.json();
      setPresentes(dados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as sugestões de presentes.');
    }
  };

  const salvarPresente = async () => {
    if (!mensagem) {
      Alert.alert('Erro', 'A mensagem é obrigatória.');
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/presentes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user,
        },
        body: JSON.stringify({ mensagem }),
      });
      if (response.ok) {
        Alert.alert('Sucesso', 'Sugestão de presente salva!');
        setMensagem('');
        carregarPresentes();
      } else {
        Alert.alert('Erro', 'Erro ao salvar sugestão.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão com o servidor.');
    }
  };

  useEffect(() => {
    carregarPresentes();
  }, []);

  const renderItem = ({ item }) => (
    <Text style={styles.item}>🎁 {item.titulo}</Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎁 Ideias de Presentes</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Sugestão de presente" value={mensagem} onChangeText={setMensagem} />
        <Button title="Salvar" onPress={salvarPresente} color="#ff69b4" />
      </View>
      <FlatList
        data={presentes}
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
  item: { padding: 10, backgroundColor: '#fff', marginBottom: 10, borderRadius: 8 },
});

export default PresentesScreen;