import React, { createContext, useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import TimelineScreen from './screens/TimelineScreen';
import CofrinhoScreen from './screens/CofrinhoScreen';
import SonhosScreen from './screens/SonhosScreen';
import FavoritosScreen from './screens/FavoritosScreen';
import PresentesScreen from './screens/PresentesScreen';
import DeclaracoesScreen from './screens/DeclaracoesScreen';
import DatesScreen from './screens/DatesScreen';
import ReclamacoesScreen from './screens/ReclamacoesScreen';
import ElogiosScreen from './screens/ElogiosScreen';
import MoreScreen from './screens/MoreScreen';

const AuthContext = createContext();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const MoreStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MoreOptions" component={MoreScreen} options={{ title: 'Mais Opções' }} />
    <Stack.Screen name="Cofrinho" component={CofrinhoScreen} options={{ title: '🐷 Cofrinho' }} />
    <Stack.Screen name="Favoritos" component={FavoritosScreen} options={{ title: '💖 Favoritos' }} />
    <Stack.Screen name="Presentes" component={PresentesScreen} options={{ title: '🎁 Presentes' }} />
    <Stack.Screen name="Declaracoes" component={DeclaracoesScreen} options={{ title: '💌 Declarações' }} />
    <Stack.Screen name="Dates" component={DatesScreen} options={{ title: '🌹 Dates' }} />
    <Stack.Screen name="Reclamacoes" component={ReclamacoesScreen} options={{ title: '📝 Reclamações' }} />
    <Stack.Screen name="Elogios" component={ElogiosScreen} options={{ title: '🙏 Elogios' }} />
  </Stack.Navigator>
);

const AppTabs = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let icon;
        switch (route.name) {
          case 'Home':
            icon = '🏠';
            break;
          case 'Timeline':
            icon = '📅';
            break;
          case 'Sonhos':
            icon = '🌟';
            break;
          case 'More':
            icon = '⋮';// O ícone de 3 pontinhos
            break;
        }
        return <Text style={{ color, fontSize: size }}>{icon}</Text>;
      },
      tabBarStyle: {
        backgroundColor: '#ffb6c1',
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        height: 60,
      },
      tabBarItemStyle: {
        borderRadius: 50,
        margin: 5,
        backgroundColor: '#ff69b4',
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'white',
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Timeline" component={TimelineScreen} />
    <Tab.Screen name="Sonhos" component={SonhosScreen} />
    <Tab.Screen name="More" component={MoreStack} options={{ title: 'Mais' }} />
  </Tab.Navigator>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
     loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser !== null) {
          setUser(storedUser);
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar o estado do usuário.');
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const authContextValue = {
    user,
    setUser: async (newUser) => {
      setUser(newUser);
      if (newUser) {
        await AsyncStorage.setItem('user', newUser);
      } else {
        await AsyncStorage.removeItem('user');
      }
    },
  };

  if (isLoading) {
    return <View style={styles.loadingContainer}><Text>Carregando...</Text></View>;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        {user ? <AppTabs /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default App;