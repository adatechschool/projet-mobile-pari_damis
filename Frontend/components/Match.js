import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const Match = () => {
  const [matchs, setMatchs] = useState(null)
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