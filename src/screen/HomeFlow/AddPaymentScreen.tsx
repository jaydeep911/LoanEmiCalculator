import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  StatusBar,
} from 'react-native';
import CommonHeader from '../../component/Header/CommonHeader';
import {styled} from 'styled-components';
import CommonTextInput from '../../component/TextInput/CommonTextInput';
import Button from '../../component/constant/Button/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import CalendarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import PaymentType from '../../component/constant/PaymentTypeModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AddPaymentProps = {
  navigation: any;
  modalVisible: any;
  onCancel: any;
};
const Container = styled.View({
  flex: 1,
});
const Subcontainer = styled.View({
  flex: 1,
  padding: 20,
});
const CardView = styled.View({
  width: '100%',
  // height: '40%',
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
  marginVertical: 20,
});

const DropdownContainer = styled.View({
  marginBottom: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
});
const DatePicker = styled.TouchableOpacity({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItem: 'center',
  marginTop: 8,
});
const CalendarText = styled.Text({
  color: 'black',
  fontSize: 18,
});
const TitleText = styled.Text({
  fontSize: 14,
  color: '#5F7C9D',
  marginTop: 10,
});
const ButtonView = styled.View({
  marginVertical: 40,
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
const SubText = styled.Text({
  color: 'black',
  fontSize: 16,
});
const AddPaymentScreen = ({
  navigation,
  modalVisible,
  onCancel,
}: AddPaymentProps) => {
  const [amountText, setAmountText] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [tenurend, setTenurEnd] = useState(false);
  const [customdate, setCustomDate] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [paytillDate, setPaytillDate] = useState('');
  const [monthText, setMonthText] = useState('');
  const toggleModalCancel = () => {
    setModalVisible(false);
  };
  const ChangeInputHandler = (text: string) => {
    setAmountText(text);
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

  return (
    <Container>
      <StatusBar barStyle="dark-content" />

      <CommonHeader
        text="Add Part Payment"
        backArrow
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Subcontainer>
        <CardView>
          <CardText>
            <Pressable onPress={() => setModalVisible(true)}>
              <DropdownContainer>
                <Text style={{fontSize: 16, color: 'black'}}>
                  {monthText ? monthText : 'Monthly'}
                </Text>
                <Icon name="caretdown" size={20} color={'grey'} />
              </DropdownContainer>
            </Pressable>

            <CommonTextInput
              text="Part Payment Amount"
              onChangeText={ChangeInputHandler}
              value={amountText}
              editable={true}
              multiline={false}
              keyboardType="numeric"
            />
            <TitleText>Starting From</TitleText>
            <DatePicker onPress={showDatePicker}>
              <CalendarText>
                {selectedDate
                  ? moment(selectedDate).format('MMM/YYYY')
                  : 'MM/YYYY'}
              </CalendarText>
              <CalendarIcon
                name="calendar-range-outline"
                size={25}
                color={'black'}
              />
            </DatePicker>
            <TitleText>Paying term</TitleText>
            <RadioContainer>
              <Pressable
                onPress={() => {
                  setTenurEnd(true);
                  setCustomDate(false);
                }}>
                <MainContainer>
                  <Fontisto
                    name={
                      tenurend === true
                        ? 'radio-btn-active'
                        : 'radio-btn-passive'
                    }
                    size={20}
                    color={tenurend === true ? 'darkcyan' : '#5F7C9D'}
                    style={{marginHorizontal: 8}}
                  />
                  <SubText>Tenure end</SubText>
                </MainContainer>
              </Pressable>
              <Pressable
                onPress={() => {
                  setCustomDate(true);
                  setTenurEnd(false);
                }}>
                <MainContainer>
                  <Fontisto
                    name={
                      customdate === true
                        ? 'radio-btn-active'
                        : 'radio-btn-passive'
                    }
                    size={20}
                    color={customdate === true ? 'darkcyan' : '#5F7C9D'}
                    style={{marginHorizontal: 8}}
                  />
                  <SubText>Custom Date</SubText>
                </MainContainer>
              </Pressable>
            </RadioContainer>
            {customdate && <TitleText>Pay till</TitleText>}
            {customdate && (
              <DatePicker onPress={showDatePicker}>
                <CalendarText>
                  {selectedDate
                    ? moment(selectedDate).format('MMM/YYYY')
                    : 'MM/YYYY'}
                </CalendarText>
                <CalendarIcon
                  name="calendar-range-outline"
                  size={25}
                  color={'black'}
                />
              </DatePicker>
            )}
          </CardText>
        </CardView>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <ButtonView>
          <Button
            text="ADD"
            onPress={() => {
              AsyncStorage.setItem(
                'user',
                amountText,
                moment(selectedDate).format('MMM/YYYY'),
              );

              navigation.navigate('HomeScreen', {
                amount: amountText,
              });
            }}
          />
        </ButtonView>
      </Subcontainer>
      <PaymentType
        modalVisible={isModalVisible}
        onPress={() => setModalVisible(true)}
        onCancel={toggleModalCancel}
        month={'Monthly'}
        year={'yearly'}
        quaterly={'Quaterly'}
        oneTime="One Time Only"
        onMonthClickHandler={month => setMonthText(month)}
        onYearClickHandler={year => setMonthText(year)}
        onQuaterlyClickHandler={quaterly => setMonthText(quaterly)}
        onOneTimeClickHandler={oneTime => setMonthText(oneTime)}
      />
    </Container>
  );
};

export default AddPaymentScreen;
