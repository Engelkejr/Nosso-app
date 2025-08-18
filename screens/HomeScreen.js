import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Bem-vindo(a) ao Nosso Cantinho! 💑 João & Brunna</Text>
      <Text style={styles.paragraph}>Este é um espaço cheio de amor, sonhos e momentos especiais.</Text>
      <Text style={styles.paragraph}>Explore nosso mundo juntos e compartilhe lembranças inesquecíveis. ❤️</Text>
      <Text style={styles.h2}>💑 João & Brunna</Text>
      <Text style={styles.paragraph}>
        Somos feitos de jeitinhos, caminhadas e conversas que viraram laços. Nosso amor é intenso como o mar, quente como o fogo, leve como um apelido dito com carinho: amor, vida, mo. Ela é meu chão, minha base, minha alegria. Eu sou o riso nos dias dela. Juntos, nos completamos — com brigas, risadas e planos bobos de um futuro cheio de sonhos, crianças e sol. Nosso amor não precisa de música para tocar. Ele já vive em cada detalhe. 💖
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff0f5' },
  h1: { fontSize: 24, fontWeight: 'bold', color: '#ff1493', textAlign: 'center', marginBottom: 15 },
  h2: { fontSize: 20, fontWeight: 'bold', color: '#ff1493', textAlign: 'center', marginTop: 20 },
  paragraph: { fontSize: 16, color: '#333', textAlign: 'center', marginBottom: 10 },
});

export default HomeScreen;