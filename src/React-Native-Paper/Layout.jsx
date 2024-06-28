import * as React from 'react';
import {PaperProvider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../services/auth';
import {useDispatch, useSelector} from 'react-redux';
import {setAuth} from '../app/features/auth/authSlice';
import Login from '../Pages/Login';
import {View} from 'react-native';
import SplashScreen from '../Components/SplashScreen';

export default function Layout({children, navigation}) {
  const [loading, setLoading] = React.useState(false);
  const {isAuth, data} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('auth', value);
    } catch (e) {
      // saving error
    }
  };

  function dateDiffInSeconds(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffInMilliseconds = Math.abs(d2 - d1);
    return diffInMilliseconds / 1000;
  }

  const getAuth = async () => {
    try {
      const user = await AsyncStorage.getItem('auth');
      const isAuth = await AsyncStorage.getItem('isAuth');
      return {user: JSON.parse(user), isAuth};
    } catch (error) {
      return null;
    }
  };

  const getData = async () => {
    try {
      const auth = await AsyncStorage.getItem('auth');
      console.log(auth,'auuuuuuuuth')
      if (auth == '' || auth == null) {
        // fetchLogin();
        dispatch(
          setAuth({
            isAuth: false,
            user: null,
          }),
        );
      } else {
        const diff = dateDiffInSeconds(JSON.parse(auth).date, new Date());
        console.log([JSON.parse(auth).date, new Date(), diff], 'diff');
        if (diff <= 100) {
          fetchLogin();
        }
        const data = await getAuth();
        dispatch(
          setAuth({
            isAuth: data.isAuth,
            user: data.user,
          }),
        );
      }
      setLoading(true);
    } catch (e) {
      // saving error
      throw e;
    }
  };

  const fetchLogin = async () => {
    const payload = {
      email: 'admin@email.com',
      password: '12345678',
    };
    const response = await login(payload);
    storeData(JSON.stringify({...response.data, date: new Date()}));
  };

  React.useEffect(() => {
    getData();
  }, []);
  if (loading) {
    return (
      <PaperProvider>
        {isAuth ? children : <Login navigation={navigation} />}
      </PaperProvider>
    );
  } else {
    <SplashScreen />;
  }
}
