import React from 'react';
import { Container, Content, Text } from 'native-base';
import Bla from '../../blockchain/eth.android'

const AccountInfo = () => (
  <Container>
    <Content padder>
      <Text>Username </Text>
      <Text>CurrentInAuction </Text>
      <Text>Address </Text>
      <Bla />
    </Content>
  </Container>
);

export default AccountInfo;
