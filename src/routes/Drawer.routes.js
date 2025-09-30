import { createDrawerNavigator } from '@react-navigation/drawer';
import TabRoutes from './tab.routes';

import Integr from '../screens/Integr';
import Tecno from '../screens/Tecno';
import Difer from '../screens/Difer';
import Form from '../screens/Form';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0cb012',
        },
        headerTintColor: '#000',
        drawerStyle: {
          backgroundColor: '#bdbdbd',
          width: 200,
        },
        drawerActiveTintColor: '#215721',
        drawerInactiveTintColor: '#222',
      }}
    >
      <Drawer.Screen
      name="InícioTab"
      component={TabRoutes}
      options={{ title: 'Início' }}
      />
      <Drawer.Screen name="Integrantes" component={Integr} />
      <Drawer.Screen name="Tecnologia" component={Tecno} />
      <Drawer.Screen name="Diferenciais" component={Difer} />
      <Drawer.Screen name="Formulário" component={Form} />
    </Drawer.Navigator>
  );
}