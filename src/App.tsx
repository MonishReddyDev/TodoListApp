import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Task from './Components/Task';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

interface Task {
  id: string;
  taskData: string;
}

const App = () => {
  const [task, setTask] = useState('');
  const [TaskItem, setTaskItem] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState<any>(null);

  //To reload the app and get the tasks in firebase
  useEffect(() => {
    getTasks();
  }, []);

  //ADD the data to the firestore
  const addTask = async (taskData: any) => {
    try {
      //point to firestore.collections and add tasks collection and ass (taskdata)
      await firestore().collection('Tasks').add({taskData});
      console.log('Task added successfully!');
    } catch (error) {
      console.error('Error adding task: ', error);
    }
  };

  //Get the data from the firestore
  const getTasks = async () => {
    setLoading(true);
    try {
      const TasksData = await firestore().collection('Tasks').get();
      const tasks = TasksData.docs.map(doc => ({id: doc.id, ...doc.data()}));
      setTaskItem(tasks);
    } catch (error) {
      console.error('Error getting tasks: ', error);
    }
  };

  //Delete the data from the firestore

  const deleteTask = async (taskId: string) => {
    try {
      await firestore().collection('Tasks').doc(taskId).delete();
      console.log('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };

  //to delete the completed tasks
  const completeTask = (taskId: string) => {
    deleteTask(taskId);
    getTasks();
  };

  const handleAdd = () => {
    Keyboard.dismiss();
    addTask(task);
    getTasks();
    setTask('');
  };

  return (
    <View style={styles.container}>
      {/* Todays Task*/}
      <View style={styles.textWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>
          <View>
            <FlatList
              renderItem={({item, index}) => (
                <TouchableOpacity
                  key={index} // Use index as key for list items
                  onPress={() => completeTask(item.id)}>
                  <Task key={index} text={item.taskData} />
                </TouchableOpacity>
              )}
              data={TaskItem}
              keyExtractor={item => item.id}
              onEndReachedThreshold={0.1}></FlatList>
          </View>
        </View>
      </View>
      {/* Task input*/}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput
          value={task}
          placeholder="Write a Task"
          style={styles.input}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAdd()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  textWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  items: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    width: 280,
    borderRadius: 60,
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },
  addText: {},
});
