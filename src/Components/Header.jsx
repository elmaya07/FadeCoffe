import * as React from 'react';
import {Appbar, Text} from 'react-native-paper';
import ModalLogout from './ModalLogout';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {Alert, Platform, View} from 'react-native';
import axios from 'axios';
import {resetPesanan} from '../services/pesanan';
import {useDispatch, useSelector} from 'react-redux';
import {setUpdate, setUrl} from '../app/features/counter/counterSlice';

const Header = ({title, navigation}) => {
  const [action, setAction] = React.useState(false);
  const {update} = useSelector(store => store.counter);
  const dispatch = useDispatch();
  const _goBack = () =>{
    dispatch(setUrl(''));
    navigation.goBack();
  } 

  const _handleMore = () => setAction(true);

  const cetakPesanan = async () => {
    const url = 'https://menu.pmbistiqomah.cloud/public/api/pesanan/export';
    const res = await axios.get(url);
    // console.log(res,' rt')
    try {
      let PDFOptions = {
        html: res.data,
        fileName: 'file',
        directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
      };

      let file = await RNHTMLtoPDF.convert(PDFOptions);
      Alert.alert(file.filePath);
      dispatch(setUrl(url));
      if (!file.filePath) {
        return;
      }
    } catch (error) {
      console.log('Failed to generate pdf', error.message);
    }
  };

  const resetPesananFunc = async () => {
    const res = await resetPesanan();
    console.log(res.data);
    if (res?.data?.message == 'Pesanan berhasil hapus') {
      dispatch(setUpdate(1));
      Alert.alert('Pesanan berhasil di reset');
    }
  };

  return (
    <Appbar.Header style={{backgroundColor: '#ffaa20'}}>
      {['FADE COFFE', 'POS'].includes(title) ? (
        <Appbar.Action icon="coffee" color="#fff" />
      ) : (
        <Appbar.BackAction color="#fff" onPress={_goBack} />
      )}
      <Appbar.Content title={title} color="#fff" />
      {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
      {['PESANAN'].includes(title) && (
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Appbar.Action
            icon="printer"
            size={20}
            color="#fff"
            onPress={cetakPesanan}
          />
          <Appbar.Action
            icon="trash-can"
            size={20}
            color="#fff"
            onPress={resetPesananFunc}
          />
        </View>
      )}
      <Appbar.Action icon="dots-vertical" color="#fff" onPress={_handleMore} />
      <ModalLogout action={action} setAction={data => setAction(data)} />
    </Appbar.Header>
  );
};

export default Header;
