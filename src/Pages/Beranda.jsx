/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Button,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Avatar, Card, Button as PButton} from 'react-native-paper';
import Header from '../Components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getPenjualan} from '../services/pesanan';
import {formatCurrency} from '../helpers/mobile';
import moment from 'moment';
import Laporan from '../Components/Laporan';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setUpdate} from '../app/features/counter/counterSlice';

export default function Beranda({navigation}) {
  const [userAuth, setuserAuth] = React.useState(null);

  const fetchAuth = async () => {
    try {
      const auth = await AsyncStorage.getItem('auth');
      console.log(JSON.parse(auth).user);
      setuserAuth(JSON.parse(auth).user);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  React.useEffect(() => {
    fetchAuth();
  }, []);

  const menus = [
    {
      label: 'Order',
      access: ['pelanggan', 'admin'],
      icon: (
        <Image
          source={require('../../assets/images/produk-2.png')}
          style={{width: 30, height: 30}}
        />
      ),
      url: 'Pos',
    },
    {
      label: 'Lap Order',
      access: ['kasir', 'admin'],
      icon: (
        <Image
          source={require('../../assets/images/food-app.png')}
          style={{width: 30, height: 30}}
        />
      ),
      url: 'Pesanan',
    },
    {
      label: 'Laporan',
      access: ['admin'],
      icon: (
        <Image
          source={require('../../assets/images/chart-1.png')}
          style={{width: 30, height: 30}}
        />
      ),
      url: 'Laporan',
    },
    // {
    //   label: 'Stok',
    //   icon: (
    //     <Image
    //       source={require('../../assets/images/produk-1.png')}
    //       style={{width: 30, height: 30}}
    //     />
    //   ),
    //   url: 'Produk',
    // },
    {
      label: 'Menu',
      access: ['admin'],
      icon: (
        <Image
          source={require('../../assets/images/menu.png')}
          style={{width: 30, height: 30}}
        />
      ),
      url: 'Menu',
    },
    {
      label: 'Meja',
      access: ['admin'],
      icon: (
        <Image
          source={require('../../assets/images/table.png')}
          style={{width: 30, height: 30}}
        />
      ),
      url: 'Meja',
    },
    // {
    //   label: 'PDF',
    //   icon: (
    //     <Image
    //       source={require('../../assets/images/setting.png')}
    //       style={{width: 30, height: 30}}
    //     />
    //   ),
    //   url: 'ExportPdf',
    // },
  ];

  const {update} = useSelector(store => store.counter);
  const dispatch = useDispatch();

  const [total, setTotal] = React.useState(0);
  const fetchTotalPenjualan = async () => {
    const response = await getPenjualan();
    setTotal(response.data?.total);
  };

  React.useEffect(() => {
    fetchTotalPenjualan();
  }, []);

  React.useEffect(() => {
    console.log(update, 'up beradna');
    fetchTotalPenjualan();
    setTimeout(() => {
      dispatch(setUpdate(0));
    }, 5000);
  }, [update]);

  return (
    <View>
      <Header title="FADE COFFE" />
      {/* report */}
      <View
        style={{
          ...styles.container,
          display: ['kasir', 'admin'].includes(userAuth?.level)
            ? 'block'
            : 'none',
        }}>
        <View style={styles.saleReport}>
          <Image
            source={require('../../assets/images/shopping-cart.png')}
            style={{width: 30, height: 30}}
          />
          <View style={styles.saleReportContent}>
            <Text style={{fontWeight: 'bold'}}>Penjualan</Text>
            <Text>{moment().format('MMM YYYY')}</Text>
          </View>
          <View>
            <Text style={{fontWeight: 'bold'}}>
              Rp. {formatCurrency(total)}
            </Text>
          </View>
          <Entypo name="chevron-small-right" size={35} />
        </View>
      </View>

      {/* menu */}
      <View style={styles.menu}>
        {menus.map((row, i) => {
          if (row?.access?.includes(userAuth?.level)) {
            return (
              <TouchableOpacity
                style={styles.menuItem}
                key={i}
                onPress={() => navigation.navigate(row.url)}>
                {row.icon}
                <Text
                  style={{fontSize: 10, color: '#ffaa20', fontWeight: 'bold'}}>
                  {row.label}
                </Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
      {/* <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: 'white',
          marginTop: 20,
          padding: 30,
        }}>
        <Laporan />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 3,
  },
  saleReport: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  menu: {
    marginTop: 15,
    // width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingLeft: 20,
  },
  menuItem: {
    width: '20%',
    // borderColor: 'whitesmoke',
    // borderWidth: 1,
    aspectRatio: '1/1',
    // borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 10,
    // backgroundColor: 'whitesmoke',
    flexDirection: 'column',
    gap: 8,
  },
});
