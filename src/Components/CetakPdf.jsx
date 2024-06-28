// CetakPdf.js
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Divider} from 'react-native-paper';

const CetakPdf = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Alfamart</Text>
      <Text style={styles.subHeader}>
        ALFAMART SPBU MASTRIP S / 082111211360
      </Text>
      <Text style={styles.subHeader}>PT.SUMBER ALFARIA TRIJAYA,TBK</Text>
      <Divider style={styles.divider} />
      <Text style={styles.info}>Ref : U910-203-2409Z5H9 Kasir : RR. ENIS</Text>
      <Divider style={styles.divider} />
      <View style={styles.itemContainer}>
        <Text style={styles.item}>GG SURYA 12</Text>
        <Text style={styles.qty}>1</Text>
        <Text style={styles.price}>25,500</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.item}>YAKULT 5S</Text>
        <Text style={styles.qty}>1</Text>
        <Text style={styles.price}>10,500</Text>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Item</Text>
        <Text style={styles.totalPrice}>4</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Disc.</Text>
        <Text style={styles.totalPrice}>2,100</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Belanja</Text>
        <Text style={styles.totalPrice}>51,400</Text>
      </View>
      <Divider style={styles.divider} />
      <Text style={styles.footer}>Tgl. 24-09-2023 11:23:29 V.2023.7.1</Text>
      <Text style={styles.footer}>Member : DYAH APRILIA NUGRAHENI</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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

export default CetakPdf;
