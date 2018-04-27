import React from 'react';
import { FlatList, TouchableOpacity, Image } from 'react-native';
import { Right, Icon, Button, Left, Body, Thumbnail, Container, Content, Text, Card, CardItem, View } from 'native-base';
// import { Actions } from 'react-native-router-flux';

import PropTypes from 'prop-types';

const AuctionList = ({
  auctions,
}) => (
  <Container>
    <Content>
      <FlatList
        numColumns={1}
        data={auctions}
        renderItem={({ item }) => (
          <Card>
            <CardItem cardBody>
              <Left>
                <Thumbnail source={{ uri: item.image }} />
                <Body>
                  <Text>{item.key}</Text>
                </Body>
              </Left>
              <TouchableOpacity style={{ flex: 1 }}>
                <Image source={{ uri: item.image }} aspectRatio={100} style={{ height: 100, width: null, flex: 1 }} />
                <View style={{ flex: 1, height: 30 }} />
                <Text style={{ fontWeight: '800' }}>{item.key}</Text>
              </TouchableOpacity>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
        )}
      />
    </Content>
  </Container>
);


AuctionList.propTypes = {
  auctions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default AuctionList;
