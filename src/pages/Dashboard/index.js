import React from 'react';

// import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  Container,
  List,
  SelectDateContainer,
  SelectedDate,
  Loading,
} from './styles';
// import { List } from '../Subscriptions/styles';

export default function Dashboard() {
  return (
    <Background>
      <Header />
      <Container>
        <SelectDateContainer>
          <TouchableOpacity>
            <Icon name="keyboard-arrow-left" size={30} color="fff" />
          </TouchableOpacity>
          <SelectedDate>{dateFormatted}</SelectedDate>
          <TouchableOpacity onPress={handleNextDat}>
            <Icon name="keyboard-arrow-right" size={30} color="#fff" />
          </TouchableOpacity>
        </SelectDateContainer>
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          showsVerticalSchollIndicator={false}
          onRefresh={refreshlist}
          refreshing={refreshing}
          ListFooterComponent={loading && <Loading />}
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
  // tabBarIcon: ({ tintColor }) => (
  // <Icon name="format-list-bulleted" size={20} color={tintColor} />
  // );
};

// import React, { useState, useMemo, useEffect } from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { TouchableOpacity, Alert } from 'react-native';
// import { format, subDays, addDays } from 'date-fns';
// import pt from 'date-fns/locale/pt';
// import { withNavigationFocus } from 'react-navigation';
// import Toast from 'react-native-root-toast';
// import PropTypes from 'prop-types';

// import api from '~/services/api';

// import Meetup from '~/Components/Meetup';
// import Header from '~/Components/Header';
// import Background from '~/Components/Background';

// import {
//   Container,
//   List,
//   SelectDateContainer,
//   SelectedDate,
//   Loading,
// } from './styles';

// function Dashboard({ isFocused }) {
//   const [meetups, setMeetups] = useState([]);
//   const [date, setDate] = useState(new Date());
//   const [page, setPage] = useState(1);
//   const [pagination, setPagination] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   const dateFormatted = useMemo(
//     () => format(date, "d 'de' MMMM", { locale: pt }),
//     [date]
//   );

//   async function loadMeetups(pageNumber = 1, isRefresh = true) {
//     try {
//       if (loading) return;

//       setLoading(true);

//       const response = await api.get('meetups', {
//         params: { date, page: pageNumber },
//       });

//       const { docs, ...docsInfo } = response.data;

//       setMeetups(isRefresh ? docs : [...meetups, ...docs]);
//       setPage(pageNumber);
//       setPagination(docsInfo);
//     } catch (err) {
//       Alert.alert(
//         'Erro!',
//         err.response.data.error || 'Erro ao carregar os Meetups!'
//       );
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function refreshList() {
//     setRefreshing(true);

//     await loadMeetups();

//     setRefreshing(false);
//   }

//   useEffect(() => {
//     if (isFocused) {
//       loadMeetups();
//     }
//   }, [isFocused, date]);

//   function handlePrevDay() {
//     setDate(subDays(date, 1));
//   }

//   function handleNextDay() {
//     setDate(addDays(date, 1));
//   }

//   function handleLoadMore() {
//     if (page === pagination.pages) return;

//     const pageNumber = page + 1;

//     loadMeetups(pageNumber, false);
//   }

//   async function handleSubscription(id) {
//     try {
//       await api.post(`/subscriptions/${id}`);

//       Toast.show('Inscrição realizada com Sucesso!', {
//         duration: Toast.durations.SHORT,
//         position: Toast.positions.BOTTOM,
//         shadow: true,
//         hideOnPress: true,
//         animation: true,
//       });
//     } catch (err) {
//       Alert.alert(
//         'Erro!',
//         err.response.data.error || 'Erro ao realizar Inscrição!'
//       );
//     }
//   }

//   return (
//     <Background>
//       <Header />
//       <Container>
//         <SelectDateContainer>
//           <TouchableOpacity onPress={handlePrevDay}>
//             <Icon name="keyboard-arrow-left" size={30} color="#fff" />
//           </TouchableOpacity>
//           <SelectedDate>{dateFormatted}</SelectedDate>
//           <TouchableOpacity onPress={handleNextDay}>
//             <Icon name="keyboard-arrow-right" size={30} color="#fff" />
//           </TouchableOpacity>
//         </SelectDateContainer>
//         <List
//           data={meetups}
//           keyExtractor={item => String(item.id)}
//           onEndReached={handleLoadMore}
//           onEndReachedThreshold={0.1}
//           showsVerticalScrollIndicator={false}
//           onRefresh={refreshList}
//           refreshing={refreshing}
//           ListFooterComponent={loading && <Loading />}
//           renderItem={({ item }) => (
//             <Meetup
//               handle={() => handleSubscription(item.id)}
//               data={item}
//               type="meetups"
//             />
//           )}
//         />
//       </Container>
//     </Background>
//   );
// }

// Dashboard.navigationOptions = {
//   tabBarLabel: 'Meetups',
//   // tabBarIcon: ({ tintColor }) => (
//   // <Icon name="format-list-bulleted" size={20} color={tintColor} />
//   // );
// };

// Dashboard.propTypes = {
//   isFocused: PropTypes.bool.isRequired,
// };

// export default withNavigationFocus(Dashboard);
