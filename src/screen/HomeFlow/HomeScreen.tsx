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
import {
  calculateEMI,
  calculateHomeLoanEMI,
  calculateLoanReport,
} from '../../helper/HelpUtilAI';

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
  height: 30,
  flexDirection: 'row',
  justifyContent: 'space-between',
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
  const [amount, setAmount] = useState();

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

  const calculation = () => {
    // Example usage:
    const loanAmount = 1000000; // 10 lakhs
    const annualInterestRate = 8; // 8% per annum
    const loanTenureMonths = 240; // 20 years loan tenure in months
    const monthlyEMI = calculateHomeLoanEMI(
      loanAmount,
      annualInterestRate,
      loanTenureMonths / 12,
    );

    const partPayments = [
      {
        amount: 50000,
        startDate: '2023-01-01',
        endDate: '2023-12-31',
        interval: 'OneTime',
      },
      {
        amount: 30000,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        interval: 'Yearly',
      },
      {
        amount: 20000,
        startDate: '2023-02-01',
        endDate: '2023-02-28',
        interval: 'OneTime',
      },
    ];
    const partPayments_monthly = [
      {
        amount: 1000,
        startDate: '2023-01-01',
        endDate: '2123-12-31',
        interval: 'Monthly',
      },
    ];
    const partPayments_yearly = [
      {
        amount: 1000,
        startDate: '2023-01-01',
        endDate: '2123-12-31',
        interval: 'Yearly',
      },
    ];
    const partPayments_Quarterly = [
      {
        amount: 1000,
        startDate: '2023-01-01',
        endDate: '2123-12-31',
        interval: 'Quarterly',
      },
    ];

    const loanStartDate = '2023-01-01'; // Start date of the loan

    const {
      amortizationSchedule,
      loanEndDate,
      calculatedPrinciple,
      calculatedInterest,
      calculatedPartPayment,
    } = calculateLoanReport(
      loanAmount,
      annualInterestRate,
      monthlyEMI,
      loanTenureMonths,
      partPayments_Quarterly,
      loanStartDate,
    );

    // Display the full monthly report
    console.log(
      'Month\tPayment Date\tMonthly EMI\tPrincipal Payment\tInterest Payment\tRemaining Loan Amount\tPart Payment',
    );

    amortizationSchedule.forEach(entry => {
      console.log(
        `${entry.month}\t${
          entry.paymentDate.toISOString().split('T')[0]
        }\t₹${entry.monthlyEMI.toFixed(2)}\t\t₹${entry.principalPayment.toFixed(
          2,
        )}\t\t₹${entry.interestPayment.toFixed(
          2,
        )}\t₹${entry.remainingLoanAmount.toFixed(
          2,
        )}\t₹${entry.partPaymentOfMonth.toFixed(2)}
        `,
      );
    });

    console.log(`Loan End Date: ${loanEndDate.toISOString().split('T')[0]}`);
    console.log(`calculatedPrinciple : ${calculatedPrinciple}`);
    console.log(`calculatedInterest : ${calculatedInterest}`);
    console.log(`calculatedPartPayment : ${calculatedPartPayment}`);
    console.log(
      `Total Payment : ${
        calculatedPrinciple + calculatedInterest + calculatedPartPayment
      }`,
    );
  };
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
                maxLength={10}
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
              {year === true && (
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

              {month === true && (
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
                <PaymentType>Monthly Payment</PaymentType>
                <Icon
                  name="delete"
                  size={30}
                  color={'white'}
                  style={{marginRight: 20}}
                />
              </PaymentView>
              <PaymentText>
                {/* {PaymentData + '  from' + moment(selectedDate).format('MMM/YYYY')} */}
              </PaymentText>
            </SubView>
          )}
        </Subcontainer>
      </ScrollView>
      <ButtonView>
        <Button
          text="CALCULATE"
          backArrow
          onPress={() => {
            // if (
            //   principalText &&
            //   interestRateText &&
            //   tenure &&
            //   selectedDate !== ''
            // ) {
            //   navigation.navigate('PaymentDetailScreen', {
            //     principal: principalText,
            //     interestRate: interestRateInput,
            //     tenure: tenure,
            //     emi: emi,
            //   });
            // } else {
            //   Alert.alert('enter detail');
            // }
            // Example usage:
            // const loanPrincipal = 100000; // Replace with the loan principal amount
            // const annualInterestRate = 6.5; // Replace with the annual interest rate
            // const loanTermMonths = 36; // Replace with the loan term in months
            // const loanStartDate = '2023-01-01'; // Replace with the loan starting date in YYYY-MM-DD format
            // const emiDetails = calculateEMI(
            //   loanPrincipal,
            //   annualInterestRate,
            //   loanTermMonths,
            //   loanStartDate,
            // );
            // console.log('EMI: ₹' + emiDetails.emi);
            // console.log('Total Payment: ₹' + emiDetails.totalPayment);
            // console.log('Loan Start Date: ' + emiDetails.startDate);
            // console.log('Loan End Date: ' + emiDetails.endDate);
            // let value = calculateLoanSchedule(
            //   loanPrincipal,
            //   annualInterestRate,
            //   loanTermMonths,
            //   'monthly',
            //   1000,
            //   new Date(),
            //   [],
            // );
            // console.log('VALUE ' + JSON.stringify(value));
            calculation();
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
