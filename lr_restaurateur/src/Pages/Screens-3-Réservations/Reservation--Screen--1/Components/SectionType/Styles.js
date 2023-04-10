import {StyleSheet} from 'react-native';
import { COLORS } from '../../../../../constants/theme';


export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex:1
  },

  FlatList: {

    // height:"90%",
    backgroundColor: COLORS.white,
    width:'100%',
    overflow:'visible',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    flex:1

  },
  wrapper:{
 
    justifyContent:"center",
    backgroundColor:COLORS.white,
    width:'100%',
    alignSelf:'center',
    paddingBottom:20

}
});
