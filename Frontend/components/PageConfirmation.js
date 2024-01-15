import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Button, Dimensions} from 'react-native'
//import React from 'react'

//const {width, height} = Dimensions.get('window') //detection dela dimension ecran

const PageConfirmation = () => {
  return (
    <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}>
        <Text style={styles.Confirmation}>Confirmation</Text>
        <Text style={styles.pa}>PA</Text>
        <Text style={styles.connecter}>Vous êtes connecté.</Text>
        <Button
            title="TERMINER"
            color="red"
            colorText="white"
            titleStyle={{ textAlignVertical: "center" }}
            //onPress={() => navigation.navigate("Signup")} a chenger : 'signup' par 'overboard'
          />
    </View>
  )
}
export default PageConfirmation();

const styles = StyleSheet.create({
    Confirmation:{

    },
    pa:{

    },
    connecter:{

    }
})
