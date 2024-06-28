import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import PosHeader from '../Components/Header';
import {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function DetailPesanan({navigation}) {
  const route = useRoute();
  const item = route.params;
  useEffect(() => {
    console.log(item);
  }, [item]);

  return (
    <View style={{flex: 1}}>
      <PosHeader title={'DETAIL PESANAN'} navigation={navigation} />
      <RenderItem item={item} navigation={navigation} />
      <View style={{paddingHorizontal: 20, paddingTop: 20}}>
        <Text style={{fontWeight: 'bold'}}>Detail</Text>
      </View>
      {item.detail_pesanan?.map((row, i) => (
        <View
          key={i}
          style={{
            marginBottom: 10,
            // paddingHorizontal: 20,
            marginHorizontal: 20,
            width: Dimensions.get('window').width,
            // display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: 20,
            // backgroundColor: 'red'
          }}>
          <View
            style={{
              width: Dimensions.get('window').width / 2,
            }}>
            <Text>
              {i + 1}. {row.menu}
            </Text>
          </View>
          <Text>{row.jumlah}</Text>
          <Text>Rp. {row.harga}</Text>
        </View>
      ))}
    </View>
  );
}

const RenderItem = ({item, navigation}) => (
  <View style={styles.itemContainer}>
    <View style={styles.details}>
      <Text style={styles.name}>{item.no_pesanan}</Text>
      <Text style={styles.price}>
        {moment(item.tanggal).format('ddd, DD-MM-YYYY')}
      </Text>
      <Text style={styles.stock}>
        Jumlah Item: {item.detail_pesanan?.length}
      </Text>
    </View>
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ExportPdf', {
          data: item,
          carts: item?.detail_pesanan?.map(val => ({
            title: val?.menu,
            price: val?.harga,
            qty: val?.jumlah,
          })),
        })
      }>
      <AntDesign name="printer" size={25} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: 'gray',
  },
  stock: {
    fontSize: 14,
    color: 'gray',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  modalFooter: {
    paddingTop: 40,
  },
});
