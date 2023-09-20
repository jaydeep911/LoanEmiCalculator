import React, {useEffect, useState} from 'react';
import {Text, Pressable, StatusBar, Alert, Platform} from 'react-native';
import CommonHeader from '../../component/Header/CommonHeader';
import {styled} from 'styled-components';
import CommonTextInput from '../../component/TextInput/CommonTextInput';
import Button from '../../component/constant/Button/Button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import CalendarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeProps = {
  navigation: any;
  route: any;
};
const Container = styled.View({
  flex: 1,
});
const Subcontainer = styled.View({
  flex: 1,
  // padding: 10,
});

const CardView = styled.View({
  marginHorizontal: 10,
  marginTop: 10,
  backgroundColor: 'white',
  borderRadius: 5,
  shadowColor: '#000000',
  shadowOpacity: 0.1,
  shadowOffset: {
    width: 0,
    height: -3,
  },
  shadowRadius: 1,
  elevation: 1,
});
const CardText = styled.View({
  marginHorizontal: 15,
  marginVertical: 10,
});
const ButtonView = styled.View({
  marginBottom: 15,
});
const DateContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
});
const TitleText = styled.Text({
  fontSize: 14,
  color: '#5F7C9D',
  marginTop: 12,
});

const DatePicker = styled.TouchableOpacity({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItem: 'center',
  marginTop: 8,
});
const CalendarText = styled.Text({
  color: 'black',
  fontSize: 16,
});
const DatePickerView = styled.View({
  justifyContent: 'center',
});

const MainContainer = styled.View({
  flexDirection: 'row',
  alignItem: 'center',
});
const RadioContainer = styled.View({
  flexDirection: 'row',
  alignItem: 'center',
  marginTop: 10,
});
const SubView = styled.View({
  marginVertical: 10,
});
const SubText = styled.Text({
  color: 'black',
  fontSize: 16,
});
const PaymentView = styled.View({
  backgroundColor: 'gray',
  height: 30,
});
const PaymentType = styled.Text({
  color: 'white',
  fontSize: 18,
  alignItem: 'center',
  marginHorizontal: 10,
});
const PaymentText = styled.Text({
  color: 'gray',
  fontSize: 16,
  marginHorizontal: 15,
  marginVertical: 10,
});
const HomeScreen = ({navigation, route}: HomeProps) => {
  const [principalText, setPrincipalText] = useState('');
  const [interestRateText, setInterestRateText] = useState('');
  const [tenure, setTenure] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [month, setMonth] = useState(false);
  const [year, setYear] = useState(false);
  const [PaymentData, setPaymentData] = useState([]);
  // const [amount] = useState(route.params.amount);

  useEffect(() => {
    displayData();
  }, []);
  const displayData = async (amount: any) => {
    try {
      const amount = await AsyncStorage.getItem('user');
      setPaymentData(amount);
    } catch (error) {
      // alert(error);
    }
  };

  const PrincipalInputHandler = (text: string) => {
    setPrincipalText(text);
  };
  const InterestChangeHandler = (text: string) => {
    setInterestRateText(text);
  };
  const TenureInputHandler = (text: string) => {
    setTenure(text);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const monthlyInterestRate = parseFloat(interestRateText) / (12 * 100); // Convert annual interest rate to monthly
  const totalMonths = parseFloat(tenure) * 12; // Convert tenure from years to months
  let loanAmount = principalText;
  console.log('totalMonth', totalMonths);

  const emi =
    (parseFloat(loanAmount) *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, totalMonths)) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

  console.log('emi===>', emi.toFixed(0));
  // Interest = P x R x N /100 principal interestrate yesr

  // const interestRateInput = (principalText * 12 * interestRateText) / 100;.

  const interest =
    (parseFloat(principalText) * (parseFloat(interestRateText) * 0.95)) / 12;
  const interestRateInput = parseFloat(principalText) / 12 + interest;

  // console.log('interestRateInput', interestRateInput.toFixed(0));

  return (
    <Container>
      <StatusBar barStyle="light-content" />
      <CommonHeader
        text="Emi + Calculator"
        AddPayment
        onPress={() => {
          navigation.navigate('AddPaymentScreen');
        }}
      />
      <Subcontainer>
        <CardView>
          <CardText>
            <CommonTextInput
              text="Principal"
              onChangeText={PrincipalInputHandler}
              value={principalText}
              editable={true}
              multiline={false}
              keyboardType="numeric"
            />
            <CommonTextInput
              text="Interest Rate In %"
              onChangeText={InterestChangeHandler}
              value={interestRateText}
              editable={true}
              multiline={false}
              keyboardType="numeric"
            />

            <TitleText>Paying Term</TitleText>
            <RadioContainer>
              <Pressable
                onPress={() => {
                  setMonth(true);
                  setYear(false);
                }}>
                <MainContainer>
                  <Fontisto
                    name={
                      month === true ? 'radio-btn-active' : 'radio-btn-passive'
                    }
                    size={20}
                    color={month === true ? 'darkcyan' : '#5F7C9D'}
                    style={{marginHorizontal: 8}}
                  />
                  <SubText>Month</SubText>
                </MainContainer>
              </Pressable>
              <Pressable
                onPress={() => {
                  setYear(true);
                  setMonth(false);
                }}>
                <MainContainer>
                  <Fontisto
                    name={
                      year === true ? 'radio-btn-active' : 'radio-btn-passive'
                    }
                    size={20}
                    color={year === true ? 'darkcyan' : '#5F7C9D'}
                    style={{marginHorizontal: 8}}
                  />
                  <SubText>Year</SubText>
                </MainContainer>
              </Pressable>
            </RadioContainer>

            <DateContainer>
              <CommonTextInput
                text="Tenure"
                onChangeText={TenureInputHandler}
                value={tenure}
                editable={true}
                multiline={false}
                keyboardType="numeric"
              />

              <DatePickerView>
                <TitleText>Starting From</TitleText>
                <DatePicker onPress={showDatePicker}>
                  <CalendarText>
                    {selectedDate
                      ? moment(selectedDate).format('MMM/YYYY')
                      : 'MM/YYYY'}
                  </CalendarText>
                  <CalendarIcon
                    name="calendar-range-outline"
                    size={22}
                    color={'black'}
                  />
                </DatePicker>
              </DatePickerView>
            </DateContainer>
          </CardText>
        </CardView>
        {PaymentData && (
          <SubView>
            <PaymentView>
              <PaymentType>Monthly Payment</PaymentType>
            </PaymentView>
            <PaymentText>
              {PaymentData + '  from' + moment(selectedDate).format('MMM/YYYY')}
            </PaymentText>
          </SubView>
        )}
      </Subcontainer>
      <ButtonView>
        <Button
          text="CALCULATE"
          backArrow
          onPress={() => {
            if (
              principalText &&
              interestRateText &&
              tenure &&
              selectedDate !== ''
            ) {
              navigation.navigate('PaymentDetailScreen', {
                principal: principalText,
                interestRate: interestRateInput,
                tenure: tenure,
                emi: emi,
              });
            }
          }}
        />
      </ButtonView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Container>
  );
};

export default HomeScreen;
