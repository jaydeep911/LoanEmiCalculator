import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {styled} from 'styled-components';
import CommonHeader from '../../component/Header/CommonHeader';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

type DataListProps = {
  navigation: any;
  route: any;
  onCancel: any;
};
const Container = styled.View({
  flex: 1,
});
const Subcontainer = styled.View({
  flex: 1,
});
const PaymentListScreen = ({navigation, route}: DataListProps) => {
  const [amortizationData] = useState(route.params.amortizationData);
  console.log('amortizationData====>', amortizationData);
  const [isVisible, setIsVisible] = useState(false);

  // const Data = [
  //   {
  //     title: 'year',
  //     year: ['2023', '\n', '2021', '\n', '2023', '\n', '2032'],
  //   },
  //   {
  //     title: 'principle',
  //     amount: ['123', '\n', '215', '\n', '326', '\n', '253'],
  //   },
  //   {
  //     title: 'interest',
  //     amount: ['325', '\n', '23', '\n', '523', '\n', '231'],
  //   },
  //   {
  //     title: 'Part Payment',
  //     amount: ['612', '\n', '326', '\n', '523', '\n', '541'],
  //   },
  //   {
  //     title: 'Total Payment',
  //     amount: ['325', '\n', '623', '\n', '423', '\n', '523'],
  //   },
  //   {
  //     title: 'Outstanding',
  //     amount: ['236', '\n', '156', '\n', '235', '\n', '852'],
  //   },
  // ];
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'darkcyan',
          }}>
          <Text
            style={{
              paddingBottom: 10,
              color: 'black',
              fontSize: 16,
              // marginHorizontal: 40,
              fontWeight: '600',
              marginLeft: 50,
            }}>
            Month
          </Text>
          <Text
            style={{
              paddingBottom: 10,
              color: 'black',
              fontSize: 16,
              // marginHorizontal: 15,
              marginLeft: 20,

              fontWeight: '600',
            }}>
            Year
          </Text>
          <Text
            style={{
              paddingBottom: 10,
              color: 'black',
              fontSize: 16,
              marginHorizontal: 35,
              fontWeight: '600',
              // marginLeft: 20,
            }}>
            EMI
          </Text>
          <Text
            style={{
              paddingBottom: 10,
              color: 'black',
              fontSize: 16,
              fontWeight: '600',
            }}>
            Principal
          </Text>
          <Text
            style={{
              paddingBottom: 10,
              color: 'black',
              fontSize: 16,
              marginHorizontal: 12,
              fontWeight: '600',
              // marginRight: 10,
            }}>
            Interest
          </Text>
        </View>
        <ScrollView>
          {amortizationData.map((item: any, index: number) => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(true);
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 20,
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Icon
                    name="caret-right"
                    size={14}
                    color={'black'}
                    style={{marginLeft: 8}}
                  />
                  <Text style={{paddingBottom: 10, color: 'black'}}>
                    {item.month}
                  </Text>
                  <Text style={{paddingBottom: 10, color: 'black'}}>
                    {moment(item.paymentDate).format('YYYY')}
                  </Text>
                  <Text style={{paddingBottom: 10, color: 'black'}}>
                    {item.monthlyEMI.toFixed(2)}
                  </Text>
                  <Text style={{paddingBottom: 10, color: 'black'}}>
                    {item.principalPayment.toFixed(2)}
                  </Text>
                  <Text style={{paddingBottom: 10, color: 'black'}}>
                    {item.interestPayment.toFixed(2)}
                  </Text>
                </View>
                {isVisible && (
                  <View style={{height: 50, backgroundColor: 'white'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 20,
                        justifyContent: 'space-between',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          paddingBottom: 10,
                          color: 'black',
                          marginLeft: 50,
                        }}>
                        1
                      </Text>
                      <Text style={{paddingBottom: 10, color: 'black'}}>
                        2014
                      </Text>
                      <Text style={{paddingBottom: 10, color: 'black'}}>
                        {item.monthlyEMI.toFixed(2)}
                      </Text>
                      <Text style={{paddingBottom: 10, color: 'black'}}>
                        {item.principalPayment.toFixed(2)}
                      </Text>
                      <Text style={{paddingBottom: 10, color: 'black'}}>
                        {item.interestPayment.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ))}
          {/* </View> */}
        </ScrollView>
        {/* <FlatList
          data={amortizationData}
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
                    {item.principalPayment.toFixed(1)}
                  </Text>
                  <Text style={{paddingBottom: 10, color: 'black'}}>
                    {item.interestPayment.toFixed(1)}
                  </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        /> */}
      </Subcontainer>
    </Container>
  );
};
export default PaymentListScreen;
