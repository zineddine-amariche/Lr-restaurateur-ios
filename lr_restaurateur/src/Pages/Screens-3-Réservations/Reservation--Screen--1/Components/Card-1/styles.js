import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../../constants/theme';

const {height, width} = Dimensions.get('window');


export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5DBCA330',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    width: '100%',
    marginVertical: 5,
    justifyContent: 'center',
    height:100,
    zIndex:5,
    marginTop:11,
    marginRight:10,
  },
  abs: {
    position: 'absolute',
    top: -12,
    right: 16,
    zIndex:15
  },
  BoxInfo: {
    backgroundColor: COLORS.transparent,
    width: '95%',
    height: '90%',
    paddingTop:10,
    paddingLeft:15,
    paddingRight:15,
    
  },
  client: {
    paddingBottom: 5,
    
  },
  clientText: {
    fontWeight: '700',
    fontSize:17,
    // color:COLORS.darkGris,
  },
  price: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical:2,
    alignItems:'center'
  },
  etat:{
    flexDirection:'row',
    alignItems:"center",
  },

  TextArticle:{
    fontSize:15,
    color:COLORS.secondary,
    fontWeight:"700"
  },
  TextRed:{
    fontSize:14,
    color:COLORS.secondary,
    paddingLeft:7,
    fontWeight:"600"
  },
  btnToCuisine:{
    flexDirection:'row',
    height:28,
    borderRadius:20,
    backgroundColor:'#fff',
    width:"65%",
    alignSelf:'flex-end',
    alignItems:'center',
    justifyContent: 'center',

  },
  TextButton:{
    color:COLORS.secondary
  },
  img:{
    marginRight:5
  },
 

});
