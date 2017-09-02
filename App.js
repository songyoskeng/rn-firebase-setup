import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Todos from './components/Todos'
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Todos />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
