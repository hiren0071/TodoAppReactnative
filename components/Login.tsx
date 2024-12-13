import React, { useState } from 'react';
import { View, TextInput, Button, Text,StyleSheet,TouchableOpacity } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }: any) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            if(!username){
                setError("Please enter user name");
                return;
            }else{
                setError("");
                 const response=await axios.post('http://localhost:3000/login', {userid: username });
                 if(response){
                    setUsername("");
                    navigation.navigate('Todos',{"username":username,"token":response.data}); 
                 }
            }
        } catch (e) {
            setError('Login failed');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>To-Do App</Text>
            <TextInput  style={styles.input} placeholder="Username" onChangeText={setUsername} value={username} />           
            <TouchableOpacity style={styles.addButton} onPress={handleLogin}>
           <Text style={styles.addButtonText}>Login</Text>
           </TouchableOpacity>
           {error && <Text style={styles.errorText}>{error}</Text>}
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

    }
  });

export default LoginScreen;
