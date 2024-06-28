import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Switch, Text, TextInput, Button} from 'react-native-paper';

const SettingView = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [notifications, setNotifications] = React.useState(true);

  const handleSaveSettings = () => {
    // Handle saving settings logic here
    console.log('Settings saved!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.setting}>
        <Text>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
      </View>

      <View style={styles.setting}>
        <Text>Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={() => setNotifications(!notifications)}
        />
      </View>

      <Button
        mode="contained"
        onPress={handleSaveSettings}
        style={styles.button}>
        Save Settings
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default SettingView;
