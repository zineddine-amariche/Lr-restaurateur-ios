import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  useColorScheme,
  RefreshControl,
} from 'react-native';
import React from 'react';
import {styles} from './Styles';
import {COLORS} from '../../../../../constants/theme';
import CardAtt from '../Card-1';

import CardEn from '../Card-2';
import ChildrenCop from '../Childern/Children';
import {useDispatch, useSelector} from 'react-redux';
import {useReservation} from '../../Hooks/useReservation';
import {GetReservationsData} from '../../../../../Redux/Actions/Reservations/reservationsActions';
import {GetAllCommandes} from '../../../../../Redux/Actions/Commandes';
import {useNavigation} from '@react-navigation/native';

const SectionType = ({dataList, ...ListProps}) => {
  const {ActiveButton, pending, AcitvePopUpV, FiltredList, onSearch} =
    ListProps;
  const Printer = useSelector(state => state.Printer);
  const {error, type} = Printer;

  const navigation = useNavigation();

  const ItemsRender = ({item, navigation, AcitvePopUpV}) => {
    if (!ActiveButton) {
      return (
        <CardAtt
          item={item}
          navigation={navigation}
          AcitvePopUpV={AcitvePopUpV}
        />
      );
    }
    if (ActiveButton) {
      return <CardEn item={item} navigation={navigation} />;
    }
  };
  const colorScheme = useColorScheme();

  const {configHead} = useReservation();

  const Tablet = useSelector(state => state.IsTab);
  const {IsTab} = Tablet;
  const {loading} = useSelector(state => state.getReservations);

  const dispatch = useDispatch();

  const onRefresh = () => {
    GetReservationsData(dispatch, configHead);
    GetAllCommandes(dispatch, configHead);
  };

  return (
    <View style={styles.FlatList}>
      {error && type && <ChildrenCop error={error} type={type} />}

      {ActiveButton ? (
        onSearch ? (
          FiltredList.length !== 0 ? (
            <FlatList
              data={FiltredList}
              refreshControl={
                // Add the RefreshControl component
                <RefreshControl refreshing={loading} onRefresh={onRefresh} />
              }
              renderItem={({item, index}) => {
                return (
                  <ItemsRender
                    item={item}
                    navigation={navigation}
                    AcitvePopUpV={AcitvePopUpV}
                  />
                );
              }}
              numColumns={IsTab ? 2 : 1}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.wrapper}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>la liste est vide</Text>
            </View>
          )
        ) : dataList.length !== 0 ? (
          <FlatList
            data={dataList}
            refreshControl={
              // Add the RefreshControl component
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
            renderItem={({item, index}) => {
              return (
                <ItemsRender
                  item={item}
                  navigation={navigation}
                  AcitvePopUpV={AcitvePopUpV}
                />
              );
            }}
            numColumns={IsTab ? 2 : 1}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.wrapper}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{color: colorScheme == 'dark' ? COLORS.red : COLORS.red}}>
              la liste est vide
            </Text>
          </View>
        )
      ) : pending.length !== 0 ? (
        <FlatList
          data={pending}
          refreshControl={
            // Add the RefreshControl component
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
          renderItem={({item, index}) => {
            return (
              <ItemsRender
                item={item}
                navigation={navigation}
                AcitvePopUpV={AcitvePopUpV}
              />
            );
          }}
          numColumns={IsTab ? 2 : 1}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.wrapper}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{color: colorScheme == 'dark' ? COLORS.red : COLORS.red}}>
            la liste est vide
          </Text>
        </View>
      )}
    </View>
  );
};

export default SectionType;
