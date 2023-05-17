import {View, Image, useWindowDimensions, Linking} from 'react-native';
import React from 'react';
import image from '../../../assets/Accueil/logo-lV.png';
import I3 from '../../../assets/Accueil/V_2.png';
import {TouchableOpacity} from 'react-native';
import styles from './Hooks/styles';
import {useSelector} from 'react-redux';
import {useCommandes} from '../../../Pages/Screens-2-Commandes/Commandes--Screen--1/Hooks/useCommandes';
import MenueItems from '../Menue';
import {Avatar} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {Txt} from '../../utils';
import gestion from '../../../assets/Drawer/WhatsApp.png';


const HeaderCommandes = ({
  navigation,
  Color,
  openMenu,
  Visible,
  closeMenu,
  openModel,
}) => {
  const {NavigatonTo} = useCommandes();
  const auth = useSelector(state => state.auth);
  const {height} = useWindowDimensions();
  const CustHeight = height <= 600 ? '15%' : '10%';

  const route = useRoute();
  // console.log('route.name', route.name)


   const getReservations = useSelector(state => state.auth);

   const {login} = getReservations;
   let id = login?.establishments[0].id;
   let name = login?.login;
   let token = login?.token;
  return (
    <View
      style={[styles.container, {backgroundColor: Color, height: CustHeight}]}>
      <TouchableOpacity
        onPress={() => {
          // navigation.toggleDrawer()
          if (route.name == 'RestaurantsFerme') {
            return;
          } else {
            navigation.openDrawer();
          }
        }}>
        <Image source={image} />
      </TouchableOpacity>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{}}>
          <TouchableOpacity 
               onPress={() => {
                // props.navigation.navigate('Parametre');
                // let url ="https://m2.live-resto.fr/manager/payments/edit?token=132e2b52-fe34-4a96-a6a1-1071966761cd&establishment_id=3&login=gabriel"
  
                let url = `https://m2.live-resto.fr/manager/products?token=${token}&establishment_id=${id}&login=${name}`;
                // let url = `https://m2.live-resto.fr/manager/payments/edit?token=${token}&establishment_id=${id}&login=${name}`;
                Linking.openURL(url);

              }}


              style={{marginRight:20}}
          >
            {/* <Txt>Gestion produit</Txt> */}
            <Image source={gestion}  style={{height:25,width:25}}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.Right} onPress={openMenu}>
          <View>
            <Avatar.Image
              source={{
                uri: auth.user.img,
              }}
              size={35}
              style={{marginHorizontal: 10}}
            />
          </View>
          <Image source={I3} />
        </TouchableOpacity>
        <MenueItems
          visible={Visible}
          closeMenu={closeMenu}
          NavigatonTo={NavigatonTo}
          navigation={navigation}
          openModel={openModel}
        />
      </View>
    </View>
  );
};

export default HeaderCommandes;
