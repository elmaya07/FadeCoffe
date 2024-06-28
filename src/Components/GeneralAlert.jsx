import React, {useEffect, useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

const GeneralAlert = ({
  alertAction,
  setAlertAction,
  config,
  printFunc,
  pos,
}) => {
  const [showAlert, setShowAlert] = useState(false);

  const showCustomAlert = () => {
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
    setAlertAction(false);
  };

  const printData = () => {
    setShowAlert(false);
    setAlertAction(false);
    printFunc();
  };

  useEffect(() => {
    setShowAlert(alertAction);
  }, [alertAction]);

  return (
    <AwesomeAlert
      show={showAlert}
      showProgress={false}
      title={config?.title || 'Sukses'}
      message={config?.message || 'Transaksi Berhasil'}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={pos}
      cancelText="Tutup"
      confirmText="Print"
      confirmButtonColor="green"
      onCancelPressed={hideAlert}
      onConfirmPressed={printData}
    />
  );
};

export default GeneralAlert;
