/**
 * Created by Amariche zineedine on 2021/11/03.
 * Modified by Amariche zineedine on 2022/03/15.
 */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';

import {useDispatch, useSelector} from 'react-redux';
import RootLiveRestoApp from './src/Services/AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View} from 'react-native';
import {COLORS} from './src/constants/theme';
import {
  dispatchGetInformation,
  dispatchLogin,
  dispatchLoginStorage,
} from './src/Redux/Actions/Login';
import {isTablet} from './src/Redux/Actions/isTab';
import {LOGIN_FAILED, LOGIN_SUCCESS} from './src/Redux/Types/Login';

import {QueryClientProvider, QueryClient} from 'react-query';
import {persistStore} from 'redux-persist';
import store from './src/Redux/Store';

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const {Token, establishments, login} = auth;

  // console.log(auth,'auth')
  // let configHead = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Accept-Language": "fr",
  //     accept: "application/json",
  //     Authorization: "Bearer " + Token,
  //     login:login?.login,
  //     establishment:establishments?.id
  //   },
  // };

  const [checkAsyc, setcheckAsyc] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      try {
        let login = await AsyncStorage.getItem('login');
        let password = await AsyncStorage.getItem('password');

        let configHead = {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'fr',
          },
        };

        let obj = {
          password,
          login,
        };
        dispatchLogin(dispatch, configHead, obj);

        setcheckAsyc(true);
      } catch (error) {
        error,
           dispatch({ type: LOGIN_FAILED, payload: "échec de connexion !" }),
          console.log('error.local', error.message);
        console.log('------33-', error);
      }
    }, 1000);
  }, []);

  const queryClient = new QueryClient();

  const Loading = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  };
  return (
    <PaperProvider>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          {checkAsyc ? <RootLiveRestoApp /> : <Loading />}
        </QueryClientProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
