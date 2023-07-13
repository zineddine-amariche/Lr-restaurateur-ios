import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {styles} from './Hooks/styles';
import {View, StatusBar, Vibration, SafeAreaView} from 'react-native';
import Header from '../../../Components/Headers/header-1-Primary';
import {COLORS} from '../../../constants/theme';
import {GetAllCommandes} from '../../../Redux/Actions/Commandes';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useCommandes} from './Hooks/useCommandes';
import Sound from 'react-native-sound';
import {
  COMMANDES_BY_STATUS,
  STATUS_ACTIVE,
} from '../../../Redux/Types/Commandes';
import ToastMessages from '../../../Components/ToastMessages';
import KeepAwake from 'react-native-keep-awake';
import Laoder from '../../../Components/Laoder';
import BackgroundTimer from 'react-native-background-timer';
import ButtonsTabsMenue from '../../../Components/Buttons/TabsButtons/ButtonsTabsMenue';
import Timer from '../../../Components/Timer';
import {startTimer} from '../../../Redux/Actions/Timer';
import {CHANGE_STYLES} from '../../../Redux/Types/Timer';
import {GetReservationsData} from '../../../Redux/Actions/Reservations/reservationsActions';
import {Modalize} from 'react-native-modalize';
import {Head, Txt} from '../../../Components/utils';
import UseCheck from '../../../Components/Buttons/customCheckBox';
import Space from '../../../Components/Space';
import ButtonValidate from '../../Screens-3-Réservations/Reservation--Screen--1/Components/saveRedervation/components/Button';

const LazySectionTYpe = React.lazy(() => import('./Components/SectionType'));
const Commandes = ({navigation}) => {
  const [Visible, setVisible] = useState(false);
  const [timerOn, setTimerOn] = useState(false);
  const [timeLeft, settimeLeft] = useState(second_selected);
  const isFocused = useIsFocused();
  const {Token} = useSelector(state => state.auth);
  const {error, type} = useSelector(state => state.Printer);

  const {toComfirm} = useSelector(state => state.Commandes);
  const {isTimerActive, second_selected} = useSelector(
    state => state.TimerSlice,
  );

  const {
    mergedArray,
    configHead,
    dispatch,
    ToCommandes,
    ToReservation,
    setStatus,
  } = useCommandes();

  const openMenu = () => {
    setVisible(true);
  };
  const closeMenu = () => {
    setVisible(false);
  };
  const stopVib = () => {
    Vibration.cancel();
  };
  // useLayoutEffect(() => {
  //   const interval = setInterval(() => {
  //     if (toComfirm || others) {
  //       try {
  //         if (isFocused) {
  //           if (!toComfirm) {
  //             dispatch({type: LOADING});
  //           }
  //           GetAllCommandes(dispatch, configHead);
  //           GetReservationsData(dispatch, configHead);
  //         }
  //       } catch (e) {
  //         console.log('------22-', e);
  //       }
  //     }
  //   }, 30000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [Token, isFocused, refresh]);

  useEffect(() => {
    if (isFocused) {
      GetReservationsData(dispatch, configHead);
      GetAllCommandes(dispatch, configHead);
    }
  }, [isFocused]);

  var Filter = mergedArray.filter(data => {
    return data.kitchenstate_id == 20;
  });

  //keep the sound runnig on background
  useEffect(() => {
    if (toComfirm?.length !== 0) startSounder();
    else BackgroundTimer.stopBackgroundTimer();
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [toComfirm.length, isFocused]);

  let soundUrl = require('../../../../android/app/src/main/res/raw/son.mp3');

  const startSounder = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      if (Filter?.length == 0) {
        stopVib();
        console.log('stop');
        KeepAwake.activate();
      } else if (Filter.length !== 0) {
        var mySound = new Sound(soundUrl, error => {
          if (error) {
            console.log(
              'Error loading sound: ' + JSON.stringify(error.message),
            );
            return;
          } else {
            if (Filter.length !== 0) {
              mySound.play(success => {
                // console.log('success', success)
                if (success) {
                  mySound.setNumberOfLoops(Filter.length);
                  mySound.getNumberOfLoops();
                  mySound.release();
                  mySound.setVolume(0.9);
                  KeepAwake.activate();
                } else {
                  console.log('Issue playing file');
                }
              });
            }
          }
        });
      }
    }, 5000);
  };

  const routes = useRoute();

  useEffect(() => {
    if (
      (routes.name === 'Commandes' || 'Reservations') &&
      isTimerActive &&
      second_selected
    ) {
      startTimer(dispatch, false);
      setTimeout(() => {
        startTimer(dispatch, true);
      }, 500);
    }
  }, [isFocused, routes.name]);

  useEffect(() => {
    if (timeLeft == 0) {
      BackgroundTimer.stopBackgroundTimer();
      startTimer(dispatch, false);
      dispatch({type: CHANGE_STYLES, payload: false});
    }
  }, [timeLeft]);

  const modalRef = useRef(null);

  const onOpen = () => {
    modalRef.current?.open();
  };

  const [Data, setdata] = useState(dataCheck);
  const [arr, setA] = useState([]);

  // const HandelChangeCheck = item => {
  //   let data = [...dataCheck];
  //   let index = data.findIndex(x => x.id === item);
  //   data[index].isCheck = data[index].isCheck === false ? true : false;

  //   var Filter = data.filter(data => {
  //     return data.isCheck == true;
  //   });

  //   let filterValues = Filter.map(i => {
  //     return i.id;
  //   });

  //   // console.log('filterValues', filterValues);
  //   setdata(data);
  //   setA(filterValues);
  // };


  // const HandelChangeCheck = (item) => {
  //   let data = [...dataCheck];
  //   let index = data.findIndex((x) => x.id === item.id);
  
  //   // Selecting the first item selects all items
  //   if (index === 0) {
  //     const selectAll = data[0].isCheck === false;
  
  //     data = data.map((i, idx) => {
  //       return {
  //         ...i,
  //         isCheck: selectAll,
  //       };
  //     });
  //   } else {
  //     // Deselecting the first item if it was previously selected
  //     if (data[0].isCheck) {
  //       data[0].isCheck = false;
  //     }
  
  //     // Deselecting all other items and selecting the current item
  //     data = data.map((i, idx) => {
  //       return {
  //         ...i,
  //         isCheck: idx === 0 ? false : false, // Deselect all except the first item
  //       };
  //     });
  
  //     data[index].isCheck = true;
  //   }
  
  //   const filterValues = data.filter((i) => i.isCheck).map((i) => i.id);
  //   setdata(data);
  //   setA(filterValues);
  // };
   
  
 

  
  //   const HandelChangeCheck = (item) => {
  //   let data = [...dataCheck];
  //   let index = data.findIndex((x) => x.id === item.id);
  
  //   // Selecting the first item selects all items
  //   if (index === 0) {
  //     const selectAll = data[0].isCheck === false;
  
  //     data = data.map((i, idx) => {
  //       return {
  //         ...i,
  //         isCheck: selectAll,
  //       };
  //     });
  //   } else if (index > 0) {
  //     // Deselecting the first item if it was previously selected
  //     if (data[0].isCheck) {
  //       data[0].isCheck = false;
  //     }
  
  //     // Deselecting all other items and selecting the current item
  //     data = data.map((i, idx) => {
  //       if (idx === 0) {
  //         return i;
  //       } else if (idx === index) {
  //         return {
  //           ...i,
  //           isCheck: true,
  //         };
  //       } else {
  //         return {
  //           ...i,
  //           isCheck: false,
  //         };
  //       }
  //     });
  //   }
  
  //   const filterValues = data.filter((i) => i.isCheck).map((i) => i.id);
  //   setdata(data);
  //   setA(filterValues);
  // };
  
  const HandelChangeCheck = (item) => {
    let data = [...dataCheck];
    let index = data.findIndex((x) => x.id === item.id);
  
    if (index === 0) {
      // Clicked on "Toutes" item
      const allChecked = data.every((x) => x.isCheck);
      data.forEach((x) => {
        x.isCheck = !allChecked;
      });
    } else {
      // Clicked on other items
      data[index].isCheck = !data[index].isCheck;
      data[0].isCheck = false; // Deselect "Toutes" item
    }
  
    const filterValues = data.filter((x) => x.isCheck).map((x) => x.id);
    
    setdata(data);
    setA(filterValues);
  };
  
  const onClose = () => {
    if (arr.length) {
      const filteredItems = mergedArray.filter(item =>
        arr.includes(item.kitchenstate_id),
      );
      dispatch({type: STATUS_ACTIVE, payload: arr});
      dispatch({type: COMMANDES_BY_STATUS, payload: filteredItems});
    } else {
      dispatch({type: STATUS_ACTIVE, payload: 'Toutes'});
      dispatch({type: COMMANDES_BY_STATUS, payload: []});
    }

    setTimeout(() => {
      modalRef.current?.close();
    }, 200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <Header
        navigation={navigation}
        Color={COLORS.primary}
        openMenu={openMenu}
        closeMenu={closeMenu}
        Visible={Visible}
      />
      {error && <ToastMessages type={type} error={error} />}

      <ButtonsTabsMenue
        ToCommandes={ToCommandes}
        ToReservation={ToReservation}
        navigation={navigation}
      />
      <>
        <Timer
          setTimerOn={setTimerOn}
          timerOn={timerOn}
          isFocused={isFocused}
          timeLeft={timeLeft}
          settimeLeft={settimeLeft}
        />

        <React.Suspense fallback={<Laoder />}>
          <LazySectionTYpe navigation={navigation} onOpen={onOpen} />
        </React.Suspense>
      </>

      <Modalize
        snapPoint={350}
        ref={modalRef}
        overlayStyle={{
          backgroundColor: COLORS.transparentPrimray,
        }}
        adjustToContentHeight={false}>
        <ContentRenders
          Data={Data}
          HandelChangeCheck={HandelChangeCheck}
          onClose={onClose}
        />
      </Modalize>
    </SafeAreaView>
  );
};

export default Commandes;

let dataCheck = [
  {
    name: 'Toutes',
    color: COLORS.black,
    isCheck: true,
    id: 10,
    status: 'Toutes',
  },  
  {
    name: 'En attente',
    color: COLORS.red,
    isCheck: true,
    id: 20,
    status: 'À préparer',
  },
  {
    name: 'En cuisine',
    color: COLORS.Jaune,
    isCheck: true,
    id: 30,
    status: 'En Cuisine',
  },
  {
    name: 'Commandes prêtes',
    color: COLORS.green,
    isCheck: true,
    id: 40,
    status: 'Prêtes',
  },
];

const ContentRenders = ({HandelChangeCheck, onClose, Data}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        padding: 16,
        marginTop: 30,
      }}>
      <Head style={styles.Head}>Trier par :</Head>
      <Space space={30} />
      <View>
        {Data.map((i, index) => {
          return <UseCheck item={i} HandelChangeCheck={HandelChangeCheck} />;
        })}
      </View>
      <Space space={30} />
      <ButtonValidate isSubmitting={false} handleSubmit={onClose}>
        Validate
      </ButtonValidate>
    </View>
  );
};


  

  