import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../App';

const MoreScreen = () => {
  const navigation = useNavigation();
  const { setUser } = useAuth();

  const navigateTo = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mais opções</Text>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Cofrinho')}>
        <Text style={styles.menuText}>🐷 Cofrinho</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Favoritos')}>
        <Text style={styles.menuText}>💖 Favoritos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Presentes')}>
        <Text style={styles.menuText}>🎁 Presentes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Declaracoes')}>
        <Text style={styles.menuText}>💌 Declarações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Dates')}>
        <Text style={styles.menuText}>🌹 Dates</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Reclamacoes')}>
        <Text style={styles.menuText}>📝 Reclamações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Elogios')}>
        <Text style={styles.menuText}>🙏 Elogios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.sairButton} onPress={() => setUser(null)}>
        <Text style={styles.sairText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff0f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff1493',
    textAlign: 'center',
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  sairButton: {
    backgroundColor: '#ff1493',
    padding: 15,
    borderRadius: 50,
    marginTop: 20,
    alignItems: 'center',
  },
  sairText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MoreScreen;