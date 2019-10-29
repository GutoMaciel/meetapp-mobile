import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import pt from 'date-fns/locale/pt';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { Container, List, Title } from './styles';

Icon.loadFont();

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);

  // useEffect(() => {

  //   loadSubscriptions();
  // }, []);

  async function loadSubscriptions() {
    const response = await api.get('subscriptions');

    setSubscriptions(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadSubscriptions();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    try {
      await api.delete(`/subscriptions/${id}`);
      Alert.alert('Success', 'You was unsubscribed of this meetup');

      // setSubscriptions(subscriptions.filter(s => s.id !== id));
    } catch (err) {
      Alert.alert('Error', 'Try later');
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <Title>My subscriptions</Title>
        <List
          data={subscriptions}
          keyExtractor={subscription => String(subscription.id)}
          renderItem={({ item }) => (
            <Meetup
              handle={() => handleCancel(item.id)}
              data={item.Meetup}
              type="subscriptions"
            />
          )}
        />
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Subscriptions',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscriptions);
