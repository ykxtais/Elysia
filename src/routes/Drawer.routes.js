import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

import BtnLanguage from '../components/BtnLanguage';
import BtnTheme from '../components/BtnTheme';

import Home from '../screens/Home';
import Mapa from '../screens/Mapa';
import Tecno from '../screens/Tecno';
import MotoVaga from '../screens/MotoVaga'; 
import Perfil from '../screens/Perfil';

function BottomBar({ navigation, current }) {
  const { colors } = useTheme();

  const items = [
    { name: 'Home',     label: 'Home',        icon: 'home-outline',      iconActive: 'home' },
    { name: 'Mapa',     label: 'Mapa',        icon: 'map-outline',       iconActive: 'map' },
    { name: 'Tecno',    label: 'Tecnologia',  icon: 'code-outline', iconActive: 'code' },
    { name: 'MotoVaga', label: 'MotoVaga',  icon: 'barcode-outline',   iconActive: 'barcode' },
    { name: 'Perfil',   label: 'Perfil',      icon: 'person-outline',    iconActive: 'person' },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.card,
      }}
    >
      {items.map((it) => {
        const active = current === it.name;
        const tint = active ? colors.primary : colors.text;

        return (
          <TouchableOpacity
            key={it.name}
            onPress={() => navigation.navigate(it.name)}
            style={{
              flex: 1, 
              alignItems: 'center',
              paddingVertical: 6,
            }}
          >
            <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
              <Text
                style={{
                  color: tint,
                  fontSize: 12,
                  fontWeight: active ? '800' : '600',
                }}
                numberOfLines={1}
              >
                {it.label}
              </Text>
              <Ionicons
                name={active ? it.iconActive : it.icon}
                size={18}
                color={tint}
                style={{ marginLeft: 6 }}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function withBottomBar(Component, routeName) {
  const Wrapped = ({ navigation, ...rest }) => {
    const { colors } = useTheme();
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Component navigation={navigation} {...rest} />
        <BottomBar navigation={navigation} current={routeName} />
      </View>
    );
  };
  return Wrapped;
}

function MenuButton({ navigation }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ paddingHorizontal: 12 }}>
      <Ionicons name="menu" size={24} color={colors.text} />
    </TouchableOpacity>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerLeft: () => <MenuButton navigation={navigation} />,
        headerRight: () => (
          <View style={{ flexDirection: 'row', gap: 8, marginRight: 10 }}>
            <BtnLanguage compact />
            <BtnTheme compact />
          </View>
        ),
        headerStyle: { backgroundColor: colors.card },
        headerTitleStyle: { color: colors.text, fontWeight: '700' },
        headerTintColor: colors.text,

        drawerStyle: { backgroundColor: colors.surface },
        drawerActiveBackgroundColor: colors.secondary,
        drawerActiveTintColor: colors.onSecondary,
        drawerInactiveTintColor: colors.text,
        drawerItemStyle: { borderRadius: 16, marginHorizontal: 12 },

        sceneContainerStyle: { backgroundColor: colors.background },
        overlayColor: 'rgba(0,0,0,0.35)',
      })}
    >
      <Drawer.Screen name="Home" component={withBottomBar(Home, 'Home')} options={{ title: 'Home' }} />
      <Drawer.Screen name="Mapa" component={withBottomBar(Mapa, 'Mapa')} options={{ title: 'Mapa' }} />
      <Drawer.Screen name="Tecno" component={withBottomBar(Tecno, 'Tecno')} options={{ title: 'Tecnologia' }} />
      <Drawer.Screen name="MotoVaga" component={withBottomBar(MotoVaga, 'MotoVaga')} options={{ title: 'MotoVaga' }} />
      <Drawer.Screen name="Perfil" component={withBottomBar(Perfil, 'Perfil')} options={{ title: 'Perfil' }} />
    </Drawer.Navigator>
  );
}
