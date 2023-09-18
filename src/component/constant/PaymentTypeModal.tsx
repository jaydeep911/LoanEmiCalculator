import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
  Platform,
} from 'react-native';
import {styled} from 'styled-components';
type ModalProps = {
  modalVisible: boolean;
  onCancel: any;
  onPress: any;
  month: string;
  year: string;
  quaterly: string;
  oneTime: string;
  onMonthClickHandler: any;
  onYearClickHandler: any;
  onQuaterlyClickHandler: any;
  onOneTimeClickHandler: any;
};
const Container = styled.View({
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.2)',
});
const TextView = styled.View({
  marginTop: Platform.OS === 'ios' ? 50 : 0,
  // marginHorizontal: 8,
  backgroundColor: 'white',
});
const DropText = styled.Text({
  color: 'black',
  fontSize: 16,
  marginLeft: 10,
  marginVertical: 14,
});
const UnderLineView = styled.View({
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderColor: 'gray',
  marginHorizontal: 5,
});
const PaymentType = ({
  modalVisible,
  onCancel,
  month,
  year,
  quaterly,
  oneTime,
  onMonthClickHandler,
  onYearClickHandler,
  onQuaterlyClickHandler,
  onOneTimeClickHandler,
}: ModalProps) => {
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onCancel}
        onDismiss={onCancel}>
        <Container>
          <TouchableWithoutFeedback>
            <View
              style={{
                marginTop: 90,
                justifyContent: 'center',
                marginHorizontal: 25,
              }}>
              <TextView>
                <Pressable
                  onPress={() => {
                    onMonthClickHandler(month);
                    onCancel();
                  }}>
                  <DropText>{month}</DropText>
                </Pressable>
                <UnderLineView />
                <Pressable
                  onPress={() => {
                    onYearClickHandler(year);
                    onCancel();
                  }}>
                  <DropText>{year}</DropText>
                </Pressable>

                <UnderLineView />
                <Pressable
                  onPress={() => {
                    onQuaterlyClickHandler(quaterly);
                    onCancel();
                  }}>
                  <DropText>{quaterly}</DropText>
                </Pressable>
                <UnderLineView />
                <Pressable
                  onPress={() => {
                    onOneTimeClickHandler(oneTime);
                    onCancel();
                  }}>
                  <DropText>{oneTime}</DropText>
                </Pressable>
              </TextView>
            </View>
          </TouchableWithoutFeedback>
        </Container>
      </Modal>
    </View>
  );
};
export default PaymentType;
