import {View, Text, Image} from 'react-native';

export default function SplashScreen() {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <Image
        source={require('../../assets/logo/logo.png')}
        style={{width: 100, height: 100}}
      />
    </View>
  );
}
