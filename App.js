import React, { createContext, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import AreaSecretaScreen from './screens/AreaSecretaScreen';
import ElogiosScreen from './screens/ElogiosScreen';

const AuthContext = createContext();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: () => {
        let iconName;
        if (route.name === 'Home') iconName = '🏠';
        else if (route.name === 'Timeline') iconName = '📅';
        else if (route.name === 'Cofrinho') iconName = '🐷';
        else if (route.name === 'Sonhos') iconName = '🌟';
        else if (route.name === 'Favoritos') iconName = '💖';
        else if (route.name === 'Presentes') iconName = '🎁';
        else if (route.name === 'Declaracoes') iconName = '💌';
        else if (route.name === 'Dates') iconName = '🌹';
        else if (route.name === 'Reclamacoes') iconName = '📝';
        else if (route.name === 'AreaSecreta') iconName = '🔒';
        else if (route.name === 'Elogios') iconName = '🙏';
        return <Text>{iconName}</Text>;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Timeline" component={TimelineScreen} />
    <Tab.Screen name="Cofrinho" component={CofrinhoScreen} />
    <Tab.Screen name="Sonhos" component={SonhosScreen} />
    <Tab.Screen name="Favoritos" component={FavoritosScreen} />
    <Tab.Screen name="Presentes" component={PresentesScreen} />
    <Tab.Screen name="Declaracoes" component={DeclaracoesScreen} />
    <Tab.Screen name="Dates" component={DatesScreen} />
    <Tab.Screen name="Reclamacoes" component={ReclamacoesScreen} />
    <Tab.Screen name="AreaSecreta" component={AreaSecretaScreen} />
    <Tab.Screen name="Elogios" component={ElogiosScreen} />
  </Tab.Navigator>
);

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <AppTabs /> : <AuthStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default App;