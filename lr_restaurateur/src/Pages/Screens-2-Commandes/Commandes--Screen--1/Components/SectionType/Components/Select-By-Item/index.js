import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {useCommandes} from '../../../../Hooks/useCommandes';
import CommandesImg from '../../../../../../../assets/VectorStroke.png';
import SelectDropdown from 'react-native-select-dropdown';
import Icona from 'react-native-vector-icons/Entypo';
import {COLORS} from '../../../../../../../constants/theme';
import {STATUS_ACTIVE} from '../../../../../../../Redux/Types/Commandes';
import {Txt} from '../../../../../../../Components/utils';
import {Modalize} from 'react-native-modalize';

const FilterSelect = ({textButtonFiltre,onOpen, setStatus}) => {
  const Tablet = useSelector(state => state.IsTab);
  const {IsTab} = Tablet;
  const Disp = IsTab ? 'flex-start' : 'space-between';
  const custWidh = IsTab ? '18%' : 'auto';
  const dispatch = useDispatch();
  const paddingCust = IsTab ? 0 : 15;

  const Commandes = useSelector(state => state.Commandes);
  const {arr,status_active} = Commandes;


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

        {/* <SelectDropdown
          label="myLIST"
          defaultValue="Toutes"
          dropdownStyle={{
            backgroundColor: COLORS.gray,
            marginVertical: 5,
          }}
          showArrowIcon={true}
          rowStyle={{
            backgroundColor: '#fff',
            borderColor: COLORS.white,
            borderWidth: 1,
            borderRadius: 1,
            marginVertical: 0.5,
            height: 35,
          }}
          ArrowDownIconComponent={({style}) => (
            <Icona name="close" style={style} />
          )}
          rowTextStyle={{color: COLORS.black}}
          buttonStyle={{
            backgroundColor: COLORS.white,
            height: 40,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 1,
            width: '100%',
            borderRadius: 4,
          }}
          buttonTextStyle={{color: COLORS.black}}
          data={textButtonFiltre}
          onSelect={(selectedItem, index) => {
            setStatus(selectedItem);
            dispatch({type: STATUS_ACTIVE, payload: selectedItem});
            // filterData()
          }}
        /> */}

     
      </View>
    </View>
  );
};

export default FilterSelect;

