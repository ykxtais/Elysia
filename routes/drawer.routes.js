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
          backgroundColor: '#523687',
        },
        headerTintColor: '#fff',
        drawerStyle: {
          backgroundColor: '#bdbdbd',
          width: 200,
        },
        drawerActiveTintColor: '#523687',
        drawerInactiveTintColor: '#333',
      }}
    >
      <Drawer.Screen name="Home" component={TabRoutes} />
      <Drawer.Screen name="Integrantes" component={Integr} />
      <Drawer.Screen name="Tecnologia" component={Tecno} />
      <Drawer.Screen name="Diferenciais" component={Difer} />
      <Drawer.Screen name="Formulário" component={Form} />
    </Drawer.Navigator>
  );
}
