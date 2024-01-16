
import React from "react";
import { StyleSheet, Text, View,ScrollView,Button,Image } from "react-native";

//const {width, height} = Dimensions.get('window') //detection dela dimension ecran

<<<<<<< HEAD
// const Home = ({ navigation }) => {
const Home = () => {
=======
const Home = () => {

  const data = [
    { imageSource:require('../assets/icon.png'), text: "combat 1"},
    { imageSource:require('../assets/icon.png'), text: "combat 2"},
    { imageSource:require('../assets/icon.png'), text: "combat 3"},
    { imageSource:require('../assets/icon.png'), text: "combat 4"},
    { imageSource:require('../assets/icon.png'), text: "combat 5"},
   
    // Add more image sources as needed
  ];
>>>>>>> 0243b2e8551b3ad1b719f5154d652dbd7b6a38da
  return (
    <View style={{ flex: 1, backgroundColor:"black" }}>
    <ScrollView>
      <View style={{ padding: 16 }}>
       
        <View style={{ marginBottom: 16 }}>
            <Image style={{ width: "100%", height: 200,top:40}} source={require('../assets/icon.png')} />
          <View style={{ flexDirection: 'row', }}>
           
            <View style={{ marginLeft: 16 }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold',top:50,textAlign:"center",color:"white" }}>Combat Vedette</Text>
              <Text style={{top:60,textAlign:"center",color:"white"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
            
            </View>
          </View>
          
        </View>

       
          {/* <View style={{ marginVertical: 16, borderBottomWidth: 1, borderBottomColor: 'white' }} /> */}
        <View style={{ marginBottom: 16 }}>
          <View style={{flexDirection:"row", justifyContent:"space-between" }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold',top:100,textAlign:"left",color:"white" }}>Catégorie 1</Text>
            <Text style={{ fontSize: 15, fontWeight: '300',top:105,textAlign:"right",color:"white" }}>Voir plus</Text>
          </View>
          
         <ScrollView horizontal={true}style={styles.scrollView} >

          
            <View style={{flexDirection:"row"}}>
      


            {data.map((item, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image style={styles.image} source={item.imageSource} />
          <Text   style={styles.card}>{item.text}</Text>

        </View>
      ))}
            </View>
            </ScrollView>
        
        </View>
        <View style={{ marginBottom: 16 }}>
          <View style={{flexDirection:"row", justifyContent:"space-between" }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold',top:100,textAlign:"left",color:"white" }}>Catégorie 2</Text>
            <Text style={{ fontSize: 15, fontWeight: '300',top:105,textAlign:"right",color:"white" }}>Voir plus</Text>
          </View>
         <ScrollView horizontal={true}style={styles.scrollView} >

          
            <View style={{flexDirection:"row"}}>
      


            {data.map((item, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image style={styles.image} source={item.imageSource} />
          <Text   style={styles.card}>{item.text}</Text>

        </View>
      ))}
            </View>
            </ScrollView>

        </View>
      </View>
    </ScrollView>
  </View>
  );
};
export default Home;

const styles = StyleSheet.create({

  scrollView: {
    flexDirection: 'row',
    // padding: 60,
    paddingBottom:110
    
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    top:110
  }, 
  card: {
    fontSize: 15,
     fontWeight: '300',
     top:105,
     textAlign:"center",
     color:"white",
     marginTop:10
  }
});
