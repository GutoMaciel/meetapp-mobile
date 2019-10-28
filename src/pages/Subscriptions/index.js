import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import PropTypes from 'prop-types';
// import { format, subDays, addDays } from 'date-fns';
// import pt from 'date-fns/locale/pt';
import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { Container, List, Title } from './styles';

Icon.loadFont();

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    async function loadSubscriptions() {
      const response = await api.get('subscriptions');

      setSubscriptions(response.data);
    }

    loadSubscriptions();
  }, []);

  async function handleCancel(id) {
    try {
      await api.delete(`meetups/${id}/subscriptions`);

      setSubscriptions(subscriptions.filter(s => s.id !== id));
    } catch (err) {
      Alert.alert('Error', err.response.data.error || 'Try again');
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
              handle={handleCancel}
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

// import React, { useState, useEffect } from 'react';
// import { Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { withNavigationFocus } from 'react-navigation';
// import Toast from 'react-native-root-toast';
// import PropTypes from 'prop-types';

// import api from '~/services/api';

// import Meetup from '~/Components/Meetup';
// import Background from '~/Components/Background';
// import Header from '~/Components/Header';

// import { Container, List, Loading } from './styles';

// function Subscriptions({ isFocused }) {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [loading, setLoading] = useState(false);

//   async function loadSubscriptions() {
//     try {
//       if (loading) return;

//       setLoading(true);

//       const response = await api.get('subscriptions');

//       setSubscriptions(response.data);
//     } catch (err) {
//       Alert.alert(
//         'Erro!',
//         err.response.data.error || 'Erro ao carregar as Inscrições!'
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function refreshList() {
//     setRefreshing(true);

//     await loadSubscriptions();

//     setRefreshing(false);
//   }

//   useEffect(() => {
//     if (isFocused) {
//       loadSubscriptions();
//     }
//   }, [isFocused]);

//   async function handleCancel(id) {
//     try {
//       await api.delete(`/subscriptions/${id}`);

//       setSubscriptions(subscriptions.filter(s => s.id !== id));

//       Toast.show('Inscrição Cancelada com Sucesso!', {
//         duration: Toast.durations.SHORT,
//         position: Toast.positions.BOTTOM,
//         shadow: true,
//         hideOnPress: true,
//         animation: true,
//       });
//     } catch (err) {
//       Alert.alert(
//         'Erro!',
//         err.response.data.error || 'Erro ao cancelar Inscrição'
//       );
//     }
//   }

//   return (
//     <Background>
//       <Header />
//       <Container>
//         <List
//           data={subscriptions}
//           keyExtractor={item => String(item.id)}
//           showsVerticalScrollIndicator={false}
//           onRefresh={refreshList}
//           refreshing={refreshing}
//           ListFooterComponent={loading && <Loading />}
//           renderItem={({ item }) => (
//             <Meetup
//               handle={() => handleCancel(item.id)}
//               data={item.meetup}
//               type="subscriptions"
//             />
//           )}
//         />
//       </Container>
//     </Background>
//   );
// }

// Subscriptions.navigationOptions = {
//   tabBarLabel: 'Subscriptions',
//   tabBarIcon: ({ tintColor }) => (
//     <Icon name="local-offer" size={20} color={tintColor} />
//   ),
// };

// Subscriptions.propTypes = {
//   isFocused: PropTypes.bool.isRequired,
// };

// export default withNavigationFocus(Subscriptions);
