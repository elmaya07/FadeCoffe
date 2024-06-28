import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import PosHeader from '../Components/Header';
import Laporan from '../Components/Laporan';

export default function LaporanView({navigation}) {
  return (
    <View style={{flex: 1}}>
      <PosHeader title={'LAPORAN'} navigation={navigation} />
      <View style={{backgroundColor: 'white',marginTop: 10,padding: 10}}>
        <Text style={{fontWeight: 'bold',marginBottom: 20}}>Laporan Pendapatan</Text>
        <Laporan />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
