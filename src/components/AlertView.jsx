import { View, Text, StyleSheet } from 'react-native';

import scaleFactor from '../functions/ScaleFactor';

export default function AlertView({ title }) {
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.alertContainer}>
        <Text style={styles.alertText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    width: '100%',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    width: 250 * scaleFactor,
    height: 200 * scaleFactor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3 * scaleFactor,
    borderColor: '#ccc',
    borderRadius: 10 * scaleFactor,
    padding: 20 * scaleFactor,
  },
  alertText: {
    fontSize: 18 * scaleFactor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
