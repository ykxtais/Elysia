import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import DrawerRoutes from './routes/drawer.routes';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerRoutes />
    </NavigationContainer>
  );
}