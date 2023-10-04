import React from 'react';
import {View, Text, StatusBar, FlatList} from 'react-native';
import {styled} from 'styled-components';
import CommonHeader from '../../component/Header/CommonHeader';
type DataListProps = {
  navigation: any;
  modalVisible: any;
  onCancel: any;
};
const Container = styled.View({
  flex: 1,
});
const Subcontainer = styled.View({
  flex: 1,
  // padding: 10,
});
const PaymentListScreen = ({navigation}: DataListProps) => {
  const Data = [
    {
      title: 'year',
      year: ['2023', '\n', '2021', '\n', '2023', '\n', '2032'],
    },
    {
      title: 'principle',
      amount: ['123', '\n', '215', '\n', '326', '\n', '253'],
    },
    {
      title: 'interest',
      amount: ['325', '\n', '23', '\n', '523', '\n', '231'],
    },
    {
      title: 'Part Payment',
      amount: ['612', '\n', '326', '\n', '523', '\n', '541'],
    },
    {
      title: 'Total Payment',
      amount: ['325', '\n', '623', '\n', '423', '\n', '523'],
    },
    {
      title: 'Outstanding',
      amount: ['236', '\n', '156', '\n', '235', '\n', '852'],
    },
  ];
  return (
    <Container>
      <StatusBar barStyle="dark-content" />

      <CommonHeader
        text="Emi:"
        backArrow
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Subcontainer>
        {/* <Text>hello</Text> */}
        <FlatList
          data={Data}
          horizontal={true}
          // contentContainerStyle={{flexDirection: 'row'}}
          renderItem={({item}) => (
            <View>
              <View style={{}}>
                <View style={{backgroundColor: 'darkcyan', padding: 15}}>
                  <Text
                    style={{
                      marginHorizontal: 10,
                      color: 'black',
                      fontSize: 18,
                    }}>
                    {item.title}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 10,
                    justifyContent: 'center',
                    marginTop: 10,
                  }}>
                  <Text style={{paddingBottom: 10, color: 'black'}}>
                    {item.year}
                  </Text>
                  <Text style={{paddingBottom: 10, color: 'black'}}>
                    {item.amount}
                  </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </Subcontainer>
    </Container>
  );
};
export default PaymentListScreen;
