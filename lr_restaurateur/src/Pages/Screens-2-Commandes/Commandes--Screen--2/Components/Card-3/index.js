import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import React, { useEffect } from "react";
import { styles } from "./styles";
import group from "../../../../../assets/Accueil/Group149.png";
import group155 from "../../../../../assets/Drawer/Group150.png";
import { useSelector } from "react-redux";
import { useCommandeTerminé } from "../../Hooks/useCommandeTerminé";
import ModalPrinter from "../../../Commandes--Screen--1/Components/Card-1/Components/PopUp/ModalPrinter";
import { COLORS } from "../../../../../constants/theme";
import { useCommandes } from "../../../Commandes--Screen--1/Hooks/useCommandes";

const CardTr = ({ item, navigation }) => {
  const {
    DesAcitvePopUp,
    Visible,
    width,
    ActiveChange,
    ActiveDone,
    OnClick,
    Loading,
  } = useCommandeTerminé();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      ActiveDone();
      ActiveChange();
    }
    return (mounted = false);
  }, []);



  const Tablet = useSelector((state) => state.IsTab);
  const { IsTab } = Tablet;
  let CustomWidth = IsTab ? (width <= 770 ? "49%" : "45%") : 330;

  const container = {
    backgroundColor: "#AAC84030",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginTop: 15,
    justifyContent: "center",
    height: IsTab ? 85 : 80,
    zIndex: 5,
    marginHorizontal: 5,
    width: CustomWidth,
  };
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
    
    onPress={() => {
      navigation.navigate("Details", {
        item,
      });
    }}
  >
    <View style={container}>
      
      {Loading ? (
        <View style={styles.abs3}>
          <ActivityIndicator color={COLORS.primary}></ActivityIndicator>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.abs2}
          onPress={() => {
            OnClick(item.id, item);
          }}
        >
          <Image source={group155} />
        </TouchableOpacity>
      )}

    
        
      
      <View style={styles.BoxInfo}>
        <View style={styles.client}>
          <Text style={[styles.clientText,{color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,}]}>{item.bill.full_name}</Text>
        </View>
        <View style={styles.price}>
          {/* <Text style={styles.TextArticle}>{item.productsCount} produits</Text> */}
          <Text style={styles.TextArticle}>Totale : {item.total} €</Text>
        </View>
      </View>
      <ModalPrinter DesAcitvePopUp={DesAcitvePopUp} Visible={Visible} />
     
    </View>
    </TouchableOpacity>
  );
};

export default CardTr;
