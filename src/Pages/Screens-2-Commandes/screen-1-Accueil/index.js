import {StatusBar, SafeAreaView, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderAccueil from '../../../Components/Headers/header-1-Primary';
import {styles} from './Hooks/styles';
import {COLORS} from '../../../constants/theme';
import Body from './components/Body';
import {useIsFocused} from '@react-navigation/native';
import KeepAwake from 'react-native-keep-awake';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BluetoothManager} from '@brooons/react-native-bluetooth-escpos-printer';
import {
  PRINTER_CONNECTED,
  PRINTER_FAILED,
  PRINTER_INFO,
} from '../../../Redux/Types/Printer';
import {useDispatch, useSelector} from 'react-redux';
import OneSignal from 'react-native-onesignal';
import {GetReservationsData} from '../../../Redux/Actions/Reservations/reservationsActions';
import {useReservation} from '../../Screens-3-Réservations/Reservation--Screen--1/Hooks/useReservation';
import {GetAllCommandes} from '../../../Redux/Actions/Commandes';
import {UsePrinter} from '../../Screens-4-Others/Parametres/imprimante/Hooks/UsePrinter';
import {Txt} from '../../../Components/utils';
import {API_URL_PROD, APP_ID} from '@env';

const Accueil = ({navigation, route}) => {
  const {reconnect} = UsePrinter();

  const [Visible, setVisible] = useState(false);
  const openMenu = () => {
    setVisible(true);
  };
  const dispatch = useDispatch();

  const closeMenu = () => {
    setVisible(false);
  };
  const isFocused = useIsFocused();
  const KeepAwakeApp = () => {
    const interval = setInterval(() => {
      if (isFocused) {
        KeepAwake.activate();
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  };
  // const [Rsr, setRsr] = useState(null);
  // const [Rsr2, setRsr2] = useState(null);
  useEffect(() => {
    KeepAwakeApp();
  }, [isFocused]);

  // KeepAwake.activate();
  const reconnectDevice = async () => {
    let res = await AsyncStorage.getItem('lastDevice');
    let lastDeviceName = await AsyncStorage.getItem('lastDeviceName');
    // console.info('res', res);
    // console.info('lastDeviceName', lastDeviceName);
    if (res) {
      let s = await BluetoothManager.connect(JSON.parse(res));
      if (s) {
        let row = {
          address: res,
          name: lastDeviceName,
        };
        reconnect(row);
      }
    }

    //   setRsr(res);
    //  setRsr2(s);
  };

  useEffect(() => {
    reconnectDevice();
  }, []);


  // const KeepAwakeApp = () => {
  //   const interval = setInterval(() => {
  //     if (isFocused) {
  //       KeepAwake.activate();
  //     }
  //   }, 5000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // };
  // useEffect(() => {
  //   KeepAwakeApp();
  // }, [isFocused]);
 
  const {configHead} = useReservation();
 
  const user_id = useSelector(state => state.auth.user.id);
  let external_id = user_id?.toString();
  // useEffect(() => {
  //   OneSignal.setLogLevel(6, 0);
  //   OneSignal.setAppId(APP_ID);
  //   OneSignal.setExternalUserId(external_id, results => {
  //     if (results.push && results.push.success) {
  //       console.log('results.push.success', results.push.success);
  //       console.log('results.push.success', results);
  //     }
  //   });
 
  //   OneSignal.setNotificationOpenedHandler(notificationResult => {
  //     console.log('OneSignal: notification opened:', notificationResult);
  //     // let data = notificationResult.notification().payload

  //     const {action, notification} = notificationResult;
  //     console.log(action, 'action');
  //     console.log(notification, 'notification');
  //     const data = notification.additionalData;
  //     console.log(data, 'data');
  //     const idReservation = data.data.booking_id;

  //     if (data.type == 'new_booking') {
  //       // navigation.navigate("Reservation")
  //       navigation.navigate('DetailsReservation', {
  //         idReservation: idReservation,
  //       });

  //       GetReservationsData(dispatch, configHead);
  //     } else if (data.type == 'canceled_booking') {
  //       navigation.navigate('DetailsReservation', {
  //         idReservation: idReservation,
  //       });
  //       GetReservationsData(dispatch, configHead);
  //     } else if (data.type == 'new_order') {
  //       navigation.navigate('Commandes');
  //       console.log('new_order',data.type )
  //       GetAllCommandes(dispatch, configHead);
  //     } else if (data.type == 'canceled_order') {
  //       navigation.navigate('Commandes');
  //       GetAllCommandes(dispatch, configHead);
  //     }
  //   });


  // }, []);

  useEffect(() => {
    // OneSignal.setRequiresUserPrivacyConsent(true);
    // OneSignal.provideUserConsent(true);
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(APP_ID);
    OneSignal.setExternalUserId(external_id, results => {
      if (results.push && results.push.success) {
        console.log('results.push.success', results.push.success);
        console.log('results.push.success', results);
      }
    });
  
    // Register the received event listener
    // OneSignal.addEventListener('received', notification => {
    //   console.log('OneSignal: notification received:', notification);
    //   // Handle the received notification here
    //   const { data } = notification.payload.additionalData;
    //   console.log(data, 'data');
    //   const idReservation = data.booking_id;
  
    //   if (data.type === 'new_booking') {
    //     navigation.navigate('DetailsReservation', {
    //       idReservation: idReservation,
    //     });
    //     GetReservationsData(dispatch, configHead);
    //   } else if (data.type === 'canceled_booking') {
    //     navigation.navigate('DetailsReservation', {
    //       idReservation: idReservation,
    //     });
    //     GetReservationsData(dispatch, configHead);
    //   } else if (data.type === 'new_order') {
    //     navigation.navigate('Commandes');
    //     console.log('new_order', data.type);
    //     GetAllCommandes(dispatch, configHead);
    //   } else if (data.type === 'canceled_order') {
    //     navigation.navigate('Commandes');
    //     GetAllCommandes(dispatch, configHead);
    //   }
    // });
    // OneSignal.promptForPushNotificationsWithUserResponse(response => {
    //   console.log("Prompt response:", response);
    // });
    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
      console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
      const notification = notificationReceivedEvent.getNotification();
      console.log("notification:", notification);
      const data = notification.additionalData;
      console.log("additionalData:", data);
    
      // Handle the notification data according to your requirements
      if (data) {
        const idReservation = data.data?.booking_id;
        const notificationType = data.type;
        GetReservationsData(dispatch, configHead);
        GetAllCommandes(dispatch, configHead);
        if (notificationType === 'new_booking') {
          // Handle new booking notification
          console.log("New booking notification:", data);
 
        } else if (notificationType === 'canceled_booking') {
          // Handle canceled booking notification
          console.log("Canceled booking notification:", data);

        } else if (notificationType === 'new_order') {
          // Handle new order notification
          console.log("New order notification:", data);
        } else if (notificationType === 'canceled_order') {
          // Handle canceled order notification
          console.log("Canceled order notification:", data);
        }
      }
    
      // Silence the notification by calling complete() with no argument
      notificationReceivedEvent.complete(notification);
    });
    
    OneSignal.setNotificationOpenedHandler(notificationResult => {
      console.log('OneSignal: notification opened:', notificationResult);
      // let data = notificationResult.notification().payload
  
      const { action, notification } = notificationResult;
      console.log(action, 'action');
      console.log(notification, 'notification');
      const data = notification.additionalData;
      console.log(data, 'data');
      const idReservation = data.data.booking_id;
  
      if (data.type === 'new_booking') {
        // navigation.navigate("Reservation")
        navigation.navigate('DetailsReservation', {
          idReservation: idReservation,
        });
  
        GetReservationsData(dispatch, configHead);
      } else if (data.type === 'canceled_booking') {
        navigation.navigate('DetailsReservation', {
          idReservation: idReservation,
        });
        GetReservationsData(dispatch, configHead);
      } else if (data.type === 'new_order') {
        navigation.navigate('Commandes');
        console.log('new_order', data.type);
        GetAllCommandes(dispatch, configHead);
      } else if (data.type === 'canceled_order') {
        navigation.navigate('Commandes');
        GetAllCommandes(dispatch, configHead);
      }
    });
  
    // Clean up the event listener when it's no longer needed
    return () => {
      OneSignal.removeEventListener('received');
    };
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.gray} barStyle="light-content" />
      <HeaderAccueil
        navigation={navigation}
        Color={COLORS.gray}
        openMenu={openMenu}
        Visible={Visible}
        closeMenu={closeMenu}
      />

      {/* <View style={{padding: 20}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Test');
          }}>
          <Txt color={COLORS.white} >ToTest</Txt>
        </TouchableOpacity>
      </View> */}

      {/* <Txt color={COLORS.white}>{!Rsr? 'null'  :Rsr}</Txt>
      <Txt color={COLORS.white}>{!Rsr2 ? 'null': Rsr2}</Txt> */}
      <Body navigation={navigation} />
      {/* {!Rsr && <Txt color={COLORS}>{Rsr} resSSSS</Txt>}
      {Rsr2 && <Txt>{Rsr2}</Txt>} */}
    </SafeAreaView>
  );
};

export default Accueil;

// try {
//   if (res) {
//     let s = await BluetoothManager.connect(res);

//     let row = {
//       address: res,
//       name: lastDeviceName,
//     };
//     if (s) {
//       reconnect(row);
//     }
//     dispatch({type: PRINTER_INFO, payload: res});
//     let obj = {
//       address: res,
//       name: lastDeviceName,
//     };
//     dispatch({
//       type: PRINTER_CONNECTED,
//       payload: obj,
//     });
//   } else {
//     // dispatch({
//     //   type: PRINTER_FAILED,
//     //   payload: 'failed to reconnect bluetooth',
//     // });
//     console.log("'failed to reconnect bluetooth'");
//   }
// } catch (error) {
//   // alert(error);
//   console.log('herrrrrre', error);
// }

// if (res) {
//   try {
//     BluetoothManager.autoConnect(res)
//       .then(() => {
//         console.log('Successfully connected to printer');
//         // Do any printing or other Bluetooth-related tasks here
//         console.warn('Successfully connected to printer');
//       })
//       .catch(error => {
//         console.log(`Failed to connect to printer: ${error}`);
//         console.warn(`Failed to connect to printer: ${error}`);
//       });
//   } catch (error) {
//     console.warn(error);
//   }
// }

// new Promise((resolve, reject) => {
//     .then(res => {
//       console.log('res', res)
//       if (res !== null) {
//         resolve(true);

//         BluetoothManager.connect(JSON.parse(res).address).then(
//           s => {
//             // this.setState({
//             // loading:false,
//             // boundAddress:JSON.parse(res).address,
//             // name:JSON.parse(res).name || JSON.parse(res).address
//             // })
//             // dispatch({type: PRINTER_CONNECTED, payload: JSON.parse(res).address});
//             dispatch({type: PRINTER_INFO, payload: JSON.parse(res)});

//             /*for debugging*/
//             alert(
//               'Connected again! Device: ' +
//                 s +
//                 ', name is: ' +
//                 JSON.parse(res).name +
//                 ', adress is: ' +
//                 JSON.parse(res).address,
//             );
//           },
//           e => {
//             dispatch({type: PRINTER_FAILED, payload: e});

//             // this.setState({
//             //   loading: false,
//             // });
//             // alert(e);
//             // alert("Hi :" + e);
//             console.log(e);
//           },
//         );

//         // this.setState({
//         //   deviceAddress: JSON.parse(res).address,
//         //   isLoading_reconnect: false,
//         // });
//         dispatch({
//           type: PRINTER_CONNECTED,
//           payload: JSON.parse(res).address,
//         });

//         // alert("Result reconnect is: " + res);
//         // console.log("Result reconnect is: " + res)
//       } else {
//         resolve(false);
//         // alert("Result reconnect is: " + res);
//         // console.log("Result reconnect is: " + res)
//       }
//     })
//     .catch(err => {
//       reject(err);
//       alert('Failed to get data. Contact admin');
//     });
// // });
