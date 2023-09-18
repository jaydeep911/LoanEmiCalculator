import React, {useEffect, useState} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import CommonHeader from '../../component/Header/CommonHeader';
import {styled} from 'styled-components';
import Button from '../../component/constant/Button/Button';
import PieChart from 'react-native-pie-chart';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

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
  const [interestRate] = useState(route.params.interestRate.toFixed(0));
  const [paymentMonth] = useState(route.params.paymentMonth);
  const [emi] = useState(route.params.emi.toFixed(0));

  console.log('date', paymentMonth);

  const widthAndHeight = 170;
  const series = [principal ? principal : 0, interestRate ? interestRate : 0];
  const sliceColor = ['green', 'orange'];

  return (
    <Container>
      <StatusBar
        // backgroundColor="#FB4B00"
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'}
      />

      <CommonHeader
        text={'Emi : ' + emi}
        backArrow
        onPress={() => {
          navigation.goBack();
        }}
      />
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
            <TitleText>{interestRate ? interestRate : 0.0}</TitleText>
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
            <TitleText>0</TitleText>
          </TextView>
          <UnderLineView />
          <TotalTextView>
            <TitleText>Total Payment </TitleText>
            <TitleText>
              {principal && interestRate
                ? parseFloat(principal) + parseFloat(interestRate)
                : 0}
            </TitleText>
          </TotalTextView>
        </CardView>
        <ButtonView>
          <Button
            text="LONE DETAILS"
            backArrow
            // onPress={() => {
            //   navigation.navigate('');
            // }}
          />
        </ButtonView>
      </Subcontainer>
    </Container>
  );
};
export default PaymentDetailScreen;
