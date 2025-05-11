import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/Home';
import Integr from '../screens/Integr';
import Tecno from '../screens/Tecno';
import Difer from '../screens/Difer';
import Form from '../screens/Form';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Integrantes') iconName = 'people';
          else if (route.name === 'Tecnologia') iconName = 'code-slash';
          else if (route.name === 'Diferenciais') iconName = 'sparkles';
          else if (route.name === 'Formulário') iconName = 'document-text';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#8c8c8c',
        tabBarStyle: {
          backgroundColor: '#523687',
          height: 65,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Integrantes" component={Integr} />
      <Tab.Screen name="Tecnologia" component={Tecno} />
      <Tab.Screen name="Diferenciais" component={Difer} />
      <Tab.Screen name="Formulário" component={Form} />

    </Tab.Navigator>
    );
}