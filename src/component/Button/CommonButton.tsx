import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {styled} from 'styled-components';
type ButtonProps = {
  buttontxt1?: string;
  buttontxt2?: string;
  onPress1?: any;
  onPress2?: any;
  style?: any;
  style2?: any;
};
const CommonButton = ({
  onPress1,
  onPress2,
  buttontxt1,
  buttontxt2,
  style,
  style2,
}: ButtonProps) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable onPress={onPress1} style={style ? style : {}}>
        <Text style={styles.buttontxt}>{buttontxt1}</Text>
      </Pressable>

      <Pressable onPress={onPress2} style={style2 ? style2 : {}}>
        <Text style={styles.buttontxt}>{buttontxt2}</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  buttonView: {
    height: 30,
    width: 150,
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  buttontxt: {
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '500',
    fontSize: 14,
  },
});
export default CommonButton;
