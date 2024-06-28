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
import {delProduk, tambahProduk, updateProduk} from '../../services/produk';
import {Image} from 'react-native-svg';
import GeneralAlert from '../../Components/GeneralAlert';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setUpdate} from '../../app/features/counter/counterSlice';

export default function AddMenu({navigation}) {
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [kategori, setKategori] = useState('');
  const [stok, setStok] = useState('');
  const [gambar, setGambar] = useState(null);
  const [msg, setMsg] = useState({});

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [alertAction, setAlertAction] = React.useState(false);

  const route = useRoute();
  const routeParams = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    setNama(routeParams?.name);
    setHarga(routeParams?.price);
    setKategori(routeParams?.kategori);
    setStok(routeParams?.stock);
    // setGambar(routeParams?.name);
  }, [routeParams]);

  const openGallery = async () => {
    const options = {
      mediaType: 'photo',
    };
    const result = await launchImageLibrary(options);
    setGambar(result?.assets[0]);
    console.log(result);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('nama', nama);
      formData.append('harga', harga);
      formData.append('kategori', kategori);
      formData.append('stok', stok);
      if (gambar != null) {
        formData.append('gambar', {
          uri: gambar.uri,
          type: gambar.type,
          name: gambar.fileName,
        });
      }
      let res;

      if (routeParams == null) {
        res = await tambahProduk(formData);
      } else {
        res = await updateProduk(formData, routeParams?.id);
      }
      console.log(res.data, routeParams?.id);
      if (res.status == 201) {
        setMsg({
          title: 'Sukses',
          message:
            routeParams == null
              ? 'Menu berhasil di buat'
              : 'Menu berhasil di update',
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
    const res = await delProduk(routeParams?.id);
    if (res.status == 201) {
      setMsg({title: 'Sukses', message: 'Menu berhasil di hapus'});
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
        title={routeParams == null ? 'ADD MENU' : 'EDIT MENU'}
        navigation={navigation}
      />
      <View style={{...styles.container}}>
        <TextInput
          mode="outlined"
          label="Nama"
          value={nama}
          onChangeText={text => setNama(text)}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Harga"
          value={harga}
          onChangeText={text => setHarga(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          mode="outlined"
          label="Kategori"
          value={kategori}
          onChangeText={text => setKategori(text)}
          style={styles.input}
        />
        <TextInput
          mode="outlined"
          label="Stok"
          value={stok}
          onChangeText={text => setStok(text)}
          style={styles.input}
          keyboardType="numeric"
        />
        {gambar != null && (
          <Image
            source={gambar?.uri}
            style={{
              width: 300,
              height: 300,
              marginTop: 20,
            }}
            resizeMode="cover"
          />
        )}
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

        <Button onPress={openGallery}>Pilih Gambar</Button>
        {routeParams != null && (
          <Btn
            title={loading ? 'Loading...' : 'Hapus Menu'}
            onPress={() => setShowModal(true)}
            style={styles.button}
            disabled={loading}
          />
        )}
        <View style={{marginTop: 10}} />
        <Btn
          title={loading ? 'Loading...' : 'Buat Menu'}
          onPress={handleSubmit}
          style={styles.button}
          disabled={loading}
        />
      </View>
    </View>
  );
}

export const ModalCustom = ({showModal, setShowModal, config, deleteData}) => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => {
    setShowModal(true);
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
    setShowModal(false);
  };
  useEffect(() => {
    setVisible(showModal);
  }, [showModal]);
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>{config?.title || ''}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{config?.message || ''}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Batal</Button>
          <Button onPress={deleteData}>Hapus</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

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
