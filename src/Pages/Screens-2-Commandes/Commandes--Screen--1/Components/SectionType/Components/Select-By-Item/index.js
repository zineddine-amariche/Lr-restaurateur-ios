import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {styles} from './styles';
 
import CommandesImg from '../../../../../../../assets/VectorStroke.png';
 
import {COLORS} from '../../../../../../../constants/theme';
 
import {Txt} from '../../../../../../../Components/utils';
 

const FilterSelect = ({textButtonFiltre,onOpen, setStatus}) => {
  const Tablet = useSelector(state => state.IsTab);
  const {IsTab} = Tablet;
  const Disp = IsTab ? 'flex-start' : 'space-between';
  const custWidh = IsTab ? '18%' : 'auto';
 
  const paddingCust = IsTab ? 0 : 15;

  const Commandes = useSelector(state => state.Commandes);
  const {status_active} = Commandes;


  return (
    <View
      style={[
        styles.trie,
        {justifyContent: Disp, paddingHorizontal: paddingCust},
      ]}>
      <View style={[styles.button, {width: custWidh}]}>
        <Text style={styles.Text}>Trier Par :</Text>
      </View>
      <View
        style={{
          width: IsTab ? '30%' : '60%',
          overflow: 'hidden',
          position: 'relative',
        }}>
        <View
          style={{
            backgroundColor: '#1211',
            height: 40,
            borderWidth: 1,
            borderColor: COLORS.darkGris,
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            
            onPress={()=>{

              onOpen()}}
            >
            <Txt fontSize={16} color={COLORS.black}>
              {' '}
             {   status_active == "Toutes" ?"Toutes":'Others..' }
            </Txt>
            <Image source={CommandesImg} />
          </TouchableOpacity>
        </View>

 

     
      </View>
    </View>
  );
};

export default FilterSelect;

