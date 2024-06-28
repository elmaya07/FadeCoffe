import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {List} from 'react-native-paper';
import {getMeja} from '../services/produk';
import {useDispatch} from 'react-redux';
import {setMeja, setNamaMeja} from '../app/features/cart/cartSlice';

const ViewMeja = () => {
  const [mejaData, setMejaData] = useState([]);

  const dispatch = useDispatch();

  const fetchMeja = async () => {
    const response = await getMeja({cari: '', page: 1, limit: 8});
    // console.log(response, 'resssr')
    setMejaData(response.data);
  };

  useEffect(() => {
    fetchMeja();
  }, []);

  const setMejaFunc = row => {
    if (row.kapasitas > 0) {
      dispatch(setMeja(row.id));
      dispatch(setNamaMeja(row.nama_meja));
    }
  };

  return (
    <View style={styles.container}>
      <List.Section>
        {mejaData?.data?.map(item => (
          <List.Item
            key={item.id}
            title={`${item.nama_meja} - ${
              item.status == 'aktif' ? 'Kosong' : 'Terisi'
            }`}
            description={`Kapasitas: ${item.kapasitas}`}
            left={() => <List.Icon icon="table" />}
            right={() => (
              <TouchableOpacity onPress={() => setMejaFunc(item)}>
                <List.Icon icon="chevron-right" />
              </TouchableOpacity>
            )}
          />
        ))}
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});

export default ViewMeja;
