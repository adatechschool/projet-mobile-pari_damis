import { StyleSheet, Text, View, TouchableOpacity,SafeAreaView,TextInput,Button,Image} from 'react-native'
import React, { useState } from 'react'
import { IP } from '@env';
import * as SecureStore from 'expo-secure-store';


//const {width, height} = Dimensions.get('window') //detection dela dimension ecran

const Account = ({setUser,user}) => {
  const User = user.user
  const [state, setState] = useState({
    Pseudo: User.Pseudo,
    Firstname: User.Firstname
  });

  const handleInputChange = (name ,value) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit=(e)=>{
    try {
      e.preventDefault()
      console.log("insubmit")
      const { Pseudo, Firstname } = state;
      console.log("pseudo",Pseudo)
      console.log("firstname",Firstname)
      // let formdata = new FormData();

      // formdata.append("product[name]", 'test')
      // formdata.append("product[price]", 10)
      // formdata.append("product[category_ids][]", 2)
      // formdata.append("product[description]", '12dsadadsa')
      // formdata.append("product[images_attributes[0][file]]", {uri: photo.uri, name: 'image.jpg', type: 'image/jpeg'})
      // fetch('url',{
      //   method: 'post',
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   body: formdata
      //   }).then(response => {
      //     console.log("image uploaded")
      //   }).catch(err => {
      //     console.log(err)
      //   })  

    
  



    } catch (error) {
      
    }



  }

 


  
  

  return (
    <>
    <View style={styles.container}>
      <Text>Account</Text>
      <TouchableOpacity style={styles.customButton} onPress={async()=>{
        await SecureStore.deleteItemAsync("user")
        setUser(null)
      }}><Text style={styles.buttonText}>Se déconnecter</Text></TouchableOpacity>
    </View>

    <SafeAreaView>
      <TextInput
        style={styles.input}
        name="Pseudo"
        value={state.Pseudo}
        onChangeText={(txt)=>handleInputChange("Pseudo",txt)}
      />
      <TextInput
        style={styles.input}
        name="Firstname"
        value={state.Firstname}
        onChangeText={(txt)=>handleInputChange("Firstname",txt)}
        keyboardType="numeric"
      />
     <Image 
  source={{ uri: `http://${IP}:3001/static/avatar/${User.PathOfAvatar}`}}
  style={{width: 200, height: 200}}
/>
       <Button title="Submit" onPress={handleSubmit} />
    </SafeAreaView>
 
      {/* <View style={styles.form}>
        <Form>
          <Input name="name" label="Name" value={User.Pseudo} />
          <Input name="email" label="Email" />
          <Input name="password" label="Password" secureTextEntry={true} />
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </Form>
      </View> */}

    </>
  )
}

export default Account

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "black",
    alignItems:"center",
    justifyContent: "center",
    
  },
  customButton: {
    borderBottomColor: "red",
    backgroundColor: "red",
    padding: 10,
    margin: 5,
    marginTop: 20,
    borderRadius: 8,
    width: 350,
    
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    alignItems: "center",
    textAlign: "center",
  },
  form: {
    color: "white",
    fontWeight: "700",
    alignItems: "center",
    textAlign: "center",
  },

})