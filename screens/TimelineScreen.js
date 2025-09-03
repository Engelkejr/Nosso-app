import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, Platform, TouchableOpacity } from 'react-native';
import { useAuth } from '../App';
import DateTimePicker from '@react-native-community/datetimepicker';

const BACKEND_URL = 'https://nossahistoria.up.railway.app';

const TimelineScreen = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataEvento, setDataEvento] = useState(new Date());
  const [eventos, setEventos] = useState([]);
  const { user } = useAuth();
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  // formata data no fuso local como YYYY-MM-DD (sem conversão para UTC)
  const formatLocalDate = (d) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const adicionarEvento = async () => {
    if (!titulo || !descricao) {
      Alert.alert('Erro', 'Título e descrição são obrigatórios.');
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/timeline/adicionar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user,
        },
        body: JSON.stringify({
          titulo,
          descricao,
          data_evento: formatLocalDate(dataEvento)
        }),
      });
      if (response.ok) {
        Alert.alert('Sucesso', 'Evento adicionado!');
        setTitulo('');
        setDescricao('');
        setDataEvento(new Date());
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

  const onDateChange = (_, selectedDate) => {
    const currentDate = selectedDate || dataEvento;
    setShowDatePicker(Platform.OS === 'ios');
    setDataEvento(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const renderItem = ({ item }) => {
    // garante interpretação da string YYYY-MM-DD como data local
    const [y, m, d] = item.data_evento.split('-');
    const dataObj = new Date(Number(y), Number(m) - 1, Number(d));
    const dataFormatada = dataObj.toLocaleDateString('pt-BR');

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.titulo} ({dataFormatada})</Text>
        <Text style={styles.itemDescription}>{item.descricao}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Nossa Linha do Tempo</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
        <TextInput style={styles.input} placeholder="Descrição" value={descricao} onChangeText={setDescricao} />
        
        <TouchableOpacity onPress={showDatepicker} style={styles.dateInput}>
          <Text style={styles.dateText}>{dataEvento.toLocaleDateString('pt-BR')}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dataEvento}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onDateChange}
          />
        )}
        
        <Button title="Adicionar" onPress={adicionarEvento} color="#ff69b4" />
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
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: '#ff1493',
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
});

export default TimelineScreen;