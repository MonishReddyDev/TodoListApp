import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';

const Task = ({text}) => {
  return (
    <View style={styles.Item}>
      <View style={styles.ItemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.ItemText}>{text}</Text>
      </View>
      <View style={styles.circular}></View>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  Item: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55bcf6',
    borderRadius: 5,
    opacity: 0.4,
    marginRight: 15,
  },
  ItemText: {
    maxWidth: '80%',
    fontWeight: '900',
    fontSize: 15,
    color: 'black',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55bcf6',
    borderWidth: 2,
    borderRadius: 5,
  },
});
