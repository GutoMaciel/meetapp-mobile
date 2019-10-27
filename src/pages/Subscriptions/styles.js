import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})``;

// export const Loading = styled.ActivityIndicator.attrs({
//   size: 'small',
//   color: '#999',
// })`
//   margin: 30px 0;
// `;

export const Inscricao = styled.Text`
  font-size: 14px;
  color: #fff;
`;
