import {View, Text, Image, useColorScheme} from 'react-native';
import React from 'react';
import Imae from '../../../../../assets/Info/Component8(1).png';
import {styles} from './styles';
import {FlatList} from 'react-native';
import {LogBox} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
// import {ListItem} from 'native-base';
import {COLORS} from '../../../../../constants/theme';
// import ListItem from 'react-native-paper/lib/typescript/components/List/ListItem';
// import { ListItem } from 'react-native-elements';

LogBox.ignoreAllLogs();
const TabOrder = ({orders}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={({item, index}) => {
          return <Tab item={item} />;
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default TabOrder;

const Tab = ({item}) => {
  let data = [{choice: '', option: '', price: ''}];

  let obj = item?._joinData?.extras ? item?._joinData?.extras : data;

 

  return (
    <View>
      <Collapse>
        <CollapseHeader style={{marginTop: 7}}>
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <Image source={Imae} />
              <Text style={styles.textTab}>
                {item?.title}

                {item?._joinData?.extras ? (
                  <Icon name="add" color={COLORS.white} />
                ) : null}
              </Text>
            </View>
            <View style={styles.rowItem}>
              <Text style={styles.textQty}>x{item?._joinData?.quantity}</Text>
              <Text style={styles.textPrice}>
                {item?._joinData?.price.toFixed(2)}€
              </Text>
            </View>
          </View>

          <Gid item={item?._joinData?.extras?.length !== 0} obj={obj} />
        </CollapseHeader>
      </Collapse>
    </View>
  );
};

const Gid = ({item, obj}) => {
  const colorScheme = useColorScheme();
  // console.log('item', item);

  // console.log('obj[0]', JSON.stringify(obj));

  let arr = [];

  // console.log('typeof[]', typeof arr);

  return (
    <>
      {/* <CollapseBody
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#eee',
          borderRadius: 6,
          marginTop: 5,
        }}>
        <View>
          <View style={{ }}>
            {item?._joinData?.extras &&
              item?._joinData?.extras.map((i, index) => {
                console.log('i', i);
                return (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#eee',
                        width: '100%',
                        justifyContent: 'space-between',
                      }}
                      key={index}>
                      <Text
                        style={{
                          fontWeight: '700',
                          width: 150,
                          marginLeft: -5,
                          color:
                            colorScheme == 'dark' ? COLORS.black : COLORS.dark,
                        }}>
                        {i.choice}
                      </Text>
                      <Text
                        style={{
                          color:
                            colorScheme == 'dark' ? COLORS.black : COLORS.dark,
                        }}>
                        {i.option}
                      </Text>
                      <Text
                        style={{
                          width: 20,
                          fontWeight: '700',
                          color:
                            colorScheme == 'dark' ? COLORS.black : COLORS.dark,
                        }}>
                        {i.price}
                      </Text>
                    </View>
                  </>
                );
              })}
          </View>
        </View>
      </CollapseBody> */}

      {obj.map((i, index) => {

        if (i.choice) {
          return (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: i.choice ? '#eee' : 'transparent',
                  width: '100%',
                  justifyContent: 'space-between',
                  padding: 10,
                  marginTop: 6,
                }}
                key={index}>
                <Text
                  style={{
                    fontWeight: '700',
                    width: 150,
                    marginLeft: -5,
                    color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,
                  }}>
                  {i.choice}
                </Text>
                <Text
                  style={{
                    color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,
                  }}>
                  {i.option}
                </Text>
                <Text
                  style={{
                    width: 20,
                    fontWeight: '700',
                    color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,
                  }}>
                  {i.price}
                </Text>
              </View>
            </>
          );
        } else {
          return <></>;
        }
      })}
    </>
  );
};
