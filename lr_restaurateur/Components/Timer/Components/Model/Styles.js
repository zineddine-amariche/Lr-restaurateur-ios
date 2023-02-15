import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../constants/theme';

const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  ConatinerClose: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  Title: {
    backgroundColor: COLORS.white,
    width: '90%',
    paddingVertical: 5,
    alignItems: 'center',
    alignSelf:'center'
  },
  TextTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    textAlign:'center'
  },
  body:{
      backgroundColor:COLORS.gray,
      backgroundColor: '#fff',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
  },
  timeChose:{
      backgroundColor:COLORS.primary,
      marginVertical:8,
      paddingVertical:5,
      borderRadius:15,
      justifyContent:'center',
      alignItems:'center',
      paddingHorizontal:20,
      width:125
  },
  TextBtn:{
      color:COLORS.white
  },
  ButtonTime:{
    width:'100%',
    alignItems:'center',
    justifyContent:'center'
  },
  ButtonTouch:{
    backgroundColor:COLORS.primary,
    width:70,
    height:25,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
    marginVertical:10
  },
  TextButtonTouch:{
    color:COLORS.white,
    fontWeight:'700'
  },
  ButtonsFooter:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginTop:5
  },
  ButtonDiscar:{
    width:116,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:6
    
  },
  ButtonValid:{
    backgroundColor:COLORS.primary,
    width:116,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:6


  }
});
