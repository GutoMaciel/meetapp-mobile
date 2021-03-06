import React, { useState, useEffect, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, Alert } from 'react-native';
import { format, subDays, addDays } from 'date-fns';
// import pt from 'date-fns/locale/pt';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { Container, SelectedDate, SelectDateContainer, List } from './styles';

Icon.loadFont();

// async function loadMeetups(pageNumber = 1, isRefresh = true) {
//   try {
//     if (loading) return;

//     setLoading(true);

//     const response = await api.get('meetups', {
//       params: { date, page: pageNumber },
//     });

//     const { docs, ...docsInfo } = response.data;

//     setMeetups(isRefresh ? docs : [...meetups, ...docs]);
//     setPage(pageNumber);
//     setPagination(docsInfo);
//   } catch (err) {
//     Alert.alert(
//       'Erro!',
//       err.response.data.error || 'Erro ao carregar os Meetups!'
//     );
//   } finally {
//     setLoading(false);
//   }
// }

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const dateFormatted = useMemo(() => format(date, "d', ' MMMM"), [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }
  async function loadMeetups(pageNumber = 1) {
    const response = await api.get('meetups', {
      params: {
        date,
        page: pageNumber,
      },
    });

    setMeetups(response.data);
  }

  // useEffect(() => {

  //   loadMeetups();
  // }, [date]);

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
  }, [isFocused, date, loadMeetups]);

  async function handleSubscription(id) {
    try {
      await api.post(`meetups/${id}/subscriptions`);

      Alert.alert('Success', 'Inscrição realizada com Sucesso!');
    } catch (err) {
      Alert.alert(
        'Erro!',
        err.response.data.error || 'Erro ao realizar Inscrição!'
      );
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <SelectDateContainer>
          <TouchableOpacity>
            <Icon
              name="chevron-left"
              size={27}
              color="#fff"
              onPress={handlePrevDay}
            />
          </TouchableOpacity>
          <SelectedDate>{dateFormatted}</SelectedDate>
          <TouchableOpacity>
            <Icon
              name="chevron-right"
              size={27}
              color="#fff"
              onPress={handleNextDay}
            />
          </TouchableOpacity>
        </SelectDateContainer>

        <List
          data={meetups}
          keyExctractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              handle={() => handleSubscription(item.id)}
              data={item}
              type="meetups"
            />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
