import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Integr from '../screens/Integr';
import Form from '../screens/Form';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Integrantes" component={Integr} />
        <Stack.Screen name="Formulário" component={Form} />
    </Stack.Navigator>
    );
}