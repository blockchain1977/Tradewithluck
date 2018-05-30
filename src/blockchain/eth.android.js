import React from 'react';
import { StyleSheet, Alert, Text, Button, View, NativeModules } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default class Bla extends React.Component {
  constructor(props) {
    super(props);
    this.state = {address: ""};
  }

  componentDidMount() {
    NativeModules.RNWallet.getAddress(str => {
      this.setState({address: str});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{ this.state.address }</Text>
        <Button 
          title="button" 
          onPress={() => {
            NativeModules.RNWallet.test('Hello!', str => {
              Alert.alert(str);
            });
          }} 
        />
      </View>
    )
  }
}
