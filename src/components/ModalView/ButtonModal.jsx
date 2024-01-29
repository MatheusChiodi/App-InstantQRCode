import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import scaleFactor from '../../functions/ScaleFactor';

export default function ButtonModal({ onPress, Title, bgColor }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 120 * scaleFactor,
        backgroundColor: bgColor,
        padding: 10 * scaleFactor,
        borderRadius: 10 * scaleFactor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5 * scaleFactor,
      }}
    >
      <Text
        style={{
          color: '#000',
          fontSize: 15 * scaleFactor,
          fontWeight: 'bold',
        }}
      >
        {Title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalSubContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalBase: {
    width: 300,
    height: 300,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalLink: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
