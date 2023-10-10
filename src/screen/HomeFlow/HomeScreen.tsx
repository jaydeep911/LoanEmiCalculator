import React, {useEffect, useState} from 'react';
import {Pressable, StatusBar, View, ScrollView, Alert} from 'react-native';
import CommonHeader from '../../component/Header/CommonHeader';
import {styled} from 'styled-components';
import CommonTextInput from '../../component/TextInput/CommonTextInput';
import Button from '../../component/constant/Button/Button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import CalendarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';
type HomeProps = {
  navigation: any;
  route: any;
};
const Container = styled.View({
  flex: 1,
});
const Subcontainer = styled.View({
  flex: 1,
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

  marginBottom: 20,
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
  height: 35,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItem: 'center',
});
const PaymentType = styled.Text({
  color: 'white',
  fontSize: 18,
  alignItem: 'center',
  marginHorizontal: 10,
  marginTop: 4,
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
  const [isDatePickerVisible, setDatePickerVisibility] = useState();
  const [selectedDate, setSelectedDate] = useState('');
  const [month, setMonth] = useState(false);
  const [year, setYear] = useState(true);
  const [PaymentData, setPaymentData] = useState([]);

  // useEffect(() => {
  //   displayData();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      displayData();
    }, []),
  );
  const displayData = async (amount: any) => {
    try {
      const amount = await AsyncStorage.getItem('user');
      setPaymentData(amount);
    } catch (error) {}
  };

  const PrincipalInputHandler = (text: string) => {
    setPrincipalText(text);
  };
  const InterestChangeHandler = (text: string) => {
    setInterestRateText(text);
  };
  const validateInterestRate = (text: any) => {
    return text.length > 0 && text.length < 50;
  };
  const validateTenure = (text: string) => {
    return text.length > 0 && text.length < 50;
  };
  const TenureInputHandler = (text: string) => {
    setTenure(text.replace(/[^1-50]/g, ''));
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

  const emi =
    (parseFloat(loanAmount) *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, totalMonths)) /
    (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

  // console.log('emi===>', emi.toFixed(2));

  const interest =
    (parseFloat(principalText) * (parseFloat(interestRateText) * 0.6)) / 12;
  const interestRateInput = parseFloat(principalText) / 12 + interest;

  // if () {
  //   const rate = parseFloat(interestRateText) / 12 / 180;
  //   const p = parseFloat(principalText);
  //   const n = parseFloat(tenure);
  //   const interestValue = p * rate * n;
  // }

  const onAddChangeHandler = () => {};
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
      <ScrollView>
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
                maxLength={10}
              />
              <CommonTextInput
                text="Interest Rate In %"
                onChangeText={InterestChangeHandler}
                value={interestRateText}
                editable={true}
                multiline={false}
                keyboardType="numeric"
                maxLength={2}
              />

              <DateContainer>
                <View>
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
                            month === true
                              ? 'radio-btn-active'
                              : 'radio-btn-passive'
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
                            year === true
                              ? 'radio-btn-active'
                              : 'radio-btn-passive'
                          }
                          size={20}
                          color={year === true ? 'darkcyan' : '#5F7C9D'}
                          style={{marginHorizontal: 8}}
                        />
                        <SubText>Year</SubText>
                      </MainContainer>
                    </Pressable>
                  </RadioContainer>
                </View>
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
              {year && (
                <CommonTextInput
                  text={'Loan Tenure in Years'}
                  onChangeText={TenureInputHandler}
                  value={tenure}
                  editable={true}
                  multiline={false}
                  keyboardType="numeric"
                  maxLength={3}
                />
              )}

              {month && (
                <CommonTextInput
                  text={'Loan Tenure in Months'}
                  onChangeText={TenureInputHandler}
                  value={tenure}
                  editable={true}
                  multiline={false}
                  keyboardType="numeric"
                  maxLength={2}
                />
              )}
            </CardText>
          </CardView>
          {PaymentData && (
            <SubView>
              <PaymentView>
                <PaymentType>{'Payment Type'}</PaymentType>
                <Icon
                  name="delete"
                  size={30}
                  color={'white'}
                  style={{marginRight: 20}}
                  onPress={() => {
                    setPaymentData(false);
                  }}
                />
              </PaymentView>
              <PaymentText>{PaymentData}</PaymentText>
            </SubView>
          )}
        </Subcontainer>
      </ScrollView>
      <ButtonView>
        <Button
          text="CALCULATE"
          backArrow
          onPress={() => {
            if (principalText === '') {
              Alert.alert('enter principal ');
            } else if (interestRateText === '') {
              Alert.alert('enter interest rate');
            } else if (tenure === '') {
              Alert.alert('enter tenure ');
            } else if (selectedDate === '') {
              Alert.alert('SelectedDate');
            } else if (!validateInterestRate(interestRateText)) {
              Alert.alert('Please enter interestRate 1 to 50 number');
            } else if (!validateTenure(tenure)) {
              Alert.alert('Please enter tenure 1 to 50 number');
            } else {
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
        display="spinner"
      />
    </Container>
  );
};

export default HomeScreen;
