import * as React from 'react';
import {View} from 'react-native';
import {Appbar, Searchbar} from 'react-native-paper';
import ModalLogout from './ModalLogout';
const PosHeader = ({navigation, title, setCari}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showSearch, setShowSearch] = React.useState(false);
  const [action, setAction] = React.useState(false);

  const _handleSearch = () => setShowSearch(p => !p);

  const _handleMore = () => setAction(true);

  const _goBack = () => navigation.goBack();

  React.useEffect(() => {
    setCari(searchQuery);
  }, [searchQuery]);

  return (
    <View style={{width: '100%'}}>
      <Appbar.Header style={{backgroundColor: '#ffaa20'}}>
        <Appbar.BackAction color="#fff" onPress={_goBack} />
        <Appbar.Content title={title} color="#fff" />
        {title == 'ORDER' ? (
          <Appbar.Action icon="magnify" color="#fff" onPress={_handleSearch} />
        ) : (
          <View />
        )}
        <Appbar.Action icon="dots-vertical" color="#fff" onPress={_handleMore} />
      </Appbar.Header>
      <View
        style={{
          paddingHorizontal: 10,
          marginTop: 10,
          display: showSearch == false ? 'none' : 'flex',
          justifyContent: 'center',
        }}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          clearIcon={true}
        />
      </View>

      <ModalLogout action={action} setAction={data => setAction(data)} />
    </View>
  );
};

export default PosHeader;
