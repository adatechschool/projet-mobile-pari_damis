import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getNextSaturday } from '../utils/getNextSaturday'

const Match = ({route}) => {
  const [matchs, setMatchs] = useState(null)
  console.log(route.params);
  useEffect(()=>{
    const fetch = async () => {
      const res = 0
      if (res){
        setMatchs(res)
      }
    }
    fetch()
  },[])
  return (
    <View>
      <Text>Match</Text>
    </View>
  )
}

export default Match

const styles = StyleSheet.create({})