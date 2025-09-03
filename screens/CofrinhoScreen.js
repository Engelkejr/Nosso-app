import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, ProgressViewIOS, ProgressBarAndroid } from 'react-native';
import { useAuth } from '../App';

const BACKEND_URL = 'https://nossahistoria.up.railway.app'; // Substitua pela URL do seu servidor

const CofrinhoScreen = () => {
  const [valor, setValor] = useState('');
  const [meta, setMeta] = useState('');
  const [total, setTotal] = useState(0);
  const [valorMeta, setValorMeta] = useState(0);
  const { user } = useAuth();

  const carregarCofrinho = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/cofrinho/meta`, {
        headers: { 'Authorization': user },
      });
      if (response.ok) {
        const data = await response.json();
        setTotal(parseFloat(data.total) || 0);
        setValorMeta(parseFloat(data.meta?.valor_meta) || 0);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar os dados do cofrinho. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro de conexão com o servidor.');
    }
  };

  const adicionarValor = async () => {
    const valorNumerico = parseFloat(valor);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Erro', 'Valor inválido.');
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/cofrinho/adicionar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user,
        },
        body: JSON.stringify({ valor: valorNumerico, data: new Date().toISOString().split('T')[0] }),
      });
      if (response.ok) {
        Alert.alert('Sucesso', 'Valor adicionado!');
        setValor('');
        carregarCofrinho();
      } else {
        Alert.alert('Erro', 'Erro ao adicionar valor.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão com o servidor.');
    }
  };

  const salvarMeta = async () => {
    const metaNumerico = parseFloat(meta);
    if (isNaN(metaNumerico) || metaNumerico <= 0) {
      Alert.alert('Erro', 'Meta inválida.');
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/cofrinho/meta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user,
        },
        body: JSON.stringify({ objetivo: metaNumerico }),
      });
      if (response.ok) {
        Alert.alert('Sucesso', 'Meta salva!');
        setMeta('');
        carregarCofrinho();
      } else {
        Alert.alert('Erro', 'Erro ao salvar meta.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão com o servidor.');
    }
  };

  useEffect(() => {
    carregarCofrinho();
  }, []);

  const porcentagem = valorMeta > 0 ? Math.min((total / valorMeta), 1) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐷 Cofrinho</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Adicionar valor</Text>
        <TextInput
          style={styles.input}
          placeholder="Valor"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />
        <TouchableOpacity style={styles.button} onPress={adicionarValor} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Definir Meta</Text>
        <TextInput
          style={styles.input}
          placeholder="Meta do cofrinho"
          keyboardType="numeric"
          value={meta}
          onChangeText={setMeta}
        />
        <TouchableOpacity style={styles.button} onPress={salvarMeta} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Salvar Meta</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progresso</Text>
        {Platform.OS === 'ios' ? (
          <ProgressViewIOS
            style={styles.progressBar}
            progressTintColor="#ff69b4"
            trackTintColor="#f3d3e3"
            progress={porcentagem}
          />
        ) : (
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={porcentagem}
            color="#ff69b4"
            style={styles.progressBar}
          />
        )}
        <Text style={styles.progressText}>R$ {total.toFixed(2)} de R$ {valorMeta.toFixed(2)}</Text>
      </View>
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

export default CofrinhoScreen;