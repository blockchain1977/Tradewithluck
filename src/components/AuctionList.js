import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Card, CardItem, Body, View } from 'native-base';

export default class AuctionList extends React.Component {

  onPress = {};

  render() {
    return (
      <Container>
        <Content>
       <FlatList
          numColumns={1}
          data={[{key: 'Wawawa'}, {key: 'Gagaga'}]}
          renderItem={({item}) => (
          <Card>
            <CardItem cardBody>
              <TouchableOpacity onPress={() => onPress()}>
                <View style={{ flex: 1, height: 30 }} />
                <Text style={{ fontWeight: '800' }}>{item.key}</Text>
              </TouchableOpacity>
            </CardItem>
          </Card>
          )}
       />
        </Content>
      </Container>
    );
  }
}