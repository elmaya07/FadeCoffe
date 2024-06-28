/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Image, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Beranda from './Pages/Beranda';
import Pos from './Pages/Pos';
import Cart from './Pages/Cart';
import Layout from './React-Native-Paper/Layout';
import store from './app/store';
import {Provider, useSelector} from 'react-redux';
import Pesanan from './Pages/Pesanan';
import SettingView from './Pages/SettingView';
import LaporanView from './Pages/LaporanView';
import SplashScreen from 'react-native-splash-screen';
import DetailPesanan from './Pages/DetailPesanan';
import Menu from './Pages/Menu';
import AddMenu from './Pages/Form/AddMenu';
import Meja from './Pages/Meja';
import AddMeja from './Pages/Form/AddMeja';
import ExportPdf from './Pages/ExportPdf';
import Daftar from './Pages/Daftar';
import Login from './Pages/Login';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

const ReportView = ({color, size}) => {
  const {carts} = useSelector(store => store.pos);

  return (
    <View
      style={{
        // backgroundColor: 'whitesmoke',
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 50,
        bottom: -14,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../assets/images/shopping-cart.png')}
        style={{width: 20, height: 20}}
      />
      <Text style={{position: 'absolute', top: 5, color: 'red'}}>
        {carts.length}
      </Text>
    </View>
  );
};

function BerandaStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Beranda"
        component={Beranda}
        options={{tabBarLabel: 'Beranda!', headerShown: false}}
      />
      <SettingsStack.Screen
        name="Pos"
        component={Pos}
        options={{tabBarLabel: 'Pos!', headerShown: false}}
      />
      <SettingsStack.Screen
        name="Pesanan"
        component={Pesanan}
        options={{tabBarLabel: 'Pesanan!', headerShown: false}}
      />
      <SettingsStack.Screen
        name="DetailPesanan"
        component={DetailPesanan}
        options={{tabBarLabel: 'DetailPesanan!', headerShown: false}}
      />
      <SettingsStack.Screen
        name="Laporan"
        component={LaporanView}
        options={{tabBarLabel: 'DetailPesanan!', headerShown: false}}
      />
      <SettingsStack.Screen
        name="Menu"
        component={Menu}
        options={{tabBarLabel: 'Menu!', headerShown: false}}
      />
      <SettingsStack.Screen
        name="AddMenu"
        component={AddMenu}
        options={{tabBarLabel: 'Add Menu!', headerShown: false}}
      />
      <SettingsStack.Screen
        name="Meja"
        component={Meja}
        options={{tabBarLabel: 'Meja!', headerShown: false}}
      />
      <SettingsStack.Screen
        name="AddMeja"
        component={AddMeja}
        options={{tabBarLabel: 'Add Meja!', headerShown: false}}
      />
      <SettingsStack.Screen
        name="ExportPdf"
        component={ExportPdf}
        options={{tabBarLabel: 'Export Pdf!', headerShown: false}}
      />
      <SettingsStack.Screen
        name="Daftar"
        component={Daftar}
        options={{tabBarLabel: 'Daftar!', headerShown: false}}
      />
      <SettingsStack.Screen
        name="Login"
        component={Login}
        options={{tabBarLabel: 'Login!', headerShown: false}}
      />
    </SettingsStack.Navigator>
  );
}

export default function StackNavigation() {
  React.useEffect(() => {
    // Hide splash screen when component is mounted
    // SplashScreen.show();
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer screenOptions={{headerShown: false}}>
          <Layout>
            <Tab.Navigator initialRouteName="BerandaStackScreen">
              <Tab.Screen
                name="BerandaStackScreen"
                component={BerandaStackScreen}
                options={{
                  headerShown: false,
                  tabBarLabel: 'Beranda',
                  tabBarIcon: ({color, size}) => (
                    <Image
                      source={require('../assets/images/home-1.png')}
                      style={{width: 20, height: 20}}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                  headerShown: false,
                  tabBarLabel: 'Keranjang',
                  tabBarIcon: ({color, size}) => <ReportView />,
                }}
              />
              <Tab.Screen
                name="Settings"
                component={SettingView}
                options={{
                  headerShown: false,
                  tabBarLabel: 'Settings ok',
                  tabBarIcon: ({color, size}) => (
                    <Image
                      source={require('../assets/images/setting.png')}
                      style={{width: 20, height: 20}}
                    />
                  ),
                }}
              />
            </Tab.Navigator>
          </Layout>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
