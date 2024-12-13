import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, FlatList, Text,StyleSheet,TouchableOpacity,ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRoute } from "@react-navigation/native"

const TodoScreen = () => {
    const [todos, setTodos] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [error, setError] = useState('');

    const route = useRoute();

    useEffect(() => {
      fetchTodos();
    }, []);
 
  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3000/getAllTodos',
        {headers: {
          userid: route?.params?.username,token:route?.params?.token
        }});

      console.log(response.data)
      setTodos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching todos', error);
      setIsLoading(false);
    }
  };
    const addTodo = async () => {
      try {
        if(!newTask){
          setError("Please enter Task"); 
        }else{
          setError(""); 
          const response= await axios.post('http://localhost:3000/addTodos',
            {userid:route?.params?.username ,task:newTask, isCompleted: false },
            {headers: {token:route?.params?.token}});
            setTodos([...todos, { task:newTask, isCompleted: false,taskid:response.data.id }]);
            setNewTask('');
        }     
      } catch (error) {
        console.error('Error adding todo', error);
      }
    };
    const deleteTodo = async (selectedTask:any) => {
      try {
        setIsLoading(true);
        await axios.post('http://localhost:3000/deleteTodo',{taskid:selectedTask}, {headers: {token:route?.params?.token}});       
        setIsLoading(false);
        fetchTodos();
      } catch (error) {
        console.error('Error adding todo', error);
      }
    };

    return ( <View>

  <Text style={{left: 15, fontWeight:"bold"}}>{`Welcome ${route?.params?.username}`}</Text> 
        <View style={styles.container}>
          <Text style={styles.header}> <Image source={require('../assets/icons/to-do-list.png')} style={styles.icon} /> To-Do List</Text>
            <TextInput
               style={styles.input}
                placeholder="Enter a new Task"
                value={newTask}
                onChangeText={setNewTask}
            />
              {error && <Text style={styles.errorText}>{error}</Text>}
            <br/>
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
      {isLoading  ? (<ActivityIndicator size="large" color="#0000ff" />):
            <FlatList
                data={todos}
                renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                        <Text style={styles.todoText}>{item.task}</Text>
                        <TouchableOpacity onPress={() => deleteTodo(item.taskid)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.taskid}
            />}
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  icon: {
    width: 50, // Set the width of the icon
    height: 50, // Set the height of the icon
    right:10
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',

  },
  todoItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  todoText: {
    fontSize: 18,
  },
  deleteText: {
    color: '#FF6347',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default TodoScreen;
