import {StyleSheet} from 'react-native';
import { COLORS } from '../../../../../../../constants/theme';


export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft:15
  },
  row:{
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:10
  },
  imageBox:{
      width:35,
      alignItems:'center'
  },
  Textbold:{
      fontSize:17,
      fontWeight:"bold"
  },
  TextSemibold:{
    fontSize:15,
    fontWeight:"600"
}


});
