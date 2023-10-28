import React, {useEffect, useState} from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CommonHeader from '../../component/Header/CommonHeader';
import {styled} from 'styled-components';
import Button from '../../component/constant/Button/Button';
import PieChart from 'react-native-pie-chart';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Card} from 'react-native-paper';
import {calculateLoanReport} from '../../helper/HelpUtilAI';

type PaymentProps = {
  navigation: any;
  route: any;
};
const Container = styled.View({
  flex: 1,
});
const Subcontainer = styled.View({
  flex: 1,
  padding: 20,
});

const CardView = styled.View({
  backgroundColor: 'white',
  borderRadius: 5,
  marginVertical: 30,
  shadowColor: '#000000',
  shadowOpacity: 0.1,
  shadowOffset: {
    width: 0,
    height: -3,
  },
  shadowRadius: 1,
  elevation: 1,
});
const TextView = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItem: 'center',
  marginHorizontal: 15,
  marginVertical: 10,
});
const SubText = styled.View({
  flexDirection: 'row',
  alignItem: 'center',
});
const TitleText = styled.Text({
  marginHorizontal: 20,
  fontSize: 15,
  color: 'black',
});
const UnderLineView = styled.View({
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderColor: 'gray',
  marginVertical: 10,
  marginHorizontal: 12,
});
const ButtonView = styled.View({
  marginBottom: 15,
});
const TotalTextView = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItem: 'center',
  marginHorizontal: 10,
  marginBottom: 15,
});

const PaymentDetailScreen = ({navigation, route}: PaymentProps) => {
  const [principal] = useState(route.params.principal);
  const [interestRate] = useState(route.params.interestRate);
  const [loanTenureMonths] = useState(route.params.loanTenureMonths.toFixed(0));

  const [paymentMonth] = useState(route.params.paymentMonth);
  const [loanStartDate] = useState(route.params.loanStartDate);

  const [emi] = useState(route.params.emi);
  const [partPayment] = useState(route.params.partPayment);
  console.log('partPayment======>', partPayment);
  console.log('date', paymentMonth);

  const widthAndHeight = 170;
  const [intrustAmount, setIntrustAmount] = useState(0);

  const series = [principal ? principal : 0, intrustAmount ? intrustAmount : 0];
  const sliceColor = ['green', 'orange'];
  const [amortization, setAmortization] = useState([]);
  useEffect(() => {
    const {
      amortizationSchedule,
      loanEndDate,
      calculatedPrinciple,
      calculatedInterest,
      calculatedPartPayment,

      // calculatedInterest 4429890.5756220035
      // LOG  calculatedPrinciple 2999819.7026332878
    } = calculateLoanReport(
      principal,
      interestRate,
      emi,
      loanTenureMonths,
      [],
      loanStartDate,
    );
    setIntrustAmount(calculatedInterest);

    // console.log('amortizationSchedule ' + JSON.stringify(amortizationSchedule));
    setAmortization(amortizationSchedule);
    console.log('loanEndDate ' + loanEndDate);
    console.log('calculatedInterest ' + calculatedInterest);
    console.log('calculatedPrinciple ' + calculatedPrinciple);
    console.log('calculatedPartPayment ' + calculatedPartPayment);
  }, [route.params]);

  return (
    <Container>
      <StatusBar
        // backgroundColor="#FB4B00"
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'}
      />
      <CommonHeader
        text={'Emi : ' + parseInt(emi)}
        backArrow
        onPress={() => {
          navigation.goBack();
        }}
      />
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <Card style={{margin: 5, padding: 20, flex: 1}}>
              <Text>Principal : {principal}</Text>
            </Card>
          </View>

          <View style={{flexDirection: 'row', width: '100%'}}>
            <Card style={{margin: 5, padding: 20, flex: 1}}>
              <Text>Intrust Rate : {interestRate}</Text>
            </Card>
            <Card style={{margin: 5, padding: 20, flex: 1}}>
              <Text>Tenure Months : {loanTenureMonths} </Text>
            </Card>
          </View>
          <Subcontainer>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              coverRadius={0.7}
              style={{alignSelf: 'center'}}
            />
            <CardView>
              <TextView>
                <SubText>
                  <FontAwesomeIcon
                    name="square"
                    size={13}
                    color={'green'}
                    style={{alignSelf: 'center'}}
                  />
                  <TitleText>Principle </TitleText>
                </SubText>
                <TitleText>{principal ? principal : 0.0}</TitleText>
              </TextView>
              <TextView>
                <SubText>
                  <FontAwesomeIcon
                    name="square"
                    size={13}
                    color={'orange'}
                    style={{alignSelf: 'center'}}
                  />
                  <TitleText>Interest </TitleText>
                </SubText>
                <TitleText>
                  {intrustAmount ? parseInt(intrustAmount) : 0}
                </TitleText>
              </TextView>
              <TextView>
                <SubText>
                  <FontAwesomeIcon
                    name="square"
                    size={13}
                    color={'blue'}
                    style={{alignSelf: 'center'}}
                  />
                  <TitleText>Part Payment</TitleText>
                </SubText>
                <TitleText>{partPayment}</TitleText>
              </TextView>
              <UnderLineView />
              <TotalTextView>
                <TitleText>Total Payment </TitleText>
                <TitleText>
                  {parseInt(principal) + parseInt(intrustAmount)}
                </TitleText>
              </TotalTextView>
            </CardView>
            <ButtonView>
              <Button
                text="LONE DETAILS"
                backArrow
                onPress={() => {
                  navigation.navigate('PaymentListScreen', {
                    amortizationData: amortization,
                  });
                }}
              />
            </ButtonView>
          </Subcontainer>
        </View>
      </ScrollView>
    </Container>
  );
};
export default PaymentDetailScreen;
