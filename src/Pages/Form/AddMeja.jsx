import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button as Btn,
} from 'react-native';
import Header from '../../Components/Header';
import React, {useEffect, useState} from 'react';
import {
  TextInput,
  Button,
  Snackbar,
  Dialog,
  Portal,
  PaperProvider,
} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {delMeja, updateMeja, tambahMeja} from '../../services/produk';
import {Image} from 'react-native-svg';
import GeneralAlert from '../../Components/GeneralAlert';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setUpdate} from '../../app/features/counter/counterSlice';
import {ModalCustom} from './AddMenu';

export default function AddMeja({navigation}) {
  const [nama_meja, setNama] = useState('');
  const [kapasitas, setKapasitas] = useState(0);
  const [msg, setMsg] = useState({});

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [alertAction, setAlertAction] = React.useState(false);

  const route = useRoute();
  const routeParams = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    setNama(routeParams?.nama_meja);
    setKapasitas(routeParams?.kapasitas); 
  }, [routeParams]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('nama_meja', nama_meja);
      formData.append('kapasitas', kapasitas);
      let res;

      if (routeParams == null) {
        res = await tambahMeja(formData);
      } else {
        res = await updateMeja(formData, routeParams?.id);
      }
      console.log(res.data, routeParams?.id);
      if (res.status == 201) {
        setMsg({
          title: 'Sukses',
          message:
            routeParams == null
              ? 'Meja berhasil di buat'
              : 'Meja berhasil di update',
        });
        dispatch(setUpdate(1));
        setAlertAction(true);
        setTimeout(() => {
          navigation.goBack();
          dispatch(setUpdate(0));
        }, 1500);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const deleteData = async () => {
    const res = await delMeja(routeParams?.id);
    if (res.status == 201) {
      setMsg({title: 'Sukses', message: 'Meja berhasil di hapus'});
      dispatch(setUpdate(1));
      setAlertAction(true);
      setTimeout(() => {
        navigation.goBack();
        dispatch(setUpdate(0));
      }, 1500);
    }
  };

  return (
    <View style={{flex: 1, flexDirection: 'flex-start'}}>
      <Header
        title={routeParams == null ? 'ADD MEJA' : 'EDIT MEJA'}
        navigation={navigation}
      />
      <View style={{...styles.container}}>
        <TextInput
          mode="outlined"
          label="Nama Meja"
          value={nama_meja}
          onChangeText={text => setNama(text)}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Kapasitas"
          value={kapasitas}
          onChangeText={text => setKapasitas(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <GeneralAlert
          pos={false}
          alertAction={alertAction}
          setAlertAction={b => setAlertAction(false)}
          config={{title: msg?.title, message: msg?.message}}
        />

        <ModalCustom
          showModal={showModal}
          setShowModal={setShowModal}
          deleteData={deleteData}
          config={{
            title: 'Hapus',
            message: 'Yakin data ini mau di hapus?',
          }}
        />
        {routeParams != null && (
          <Btn
            title={loading ? 'Loading...' : 'Hapus Meja'}
            onPress={() => setShowModal(true)}
            style={styles.button}
            disabled={loading}
          />
        )}
        <View style={{marginTop: 10}} />
        <Btn
          title={loading ? 'Loading...' : 'Buat Meja'}
          onPress={handleSubmit}
          style={styles.button}
          disabled={loading}
        />
      </View>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 20,
  },
  input: {
    marginBottom: 5,
    // borderColor: '#d0d0d0'
  },
  button: {
    marginTop: 10,
    backgroundColor: '#ffaa20',
  },
});
