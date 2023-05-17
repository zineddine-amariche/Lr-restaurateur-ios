import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import HeaderInfo from "./Components/header";
import { styles } from "./Hooks/Styles";
import Info from "./Components/TopInfo";
import TabOrder from "./Components/TabOrder";
import PrintButton from "./Components/button";
import Total from "./Components/Total";
import { useSelector } from "react-redux";
import ToastMessages from "../../../Components/ToastMessages";
import ModalPrinter from "../Commandes--Screen--1/Components/Card-1/Components/PopUp/ModalPrinter";
import { ScrollView } from "react-native-gesture-handler";
import { useInfo } from "./Hooks/UseInfo";
import { useIsFocused } from "@react-navigation/native";
import KeepAwake from "react-native-keep-awake";
import { useColorScheme } from "react-native";
import { COLORS } from "../../../constants/theme";

const Details = ({ route, navigation }) => {
  const { item } = route.params;
  const Printer = useSelector((state) => state.Printer);
  const { error, type } = Printer;
  const colorScheme = useColorScheme();
  const {
    GetOrderMenue,
    ActiveDone,
    ActiveChange,
    orders,
    width,
    OnPrint,
    productData,
    Visible,
    DesAcitvePopUp,
    Loading,
  } = useInfo();

  useEffect(() => {
    GetOrderMenue(item.id);
  }, [item?.id]);

  const Tablet = useSelector((state) => state.IsTab);
  let Sty = Tablet.IsTab ? styles.BoxOrdersTab : styles.BoxOrders;

  useEffect(() => {
    ActiveDone();
    ActiveChange();
  }, []);

  const isFocused = useIsFocused();

  const KeepAwakeApp = () => {
    const interval = setInterval(() => {
      if (isFocused) {
        KeepAwake.activate();
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  };
  useEffect(() => {
    KeepAwakeApp();
  }, [isFocused]);


  // console.log('item', item.type)
  
let typeIo = item.type == 10 ? "Livraison" :item.type == 20 ? "Retrait sur place" : "Sur place"


  return (
    <SafeAreaView style={styles.container}>
      <HeaderInfo navigation={navigation} 
        onPress={() => {
          navigation.navigate('Commandes');
        }}
      />
      {error && <ToastMessages type={type} error={error} />}
      <ScrollView>
        <View style={styles.containerId}>
          <Text style={[styles.TextId,{color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,}]}>#{item.id}</Text>
          <Text style={{color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,fontSize:20, fontWeight:"400"}}>{typeIo}</Text>
        </View>
        <View style={styles.ContainerBodyTab}>
          <Info item={item} />
          <View style={Sty}>
            <TabOrder item={item} orders={orders} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.BottomItems}>
        <PrintButton
          OnPrint={OnPrint}
          item={item}
          productData={productData}
          Loading={Loading}
        />
        <Total item={item} width={width} orders={productData} />
      </View>
      <ModalPrinter DesAcitvePopUp={DesAcitvePopUp} Visible={Visible} />
    </SafeAreaView>
  );
};

export default Details;
