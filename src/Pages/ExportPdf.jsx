// ExportPdf.js
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Button} from 'react-native';
import {Divider} from 'react-native-paper';
import PosHeader from '../Components/Header';

const ExportPdf = ({navigation}) => {
  const route = useRoute();
  const routeParams = route.params;
  useEffect(() => {
    console.log(routeParams);
  }, [routeParams]);
  return (
    <View style={styles.container}>
      <PosHeader title={'CETAK'} navigation={navigation} />
      <View style={{padding: 20}}>
        <Text style={styles.header}> Fade Coffe</Text>
        <Text style={styles.subHeader}>
          Jl. Waru Doyong, RT.11/RW.8, Jatinegara, Kec. Cakung, Kota Jakarta
          Timur, Daerah Khusus Ibukota Jakarta 13930
        </Text>
        <Divider style={styles.divider} />
        <Text style={styles.info}>
          Ref : U910-203-2409Z5H9 Kasir : RR. ENIS
        </Text>
        <Divider style={styles.divider} />

        {routeParams.carts.map((row, i) => (
          <View style={styles.itemContainer} key={i}>
            <Text style={styles.item}>{row.title}</Text>
            <Text style={styles.qty}>{row.quantity}</Text>
            <Text style={styles.price}>Rp. {row.price}</Text>
          </View>
        ))}

        <Divider style={styles.divider} />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalPrice}>Rp. {routeParams.data.total}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Dikson.</Text>
          <Text style={styles.totalPrice}>{routeParams.data.diskon}%</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Tagihan</Text>
          <Text style={styles.totalPrice}>Rp. {routeParams.data.tagihan}</Text>
        </View>
        <Divider style={styles.divider} />
        <Text style={styles.footer}>
          Tgl. {moment().format('DD-MM-YYYY HH:MM:SSS')} V.2023.7.1
        </Text>
      </View>
      <Button title="CETAK" color="#ffaa20" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20
  },
  address: {
    fontSize: 12,
    textAlign: 'center',
  },
  divider: {
    marginVertical: 10,
  },
  info: {
    fontSize: 12,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    fontSize: 14,
    width: '30%',
  },
  qty: {
    fontSize: 14,
    textAlign: 'right',
  },
  price: {
    fontSize: 14,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  totalText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 14,
  },
  footer: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  txtTest: {
    backgroundColor: 'blue',
  },
});

export default ExportPdf;
