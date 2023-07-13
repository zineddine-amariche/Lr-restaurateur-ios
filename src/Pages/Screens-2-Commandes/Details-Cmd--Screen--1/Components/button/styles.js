import {StyleSheet} from 'react-native';
import { COLORS } from '../../../../../constants/theme';

export const styles = StyleSheet.create({

  Button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    width: 200,
    borderRadius: 20,
    height: 26,
    
  },
  TextButon: {
    color: COLORS.primary,
    fontWeight:'400'
  },
});
