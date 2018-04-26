import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Card, CardItem, View } from 'native-base';

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
              <TouchableOpacity>
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


AuctionList.propTypes = {
  auctions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default AuctionList;
