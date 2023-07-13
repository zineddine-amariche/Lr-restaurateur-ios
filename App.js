/**
 * Created by Amariche zineedine on 2021/11/03.
 * Modified by Amariche zineedine on 2023/07/13.
 */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';

import {useDispatch} from 'react-redux';
import RootLiveRestoApp from './src/Services/AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View} from 'react-native';
import {COLORS} from './src/constants/theme';
import {dispatchLogin} from './src/Redux/Actions/Login';

import {QueryClientProvider, QueryClient} from 'react-query';

const App = () => {
  const dispatch = useDispatch();

  const [checkAsyc, setcheckAsyc] = useState(false);

  const Fetching = async () => {
    let login = await AsyncStorage.getItem('login');
    let password = await AsyncStorage.getItem('password');
    let configHead = {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'fr',
      },
    };
    if (login && password) {
      let obj = {
        password,
        login,
      };
      dispatchLogin(dispatch, configHead, obj);
      setcheckAsyc(true);
    } else {
      setcheckAsyc(true);
    }
  };

  useEffect(() => {
    Fetching();
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
