import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {Button, StyleSheet, TouchableOpacity} from 'react-native';
import {Dialog, Portal, Text} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {setAuth} from '../app/features/auth/authSlice';

const ModalLogout = ({action, setAction}) => {
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();
  const hideDialog = () => {
    setAction(false);
    setVisible(false);
  };

  React.useEffect(() => {
    setVisible(action);
  }, [action]);

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      dispatch(
        setAuth({
          isAuth: 0,
          user: null,
        }))
    } catch (error) {}
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Icon icon="logout" />
        <Dialog.Content style={{display: 'flex', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={logout}
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <Text style={{fontWeight: 'bold'}}>Logout</Text>
          </TouchableOpacity>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
});

export default ModalLogout;
