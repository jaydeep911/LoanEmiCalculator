import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type HeaderProps = {
  onPress?: any;
  text?: string;
  backArrow?: boolean;
  flexNumber?: number;
  isSearch?: boolean;
  isClose?: boolean;
  AddPayment?: boolean;
};

const CommonHeader = ({onPress, text, backArrow, AddPayment}: HeaderProps) => {
  return (
    <View style={styles.mainHeaderView}>
      <SafeAreaView style={styles.safeAreaColor} />

      <StatusBar
        // translucent
        backgroundColor="darkcyan"
        // barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'}
        barStyle="light-content"
      />

      <View style={[styles.iconView]}>
        {backArrow && (
          // <View>
          <Icon
            name="arrow-back"
            size={30}
            color={'white'}
            onPress={onPress}
            // style={{marginLeft: 10}}
          />
          // </View>
        )}
        {/* <View style={{}}> */}
        <Text style={styles.headerText}>{text}</Text>
        {/* </View> */}
        {AddPayment && (
          <View>
            <Icon
              name="add-circle"
              size={30}
              color={'white'}
              onPress={onPress}
              style={{paddingLeft: Platform.OS === 'ios' ? 180 : 140}}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: 'white',
    fontSize: 20,
    marginLeft: 12,
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  iconView: {
    flexDirection: 'row',
    minHeight: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  mainHeaderView: {
    backgroundColor: 'darkcyan',
  },
});

export default CommonHeader;
