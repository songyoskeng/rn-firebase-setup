import React from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';
import firebase from '../firebase'
export default class Todos extends React.Component {
    constructor() {
        super();
        this.ref = null;
        this.listView = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        });
    
        this.state = {
          todos: this.listView.cloneWithRows({}),
        };
    
        // Keep a local reference of the TODO items
        this.todos = {};
      }
    
      // Load the Todos on mount
      componentDidMount() {
        this.ref = firebase.database().ref('todos');
        this.ref.on('value', this.handleToDoUpdate);
      }

      componentWillUnmount() {
        if (this.ref) {
          this.ref.off('value', this.handleToDoUpdate);
        }
      }

      handleToDoUpdate = (snapshot) => {
        this.todos = snapshot.val() || {};
    
        this.setState({
          todos: this.listView.cloneWithRows(this.todos),
        });
      }

      renderToDo(todo) {
        // Dont render the todo if its complete
    
        return (
          <View>
            <Text>{todo.title}</Text>
          </View>
        );
      }
    
    
    
  render() {
    return (
      <View style={styles.container}>
        <ListView
            dataSource={this.state.todos}
            enableEmptySections={true}
            renderRow={(...args) => this.renderToDo(...args)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
