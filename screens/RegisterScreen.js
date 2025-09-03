import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BACKEND_URL = 'https://nossahistoria.up.railway.app';
  const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/registrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });
      const data = await response.json();
      if (response.ok) {
        setMensagem('Registro realizado com sucesso! Redirecionando...');
        setTimeout(() => {
          navigation.navigate('Login');
        }, 2000);
      } else {
        setMensagem(data.error || 'Erro no registro.');
      }
    } catch (error) {
      setMensagem('Erro de conexão com o servidor.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.h1}>Registro</Text>
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
         <TouchableOpacity style={styles.button} onPress={handleRegister} activeOpacity={0.8}>
           <Text style={styles.buttonText}>Registrar</Text>
         </TouchableOpacity>
        <Text style={styles.mensagem}>{mensagem}</Text>
        <Text style={styles.linkText}>
          Já tem uma conta?{' '}
          <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
            Faça login aqui
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

export default RegisterScreen;