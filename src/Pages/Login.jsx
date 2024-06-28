// src/Login.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {login, loginQrcode, registrasi} from '../services/auth';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAuth} from '../app/features/auth/authSlice';
import {Snackbar} from 'react-native-paper';
import ScanbotSDK from 'react-native-scanbot-sdk';

const Login = ({navigation}) => {
  const [visibleSnack, setVisibleSnack] = React.useState(false);
  const onToggleSnackBar = () => setVisibleSnack(!visibleSnack);
  const onDismissSnackBar = () => setVisibleSnack(false);
  const {isAuth} = useSelector(store => store.auth);
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(true);
  const [view, setView] = useState('');
  const [viewType, setViewType] = useState('login');
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    name: '',
    email: 'admin@email.com',
    password: '12345678',
    level: view,
  });

  const setViewFunc = params => {
    setView(params);
    setFirst(false);
    setPayload(p => ({...p, level: params}));
  };
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('auth', value);
      await AsyncStorage.setItem('isAuth', '1');
      dispatch(
        setAuth({
          isAuth: true,
          user: value,
        }),
      );
      setLoading(false);
    } catch (e) {
      // saving error
    }
  };

  const fetchLogin = async () => {
    setLoading(true);
    console.log(payload, 'req');
    try {
      let response;
      if (viewType == 'login') {
        response = await login(payload);
      } else {
        response = await registrasi(payload);
      }
      console.log(response, 'r');
      setLoading(false);
      storeData(JSON.stringify({...response.data, date: new Date()}));
    } catch (error) {
      onToggleSnackBar();
      console.log(error);
      setLoading(false);
    }
  };

  if (first == true) {
    return (
      <FirstPage setView={setViewFunc} onToggleSnackBar={onToggleSnackBar} />
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={{width: '100%'}}>
          <Feather name="arrow-left" size={30} onPress={() => setFirst(true)} />
        </View>
        <View style={{marginTop: 80, marginBottom: 50}}>
          <Image
            source={require('../../assets/logo/logo.png')}
            style={{width: 100, height: 100}}
          />
        </View>
        <Text style={styles.title}>LOGIN</Text>
        {['daftar'].includes(viewType) && (
          <TextInput
            onChangeText={e => setPayload(p => ({...p, name: e}))}
            value={payload?.name}
            style={styles.input}
            placeholder="Nama Lengkap"
            keyboardType="text"
          />
        )}
        <TextInput
          onChangeText={e => setPayload(p => ({...p, email: e}))}
          value={payload?.email}
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          onChangeText={e => setPayload(p => ({...p, password: e}))}
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={payload?.password}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={fetchLogin}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color={'#fff'} />
          ) : (
            <Text style={styles.buttonText}>SUBMIT</Text>
          )}
        </TouchableOpacity>

        {['pelanggan'].includes(view) && (
          <View>
            <TouchableOpacity
              onPress={() =>
                setViewType(p => (p == 'daftar' ? 'login' : 'daftar'))
              }>
              <Text style={{color: '#ffaa20'}}>
                {viewType == 'login' ? 'Daftar' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <Snackbar
          visible={visibleSnack}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Ok',
            onPress: () => onDismissSnackBar(),
          }}>
          Username atau password tidak di temukan
        </Snackbar>
      </View>
    );
  }
};

const FirstPage = ({setView, onToggleSnackBar}) => {
  const [firstView, setFirstView] = useState('default');
  const dispatch = useDispatch();

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('auth', value);
      await AsyncStorage.setItem('isAuth', '1');
      dispatch(
        setAuth({
          isAuth: true,
          user: value,
        }),
      );
    } catch (e) {
      // saving error
    }
  };

  const initSDK = async () => {
    const myLicenseKey =
      'ZsEJG/qYpLxSL4ddOlN5lIMJ6+Ft/S' +
      'U10fiLfuAjILXCXEiBs+Lo27qaU55K' +
      'uohvEZznAdocHGPhl0uym0RZ6JWk6u' +
      'NPIwGX4vJbxYS31yjus2g2E+0ZF7E5' +
      'mHNvW3h0/3jSV2i6KTgthCLpni36Hg' +
      'SqaWLPD/Rl31c5ip6BAte3WmVKtzyX' +
      'YWmA9h2lZBT1VGBSWX91VVwOG76MT4' +
      'Ia4NwPUVtOhet/MPh59zhYaK8KWcBF' +
      'baACbY2ommr5UEjpwqlokwT7CKMcrS' +
      'Uwqu+RMoAgMfNPZ2JebbbxUR76if9Z' +
      'hqGTNB4sCjEUO3JtoMD3lrEFWi0cgU' +
      'z5xTes2pv2Vw==\nU2NhbmJvdFNESw' +
      'pjb20uZmFkZWNvZmZlCjE3MjAwNTEx' +
      'OTkKODM4ODYwNwoxOQ==\n';

    const options = {
      licenseKey: myLicenseKey,
      loggingEnabled: true,
    };

    const result = await ScanbotSDK.initializeSDK(options);

    const config = {
      finderAspectRatio: {width: 1, height: 1}, // Adjust as needed
      cameraOverlayColor: 'black',
      // Other configuration options
    };

    ScanbotSDK.UI.startBarcodeScanner(config)
      .then(async result => {
        if (result.status === 'OK') {
          console.log('Scanned QR code:', result.barcodes[0].text);
          try {
            const response = await loginQrcode({
              email: result.barcodes[0].text,
            });
            console.log(response, 'res');

            storeData(JSON.stringify({...response.data, date: new Date()}));
          } catch (error) {
            console.log(error);
            onToggleSnackBar();
          }
        } else {
          console.log('Barcode scanner canceled');
        }
      })
      .catch(error => {
        console.error('Error starting barcode scanner:', error);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 40,
      }}>
      <View
        style={{
          marginTop: 80,
          marginBottom: 50,
          borderWidth: 1,
          borderColor: '#d0d0d0',
          backgroundColor: 'whitesmoke',
          padding: 20,
          borderRadius: 20,
        }}>
        <Image
          source={require('../../assets/logo/logo.png')}
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'whitesmoke',
          }}
        />
      </View>
      <View>
        <TouchableOpacity style={{width: '80%'}} onPress={initSDK}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#ffaa20',
            }}>
            Login Pelanggan
          </Text>
        </TouchableOpacity>
        <View style={{marginTop: 10}} />
        <TouchableOpacity
          style={{
            width: '80%',
          }}
          onPress={() => setView('admin')}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#ffaa20',
            }}>
            Login Admin
          </Text>
        </TouchableOpacity>

        <View style={{marginTop: 10}} />
        <TouchableOpacity
          style={{
            width: '80%',
          }}
          onPress={() => setView('kasir')}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#ffaa20',
            }}>
            Login Kasir
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffaa20',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  orText: {
    marginBottom: 10,
    color: '#888',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    marginHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    color: '#007BFF',
  },
});

export default Login;
