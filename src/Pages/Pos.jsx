import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import PosHeader from '../Components/PosHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Modal, Portal, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {removeCart, setCart, setMeja} from '../app/features/cart/cartSlice';
import {getProduk} from '../services/produk';
import Paginator from '../Components/Paginator';
import ViewMeja from '../Partials/ViewMeja';

const containerStyle = {
  backgroundColor: 'white',
  padding: 20,
  margin: 50,
  borderRadius: 10,
};

export default function Pos({navigation}) {
  const [params, setParams] = React.useState({
    cari: '',
    page: 1,
    limit: 5,
  });

  const [productList, setProductList] = React.useState([]);
  const [item, setItem] = React.useState({});

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const dispatch = useDispatch();
  const {meja, namaMeja} = useSelector(store => store.pos);

  const incrementQuantity = qty => {
    setItem(p => ({...p, quantity: qty + 1}));
  };

  const decrementQuantity = qty => {
    setItem(p => ({...p, quantity: qty > 0 ? qty - 1 : 0}));
  };

  const setItemFunc = row => {
    showModal();
    setItem(p => ({...row, quantity: 1}));
  };

  const addItem = () => {
    const product = {
      id: item.id,
      title: item.name,
      price: item.price,
      quantity: item.quantity,
    };
    dispatch(setCart(product));
    hideModal();
  };

  const fetchProduk = async params => {
    const response = await getProduk(params);
    setProductList({
      ...response.data,
      data: response?.data?.data.map(val => ({
        id: val?.id,
        name: val?.nama,
        price: val?.harga,
        stock: val?.stok,
        image: val?.gambar,
        quantity: 0,
      })),
    });
  };
  React.useEffect(() => {
    // fetchProduk();
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => setItemFunc(item)}>
      <Image
        source={require('../../assets/images/produk-2.png')}
        style={{width: 35, height: 35}}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>Rp. {item.price}</Text>
        <Text style={styles.stock}>Stok: {item.stock}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <PosHeader
        title={meja > 0 ? 'ORDER' : 'PILIH MEJA'}
        navigation={navigation}
        setCari={data => fetchProduk({cari: data, page: 1, limit: 5})}
      />
      <View
        style={{...styles.container, display: meja == 0 ? 'none' : 'block'}}>
        <TouchableOpacity
          style={{backgroundColor: 'whitesmoke'}}
          onPress={() => dispatch(setMeja(0))}>
          <Text
            style={{
              color: 'orange',
              fontWeight: 'bold',
              marginBottom: 7,
              marginHorizontal: 10,
            }}>
           Meja: {namaMeja} / Ganti Meja
          </Text>
        </TouchableOpacity>
        <FlatList
          data={productList.data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>

      {meja > 0 ? (
        <Paginator
          setPageComponent={data =>
            fetchProduk({cari: '', page: data + 1, limit: 5})
          }
          totalRows={productList.totalRows}
        />
      ) : (
        <ViewMeja />
      )}

      <View
        style={{
          height: 20,
          backgroundColor: 'white',
          display: meja == 0 ? 'none' : 'block',
        }}
      />

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => decrementQuantity(item.quantity)}>
              <AntDesign name="minuscircleo" size={30} color="red" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => incrementQuantity(item.quantity)}>
              <AntDesign name="pluscircleo" size={30} color="green" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalFooter}>
            <Button icon="check" mode="contained" onPress={addItem}>
              Tambahkan Produk
            </Button>
          </View>
        </Modal>
      </Portal>
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
