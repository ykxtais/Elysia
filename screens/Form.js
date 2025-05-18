import React, { useState, useCallback, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

export default function Form() {
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');

  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      const saved = await AsyncStorage.getItem('@user');
      if (saved) {
        setIsAuthenticated(true);
      }
    };
    checkUser();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setEmail('');
      setTelefone('');
      setSenha('');
      setConfirmarSenha('');
      setLoginEmail('');
      setLoginSenha('');
    }, [])
  );

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogout = async () => {
    setIsAuthenticated(false);
    setIsLogin(true);
    Alert.alert('Desconectado', 'Você saiu da conta.');
  };

  const handleCadastro = async () => {
    if (!email || !telefone || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Digite um email válido.');
      return;
    }
    if (!/^\d+$/.test(telefone)) {
      Alert.alert('Erro', 'Telefone deve conter apenas números.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    const userData = { email, telefone, senha };

    try {
      await AsyncStorage.setItem('@user', JSON.stringify(userData));
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      setIsLogin(true);
      setEmail('');
      setTelefone('');
      setSenha('');
      setConfirmarSenha('');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar os dados.');
    }
  };

  const handleLogin = async () => {
    try {
      const saved = await AsyncStorage.getItem('@user');
      if (saved) {
        const user = JSON.parse(saved);
        if (user.email === loginEmail && user.senha === loginSenha) {
          Alert.alert('Sucesso', `Bem-vindo(a), ${user.email}!`);
          setIsAuthenticated(true);
          navigation.navigate('InícioTab', { screen: 'Home' });
        } else {
          Alert.alert('Erro', 'Credenciais inválidas.');
        }
      } else {
        Alert.alert('Erro', 'Nenhum usuário cadastrado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Problema ao acessar os dados.');
    }
  };

  return (
    <View style={styles.container}>
      {isLogin ? (
        <>
          {isAuthenticated && (
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <Icon name="log-out" size={20} color="#fff" />
            </TouchableOpacity>
          )}
          <Image source={require('../img/log.jpg')} style={styles.imgLog} />
          <View style={styles.formLog}>
            <Text style={styles.welcome}>Bem vindo de volta!</Text>
            <Text style={styles.title}>Login</Text>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={loginEmail}
              onChangeText={setLoginEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Senha"
              secureTextEntry
              style={styles.input}
              value={loginSenha}
              onChangeText={setLoginSenha}
            />
            <TouchableOpacity style={styles.btn} onPress={handleLogin}>
              <Text style={styles.btnText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsLogin(false)}>
              <Text style={styles.otherSide}>Novo por aqui? Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.formCad}>
            <Text style={styles.welcome}>Seja bem vindo!</Text>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Telefone"
              keyboardType="numeric"
              style={styles.input}
              value={telefone}
              onChangeText={setTelefone}
            />
            <TextInput
              placeholder="Senha"
              secureTextEntry
              style={styles.input}
              value={senha}
              onChangeText={setSenha}
            />
            <TextInput
              placeholder="Confirmar Senha"
              secureTextEntry
              style={styles.input}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />
            <TouchableOpacity style={styles.btn} onPress={handleCadastro}>
              <Text style={styles.btnText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsLogin(true)}>
              <Text style={styles.otherSide}>Já tem conta? Fazer login</Text>
            </TouchableOpacity>
          </View>
          <Image source={require('../img/cad.jpg')} style={styles.imgCad} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#000',
  },
  imgLog: {
    width: '40%',
    height: '100%',
  },
  imgCad: {
    width: '40%',
    height: '100%',
  },
  formLog: {
    width: '60%',
    padding: 20,
    justifyContent: 'center',
  },
  formCad: {
    width: '60%',
    padding: 20,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#159915',
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#17d117',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#17d117',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
  otherSide: {
    color: '#17d117',
    marginTop: 15,
    fontSize: 15,
  },
  logoutBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 8,
  },
});
