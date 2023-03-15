import {StyleSheet} from 'react-native';
import { COLORS } from '../../../../../constants/theme';


export const styles = StyleSheet.create({
  container: {
    height:'13%',
    backgroundColor: COLORS.white,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:20
  },
  ButtonBox:{
    backgroundColor:COLORS.transparentPrimray5,
    flexDirection:'row',
    height:45,
    paddingHorizontal:10,
    alignItems:'center',
    borderRadius:6,
    width:"48%",
    marginRight:5,

  },
  ButtonBoxReservation:{
    backgroundColor:COLORS.secondary,
    flexDirection:'row',
    height:45,
    paddingHorizontal:10,
    alignItems:'center',
    borderRadius:6,
    width:"48%",

  },
  TextBtn1:{
    color:COLORS.white,
    fontSize:16,
    fontWeight:'700',
    paddingLeft:10
  }
});
