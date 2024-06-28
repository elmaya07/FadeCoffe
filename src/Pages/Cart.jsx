/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import PosHeader from '../Components/Header';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useDispatch, useSelector} from 'react-redux';
import {
  decrementCart,
  deleteCart,
  incrementCart,
  removeCart,
  setMeja,
  setNamaMeja,
} from '../app/features/cart/cartSlice';
import {
  Modal,
  Portal,
  Button as Btn,
  TextInput,
  Switch,
  Snackbar,
} from 'react-native-paper';
import CashOptionsComponent from '../Components/CashOptionsComponent';
import {formatCurrency} from '../helpers/mobile';
import {createPesanan} from '../services/pesanan';
import GeneralAlert from '../Components/GeneralAlert';
import {setUpdate} from '../app/features/counter/counterSlice';

const {width, height} = Dimensions.get('window');

const containerStyle = {
  backgroundColor: 'white',
  padding: 20,
  margin: 10,
  height: height - 50,
  // borderRadius: 10,
};

export default function Cart({navigation}) {
  const [productList, setProductList] = React.useState([]);
  const [data, setData] = React.useState({});
  const [alertAction, setAlertAction] = React.useState(false);
  const [visibleSnack, setVisibleSnack] = React.useState(false);
  const onToggleSnackBar = () => setVisibleSnack(!visibleSnack);
  const onDismissSnackBar = () => setVisibleSnack(false);

  const [dataPos, setDataPos] = React.useState(null);

  const [visible, setVisible] = React.useState(false);

  const [isPos, setIsPos] = React.useState(true);

  const showModal = () => setVisible(true);
  const hideModal = (payload = null, pos = true) => {
    setAlertAction(true);
    setVisible(false);
    setIsPos(pos);
    if (payload != null) {
      setDataPos(payload);
    }
  };

  const dispatch = useDispatch();
  const {carts} = useSelector(store => store.pos);

  const getCartTotal = carts => {
    let total = 0;
    if (carts.length > 0) {
      carts.forEach((val, key) => {
        total += val.price * val.quantity;
      });
    }
    setData(p => ({...p, total}));
  };

  React.useEffect(() => {
    setProductList(carts);
    getCartTotal(carts);
  }, [carts]);

  const incrementQuantity = id => {
    setProductList(prevState =>
      prevState.map(product =>
        product.id === id
          ? {...product, quantity: product.quantity + 1}
          : product,
      ),
    );
    dispatch(incrementCart(id));
  };

  const decrementQuantity = id => {
    setProductList(prevState =>
      prevState.map(product =>
        product.id === id && product.quantity > 0
          ? {...product, quantity: product.quantity - 1}
          : product,
      ),
    );
    dispatch(decrementCart(id));
  };

  const delCart = id => dispatch(deleteCart(id));

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image
        source={require('../../assets/images/produk-2.png')}
        style={{width: 35, height: 35}}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.price}>Rp. {item.price}</Text>
        <Text style={styles.stock}>Stok: {item.stock}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decrementQuantity(item.id)}>
            <FontAwesome6 name="minus" size={20} color="red" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => incrementQuantity(item.id)}>
            <FontAwesome6 name="plus" size={20} color="green" />
          </TouchableOpacity>
        </View>
      </View>
      <FontAwesome6
        name="trash"
        style={{marginRight: 20}}
        size={20}
        color="red"
        onPress={() => delCart(item.id)}
      />
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <PosHeader title={'POS'} />
      <View style={styles.container}>
        {carts.length > 0 ? (
          <FlatList
            data={productList}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        ) : (
          <Text>Keranjang Kosong</Text>
        )}
        <View
          style={{
            position: 'absolute',
            bottom: 30,
            marginHorizontal: '10%',
            width: '80%',
            borderRadius: 50,
          }}>
          {carts.length > 0 && (
            <Button title="Bayar" onPress={showModal} color="#ffaa20" />
          )}
        </View>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Bayar
            tutupModal={(data, showmodal) => hideModal(data, showmodal)}
            data={data}
          />
        </Modal>
      </Portal>
      {[true].includes(isPos) && (
        <GeneralAlert
          pos={isPos}
          alertAction={alertAction}
          setAlertAction={b => setAlertAction(false)}
          printFunc={() => navigation.navigate('ExportPdf', dataPos)}
        />
      )}

      <Snackbar
        visible={visibleSnack}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Ok',
          onPress: () => hideModal(),
        }}>
        Pesanan berhasil di buat
      </Snackbar>
    </View>
  );
}

const Bayar = ({tutupModal, data}) => {
  const [visibleSnack, setVisibleSnack] = React.useState(false);
  const onToggleSnackBar = () => setVisibleSnack(!visibleSnack);
  const onDismissSnackBar = () => setVisibleSnack(false);
  const [disabledButton, setDisabledButton] = React.useState(false);

  const {carts, meja} = useSelector(store => store.pos);
  const auth = useSelector(store => store.auth);
  // React.useEffect(() => {
  //   console.log(auth, 'auth');
  // }, [auth]);

  const [formData, setFormData] = React.useState({
    diskon: '0',
    total: '0',
    key: 1,
    tagihan: 0,
    jumlahBayar: '0',
    id_pelanggan: 0, //JSON.parse(auth?.user)?.user?.id || 0,
    id_meja: meja || 0,
  });
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setFormData(p => ({...p, id_meja: meja}));
  }, [meja]);
  const setDiskon = e => {
    let t = data?.total;
    let d = e || 0;
    setFormData(p => {
      let hdiskon = (p.total * d) / 100;
      let proc = {...p, diskon: d, tagihan: t - hdiskon};
      return proc;
    });
  };

  React.useEffect(() => {
    setFormData(p => ({...p, ...data, tagihan: data?.total}));
  }, [data]);

  const setBayar = async () => {
    setDisabledButton(true);
    try {
      const storeData = {
        data: formData,
        carts: carts,
      };
      const response = await createPesanan(storeData);
      if (response.data.status == true) {
        setTimeout(() => {
          tutupModal(storeData, true);
        }, 1000);
        dispatch(removeCart());
        dispatch(setMeja(0));
        dispatch(setUpdate(1));
        dispatch(setNamaMeja(''));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-around',
        }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
        <View
          style={{
            flex: 1,
            position: 'relative',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>Total</Text>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            Rp. {formatCurrency(formData?.total)}
          </Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 10,
              marginTop: 20,
            }}>
            <Text>Diskon</Text>
            <Switch
              value={isSwitchOn}
              onValueChange={e => {
                onToggleSwitch(e);
                if (e == true) {
                  setFormData(p => ({...p, tagihan: p.total}));
                } else {
                  setFormData(p => ({...p, diskon: 0}));
                }
              }}
            />
          </View>

          <View
            style={{
              paddingTop: 10,
              paddingHorizontal: 5,
              display: isSwitchOn ? 'flex' : 'none',
            }}>
            <TextInput
              mode="outlined"
              label="Diskon"
              onChangeText={setDiskon}
              defaultValue={String(formData?.diskon)}
              // right={<TextInput.Icon name="file-percent-outline" />}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 5,
              marginTop: 10,
              display: isSwitchOn ? 'flex' : 'none',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 14}}>
              Total Tagihan
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>
              Rp. {formatCurrency(formData?.tagihan)} - (
              {formatCurrency(formData?.total)} x {formData?.diskon} / 100)
            </Text>
          </View>

          <CashOptionsComponent
            total={formData?.total}
            setJumlah={data => {
              setFormData(prev => ({
                ...prev,
                jumlahBayar: data,
                key: parseInt(prev.key) + 1,
              }));
            }}
          />

          <View style={{marginTop: 10, paddingHorizontal: 5}}>
            <TextInput
              mode="outlined"
              label="Input Manual Jumlah Bayar"
              onChangeText={e => setFormData(p => ({...p, jumlahBayar: e}))}
              value={String(formData?.jumlahBayar)}
              // key={formData?.key}
              // right={<TextInput.Icon name="currency-usd" />}
            />
          </View>

          <View
            style={{
              paddingHorizontal: 5,
              marginTop: 10,
              // display: isSwitchOn ? 'flex' : 'none',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 14}}>Uang Kembali</Text>
            <Text style={{fontWeight: 'bold', fontSize: 25}}>
              Rp.{' '}
              {formData?.tagihan <= formData?.jumlahBayar
                ? formatCurrency(
                    Math.abs(formData?.jumlahBayar - formData?.tagihan),
                  )
                : 0}
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
              marginTop: 20,
            }}>
            <View
              style={{
                // position: 'absolute',
                left: 1,
                // bottom: 1,
                width: width / 2 - 50,
                borderRightColor: 'white',
                borderRightWidth: 1,
              }}>
              <Button
                title="Tutup"
                onPress={() => tutupModal(null, false)}
                color={'red'}
                disabled={disabledButton}
              />
            </View>
            <View
              style={{
                // position: 'absolute',
                right: 1,
                // bottom: 1,
                width: width / 2 - 50,
              }}>
              <Button
                title="Bayar"
                color={'green'}
                disabled={
                  formData?.tagihan > formData?.jumlahBayar ||
                  formData?.total > formData?.jumlahBayar ||
                  disabledButton
                }
                onPress={setBayar}
              />
            </View>
          </View>
        </View>

        <Snackbar
          visible={visibleSnack}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Ok',
            onPress: () => tutupModal(),
          }}>
          Pesanan berhasil di buat
        </Snackbar>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

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
    marginTop: 5,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
});
