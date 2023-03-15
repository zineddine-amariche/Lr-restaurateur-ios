// App.js
import { Row } from "native-base";
import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import BackgroundTimer from "react-native-background-timer"


const TimerLine = ({timerOn,input,secondsLeft,setSecondsLeft}) => {
 

 



  // Runs when timerOn value changes to start or stop timer
  useEffect(() => {
    if (timerOn) startTimer();
    else BackgroundTimer.stopBackgroundTimer();
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [timerOn]);
console.log(timerOn,'timeron')
  // Checks if secondsLeft = 0 and stop timer if so
  useEffect(() => {
    if (secondsLeft === 0) BackgroundTimer.stopBackgroundTimer()
  }, [secondsLeft])

  const clockify = () => {
    let hours = Math.floor(secondsLeft / 60 / 60)
    let mins = Math.floor((secondsLeft / 60) % 60)
    let seconds = Math.floor(secondsLeft % 60)
    let displayHours = hours < 10 ? `0${hours}` : hours
    let displayMins = mins < 10 ? `0${mins}` : mins
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds
    return {
      displayHours,
      displayMins,
      displaySecs,
    }
  }


  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => {
        if (secs > 0) return secs - 1
        else return 0
      })
    }, 1000)
  }


  const currentDate = secondsLeft;
  return (

    <View style={styles.containerH}>
      <View  style={styles.time}>
        <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>
        {clockify().displayHours > 0 ?clockify().displayHours +"h" : null}
          {clockify().displaySecs} Sec
        </Text>
      </View>
    </View>


  )
}
const styles = StyleSheet.create({
  containerH: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    
    
    alignSelf:'center',
   
   
    
  },
  time: {
    paddingVertical: 8,
    justifyContent:'center',
    alignItems:'center',
  },
  btn: {
    width: '30%',
    height: 45,
    backgroundColor: '#087',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 26,
  },

  titleH3: {
    fontSize: 18,
    color: "#fff",
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleH1: {
    fontSize: 20,
    color: "#fff",
    
  },
  timeChose: {
    margin: 5,
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#000'
  }
})
export default TimerLine