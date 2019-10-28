import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
// import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import {
  Container,
  Banner,
  Content,
  Title,
  TimeContent,
  Time,
  LocationContent,
  Location,
  OrganizerContent,
  Organizer,
  SubscriptionButton,
} from './styles';

Icon.loadFont();

export default function Meetup({ data, handle, type }) {
  const dateFormatted = useMemo(
    () => format(parseISO(data.date), "dd',' MMMM',' HH'h'"),
    [data.date]
  );

  return (
    <Container past={data.past}>
      <Banner source={{ uri: data.File.id && data.File.url }} />
      <Content>
        <Title>{data.title}</Title>
        <TimeContent>
          <Icon name="event" size={14} color="rgba(0, 0, 0, 0.4)" />
          <Time>{dateFormatted}</Time>
        </TimeContent>
        <LocationContent>
          <Icon name="location-on" size={14} color="rgba(0, 0, 0, 0.4)" />
          <Location>{data.location}</Location>
        </LocationContent>
        <OrganizerContent>
          <Icon name="person" size={14} color="rgba(0, 0, 0, 0.4)" />
          <Organizer>{data.User.name}</Organizer>
        </OrganizerContent>
        {!data.past && (
          <SubscriptionButton onPress={handle}>
            {type === 'subscribed' ? 'Cancel' : 'Subscribe'}
          </SubscriptionButton>
        )}
      </Content>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape().isRequired,
  handle: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
