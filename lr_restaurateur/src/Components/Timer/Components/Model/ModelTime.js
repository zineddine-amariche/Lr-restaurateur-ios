import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React ,{useEffect} from 'react';
import UseModelTimer from './UseModelTimer';
import imgClose from '../../../../assets/Info/x(1).png';
import {styles} from './Styles';
import {dispatchClosingRestaurant} from '../../../../Redux/Actions/closingRestaurant';
import {useDispatch, useSelector} from 'react-redux';
import {startTimer} from '../../../../Redux/Actions/Timer';
import { CloseCommandes } from '../../../../Redux/Actions/Commandes';
import { ADD_SECONDS } from '../../../../Redux/Types/Timer';

const {width, height} = Dimensions.get('screen');

const ModelTime = ({
  visible,
  ActiveTimer,
  timerOn,
  setTimerOn,
  close,
  ActiveOther,
  settimeLeft
}) => {
  const auth = useSelector(state => state.auth);
  const {Token,login,establishments} = auth;
  const dispatch = useDispatch();

  let configHead = {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'fr',
      Authorization: 'Bearer ' + Token,
      login:login?.login,
      establishment:establishments?.id
    },
  };

  let obj ={
    time:"endofday"
  }
 
  const closingRestaurantTime = useSelector((state) => state.ClosingRestaurant);
  const timeEnd=closingRestaurantTime?.result?.data?.time
  const timeClose= timeEnd*60

  const dispatchTimeclose=(val)=>{
    ActiveTimer(val);
    startTimer(dispatch, true);
    settimeLeft(val)
  }

  //   useEffect(() => {
  //   if(timeEnd){
  //     console.log(timeEnd,'timeend')
  //     ActiveTimer(timeClose);
  //     console.log(timeClose)
  //     startTimer(dispatch, true);
  //    settimeLeft(timeClose)
  //   }
    
  
   
  // }, [timeEnd])
  
  return (
    <UseModelTimer transparent visible={visible}>
      <View style={styles.ConatinerClose}>
        <TouchableOpacity onPress={close}>
          <Image source={imgClose} color={'#078'} size={35} />
        </TouchableOpacity>
      </View>

      <View style={styles.Title}>
        <Text style={styles.TextTitle}>Durée de fermeture</Text>
      </View>

      <View style={styles.body}>
        <TouchableOpacity
          style={styles.timeChose}
          onPress={() => {
             dispatchClosingRestaurant(dispatch, configHead, {time:15},close,dispatchTimeclose);
            ActiveTimer(900);
            startTimer(dispatch, true);
            settimeLeft(900)
          }}>
          <Text style={styles.TextBtn}>15 Min</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.timeChose}
          onPress={() => {
            dispatchClosingRestaurant(dispatch, configHead, {time: 30},close,dispatchTimeclose);
            ActiveTimer(1800);
             startTimer(dispatch, true);
            settimeLeft(1800)
          }}>
          <Text style={styles.TextBtn}>30 Min</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.timeChose}
          onPress={() => {
            dispatchClosingRestaurant(dispatch, configHead, {time: 45},close,dispatchTimeclose);
            ActiveTimer(2700);
             startTimer(dispatch, true);
            settimeLeft(2700)
          }}>
          <Text style={styles.TextBtn}>45 Min</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.timeChose}
          onPress={() => {
            dispatchClosingRestaurant(dispatch, configHead, {time: 60},close,dispatchTimeclose);
            ActiveTimer(3600);
             startTimer(dispatch, true);
            settimeLeft(3600)
          }}>
          <Text style={styles.TextBtn}>60 Min</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.timeChose}
          onPress={() => {
            //dispatchClosingRestaurant(dispatch, configHead, {"time":"endofday"});
            // ActiveOther();
          
            dispatchClosingRestaurant(dispatch, configHead, obj,close,dispatchTimeclose);
            

          //   ActiveTimer(timeClose);
          //   console.log(dispatch,'time')
          //   startTimer(dispatch, true);
          // settimeLeft(timeClose)
            // dispatchTimeclose()
           
          
            

          }}>
          <Text style={styles.TextBtn}>Fin journée </Text>
        </TouchableOpacity>
      </View>
    </UseModelTimer>
  );
};

export default ModelTime;

// <TouchableOpacity
// style={[
//   {
//     borderRadius: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#087',
//     paddingHorizontal: 20,
//     height: height * 0.05,
//     marginTop: 15,
//   },
// ]}
// onPress={start}>
// <Text style={[{color: '#fff', fontSize: 15, fontWeight: 'bold'}]}>
//   {timerOn ? 'Stop' : 'démmarer'}
// </Text>
// </TouchableOpacity>
