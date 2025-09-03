import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const BACKEND_URL = 'https://nossahistoria.up.railway.app';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigation = useNavigation();
  const { setUser } = useAuth();

  const handleLogin = async () => {
    setMensagem('Tentando login...');
    console.log('1. Tentando login com:', email);

    try {
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      console.log('2. Resposta do servidor recebida. Status:', response.status);
      const data = await response.json();
      console.log('3. Dados da resposta:', data);

      if (response.ok) {
        console.log('4. Login bem-sucedido. Redirecionando...');
        setUser(data.email);
      } else {
        console.log('4. Erro de login. Mensagem:', data.error);
        setMensagem(data.error || 'Erro no login.');
      }
    } catch (error) {
      console.log('2. Erro de conexão:', error);
      setMensagem('Erro de conexão com o servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.h1}>Login</Text>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          required
        />
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          required
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.mensagem}>{mensagem}</Text>
        <Text style={styles.linkText}>
          Não tem uma conta?{' '}
          <Text onPress={() => navigation.navigate('Register')} style={styles.link}>
            Registre-se aqui
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff0f5' },
  form: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
  },
  h1: { fontSize: 32, fontWeight: 'bold', color: '#ff1493', marginBottom: 20, textAlign: 'center' },
  label: { color: '#ff1493', fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginTop: 5,
    marginBottom: 15,
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
  mensagem: { color: 'red', textAlign: 'center', marginTop: 10 },
  linkText: { textAlign: 'center', marginTop: 15 },
  link: { color: '#ff1493', fontWeight: 'bold' },
});
export default LoginScreen;