import React from 'react';
import { FlatList } from 'react-native';
import {
  Fab,
  Right,
  Icon,
  Button,
  Left,
  Body,
  Thumbnail,
  Container,
  Content,
  Text,
  Card,
  CardItem,
  View
} from 'native-base';
// import { Actions } from 'react-native-router-flux';

import PropTypes from 'prop-types';

const AuctionList = ({ auctions, fabstatus, toggleFAB, adoptPet }) => (
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
                  <Text>Name: {item.name}</Text>
                  <Text>Age: {item.age}</Text>
                  <Text>Breed: {item.breed}</Text>
                  <Text>Location: {item.location}</Text>
                </Body>
              </Left>
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
                <Button disabled={item.adopted} onPress={() => adoptPet(parseInt(item.key, 10))}>
                  <Icon active name="logo-bitcoin" />
                  <Text>{item.adopted ? 'adopted' : 'adopt'}</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        )}
        keyExtractor={item => item.key}
      />
    </Content>
    <View>
      <Fab
        active={fabstatus}
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: '#5067FF' }}
        position="bottomRight"
        onPress={() => toggleFAB()}
      >
        <Icon name="share" />
        <Button style={{ backgroundColor: '#34A34F' }}>
          <Icon name="logo-whatsapp" />
        </Button>
        <Button style={{ backgroundColor: '#3B5998' }}>
          <Icon name="logo-facebook" />
        </Button>
        <Button disabled style={{ backgroundColor: '#DD5144' }}>
          <Icon name="mail" />
        </Button>
      </Fab>
    </View>
  </Container>
);

AuctionList.propTypes = {
  auctions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  fabstatus: PropTypes.bool.isRequired,
  toggleFAB: PropTypes.func.isRequired,
  adoptPet: PropTypes.func.isRequired
};

export default AuctionList;
