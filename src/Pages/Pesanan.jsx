import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../Components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Modal, Portal, Button, DataTable} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {removeCart, setCart} from '../app/features/cart/cartSlice';
import {getProduk} from '../services/produk';
import {getPesanan} from '../services/pesanan';
import moment from 'moment';
import Paginator from '../Components/Paginator';
import {setUpdate} from '../app/features/counter/counterSlice';
import PDFViewer from '../Components/PDFViewer';

export default function Pesanan({navigation}) {
  const [pesananLists, setPesananList] = React.useState([]);
  const [view, setView] = React.useState(1);

  const {update} = useSelector(store => store.counter);
  const dispatch = useDispatch();

  const fetchPesanan = async params => {
    const response = await getPesanan(params);
    setPesananList(response?.data);
  };
  React.useEffect(() => {
    fetchPesanan({cari: '', page: 1, limit: 8});
  }, []);

  React.useEffect(() => {
    console.log(update, 'ip pes');
    if (update == 1) {
      fetchPesanan({cari: '', page: 1, limit: 8});
    }
    setTimeout(() => {
      dispatch(setUpdate(0));
    }, 5000);
  }, [update]);

  const renderItem = ({item}) => (
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
        onPress={() => navigation.navigate('DetailPesanan', item)}>
        <AntDesign name="eye" size={20} style={{marginRight: 20}} />
      </TouchableOpacity>
    </View>
  );

  const {PDFurl} = useSelector(store => store.counter);

  React.useEffect(() => {
    if (PDFurl != '') {
      setView(2);
    }
  }, [PDFurl]);
  return (
    <View style={{flex: 1}}>
      <Header title={'PESANAN'} navigation={navigation} />
      {[1].includes(view) ? (
        <View style={styles.container}>
          <FlatList
            data={pesananLists.data}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      ) : (
        <PDFViewer uri={PDFurl} />
      )}
      {[1].includes(view) && (
        <Paginator
          setPageComponent={data =>
            fetchPesanan({cari: '', page: data + 1, limit: 8})
          }
          totalRows={pesananLists.totalRows}
        />
      )}

      <View style={{height: 20, backgroundColor: 'white'}} />
    </View>
  );
}

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
