import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuth = async () => {
  try {
    const auth = await AsyncStorage.getItem('auth');
    return auth;
  } catch (e) {
    // saving error
    throw e;
  }
};

export const formatCurrency = amount => {
  // Menambahkan titik sebagai pemisah ribuan
  const formattedAmount = amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  // Mengembalikan format uang dengan menambahkan "Rp" di depan
  return formattedAmount;
};
