import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Header from '../Components/Header';
import React, {useEffect} from 'react';
import {getMeja} from '../services/produk';
import {Image} from 'react-native-svg';
import Paginator from '../Components/Paginator';
import {FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import store from '../app/store';

export default function Meja({navigation}) {
  const [productList, setProductList] = React.useState([]);

  const {update} = useSelector(store => store.counter);

  const fetchMeja = async params => {
    const response = await getMeja(params);
    console.log(response.data?.data, 'ress');
    setProductList({
      ...response.data,
      data: response?.data?.data,
    });
  };
  React.useEffect(() => {
    fetchMeja({cari: '', page: 1, limit: 8});
  }, []);

  React.useEffect(() => {
    fetchMeja({cari: '', page: 1, limit: 8});
  }, [update]);

  const onPressHandler = () => navigation.navigate('AddMeja', null);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.details}>
        <Text style={styles.name}>{item.nama_meja}</Text>
        <Text style={styles.price}>Kapasitas {item.kapasitas}</Text>
        <Text style={styles.stock}>
          Status: {item.status == 'aktif' ? 'Kosong' : 'Terisi'}
        </Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('AddMeja', item)}>
        <Feather name="edit" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <Header title={'MEJA'} navigation={navigation} />
      <View style={{...styles.container}}>
        <FlatList
          data={productList.data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <Paginator
        setPageComponent={data =>
          fetchMeja({cari: '', page: data + 1, limit: 8})
        }
        totalRows={productList.totalRows}
      />
      <FAB style={styles.fab} icon="plus" onPress={onPressHandler} />
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
    paddingRight: 30,
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 50,
  },
});
