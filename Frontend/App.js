import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Overboard from "./components/Overboard";
import Loading from "./components/Loading";
import Home from "./components/Home";
import Search from "./components/Search";
import Detail from "./components/Detail";
import Group from "./components/Group";
import PageGroup from "./components/PageGroup";
import MyTabs from "./Navigation/MyTabs";
import PageConfirmation from "./components/PageConfirmation";
import GroupeDetails from "./components/GroupeDetails";
import MyGroupScreen from "./components/MyGroupScreen";
import CreateGroup from "./components/CreateGroup";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MyGroupScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerBackTitleStyle: { fontSize: 20 },
          headerTitleStyle: { color: "black" },
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{
            headerStyle: {
              backgroundColor: "black",
            },
            headerTintColor: "black",
          }}
        />
        <Stack.Screen name="Overboard" component={Overboard} />
        <Stack.Screen name="PageConfirmation" component={PageConfirmation} />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerBackTitle: "Accueil", title: null }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: null }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerStyle: { backgroundColor: "black" } }}
        />
        <Stack.Screen name="Detail" component={Detail} />
        {/* <Stack.Screen name="Group" component={Group} /> */}
        {/* <Stack.Screen name="PageGroup" component={PageGroup} /> */}
        <Stack.Screen
          name="MyTabs"
          options={{ headerShown: false }}
          component={MyTabs}
        />
        <Stack.Screen name="GroupeDetails" component={GroupeDetails} />
        <Stack.Screen name="MyGroupScreen" component={MyGroupScreen} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
