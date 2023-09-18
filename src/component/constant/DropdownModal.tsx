import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import {styled} from 'styled-components';
type ModalProps = {
  modalVisible: boolean;
  onCancel: any;
  onPress: any;
  text1: any;
  text2: any;
  onMonthClickHandler: any;
  onYearClickHandler: any;
};
const Container = styled.View({
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.2)',
  marginTop: 50,
});
const TextView = styled.View({
  marginTop: 30,
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
const DropdownModal = ({
  modalVisible,
  onCancel,
  onPress,
  text1,
  text2,
  onMonthClickHandler,
  onYearClickHandler,
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
                    onMonthClickHandler(text1);
                    onCancel();
                  }}>
                  <DropText>{text1}</DropText>
                </Pressable>
                <UnderLineView />
                <Pressable
                  onPress={() => {
                    onYearClickHandler(text2);
                    onCancel();
                  }}>
                  <DropText>{text2}</DropText>
                </Pressable>
              </TextView>
            </View>
          </TouchableWithoutFeedback>
        </Container>
      </Modal>
    </View>
  );
};
export default DropdownModal;
