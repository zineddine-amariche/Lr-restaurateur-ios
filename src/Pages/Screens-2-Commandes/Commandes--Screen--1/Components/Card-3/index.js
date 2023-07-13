import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import React, { useEffect } from "react";
import { styles } from "./styles";
import group155 from "../../../../../assets/Accueil/Group.png";
import group156 from "../../../../../assets/Accueil/Group150A.png";
import { useCommandes } from "../../Hooks/useCommandes";
import ModalPrinter from "../Card-1/Components/PopUp/ModalPrinter";
import { useSelector } from "react-redux";
import { COLORS } from "../../../../../constants/theme";
import { Txt } from "../../../../../Components/utils";
import moment from "moment";

const CardTr = ({ item, navigation }) => {
  const {
    ActiveDone,
    ActiveChange,
    DesAcitvePopUp,
    Visible,
    Loading,
    OnPrinte,
  } = useCommandes();

  let totaleQuantity = 0;
  useEffect(() => {
    ActiveDone();
    ActiveChange();
  }, []);

  const Tablet = useSelector((state) => state.IsTab);
  const { IsTab } = Tablet;
  const { width } = useWindowDimensions();

  let marginLeftCus = IsTab ? 0 : 5;

  const Card = {
    backgroundColor: "#AAC84030",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginVertical: 5,
    justifyContent: "center",
    // height: width <= 770 ? 148 : 152,
    marginTop: 10,
    marginHorizontal: 5,
    width: IsTab ? (width <= 770 ? "49%" : "45%") : 330,
    overflow: "hidden",
    marginBottom: 10,
    paddingBottom:10 

  };

  return (
    <>
      <View style={Card}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
          }}
          onPress={() => {
            navigation.navigate("Details", {
              item,
              totaleQuantity,
            });
          }}
        >
          <LeftCard item={item} />
          <RightCard
            item={item}
            Loading={Loading}
            OnPrinte={OnPrinte}
            marginLeftCus={marginLeftCus}
            navigation={navigation}
          />
        </TouchableOpacity>

        <ModalPrinter DesAcitvePopUp={DesAcitvePopUp} Visible={Visible} />
      </View>
    </>
  );
};

export default CardTr;


const LeftCard = ({ item }) => {
  const colorScheme = useColorScheme();
let typeIo = item.type == 10 ? "Livraison" :item.type == 20 ? "Retrait sur place" : "Sur place"

let time = item.for_when;
let timer = moment(time).format('H:mm');
  return (
    <View
      style={{
        width: "50%",
        height: "100%",
        paddingTop: 10,
        paddingLeft: 15,
      }}
    >
      <View style={styles.client}>
        <Text style={[styles.clientText,{color: colorScheme == 'dark' ? COLORS.black : COLORS.dark}]}>{item.bill.full_name}</Text>
        
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        
        <Text style={[{color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,fontSize:16,marginTop:6,
                marginRight: 9,
              }]}>{typeIo}</Text>
        <Text
            style={[
              {
                color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,
                fontSize: 16,
                marginTop: 6,
                fontWeight: 'bold',
              },
            ]}>
            {timer}
          </Text>
        </View>
      </View>
      {/* <Text style={styles.TextArticle}>{item.productsCount}produits</Text> */}
      <View style={styles.etat}>
        <Image source={group155} />
        <Text style={styles.TextRed}>Commande prête</Text>
      </View>
    </View>
  );
};

const RightCard = ({ item, Loading, navigation, marginLeftCus, OnPrinte }) => {
  return (
    <View
      style={{
        width: "50%",
        height: "100%",
        paddingTop: 10,
        paddingHorizontal: 15,
        alignItems: "flex-end",
      }}
    >
      <View style={styles.client}>

      <Txt color={COLORS.black} fontSize={18} Bold={'700'}>
          #{item.id}{' '}
        </Txt>
        {/* {item.payments.length <= 2 ? (
          <View>
            {item.payments.map((i) => {
              return (
                <Text
                  numberOfLines={1}
                  style={[
                    styles.TextArticle,
                    { fontSize: 12, fontWeight: "400" },
                  ]}
                >
                  {i.title}
                </Text>
              );
            })}
          </View>
        ) : (
          <View>
            <Text
              numberOfLines={1}
              style={[styles.TextArticle, { fontSize: 12, fontWeight: "400" }]}
            >
              {item.payments[0].title}
            </Text>
          </View>
        )} */}
        <View style={{ alignItems: "flex-end" }}>
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate("Details", {
                item,
                marginLeft: marginLeftCus,
              });
            }}
          >
            <Text style={{ fontSize: 11, color: COLORS.transparentBlack7 }}>
              voir plus...
            </Text>
          </TouchableOpacity> */}
          <Text style={styles.TextArticle}>Total : {item.total} €</Text>
        </View>
      </View>
      {!Loading ? (
        <TouchableOpacity
          style={styles.btnToCuisine}
          onPress={() => {
            OnPrinte(item.id, item);
          }}
        >
          <Image source={group156} style={styles.img} />
          <Text numberOfLines={1} style={styles.TextButton}>
            Imprimer
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.LoadingButton}>
          <ActivityIndicator color={COLORS.primary} animating={true} />
        </View>
      )}
    </View>
  );
};

// <View style={Card}>
// <TouchableOpacity
//   style={styles.abs}
//   onPress={() => {
//     navigation.navigate("Details", {
//       item,
//       totaleQuantity,
//     });
//   }}
// >
//   <Image source={group} />
// </TouchableOpacity>
// <View style={styles.BoxInfo}>
//   <View style={styles.client}>
//     <Text style={styles.clientText}>{item.bill.full_name}</Text>
//   </View>
//   <View style={styles.price}>
//     <Text style={styles.TextArticle}>{item.productsCount} Articles</Text>
//     <Text style={styles.TextArticle}>Total : {item.total} €</Text>

//     <View  >
//       <Text
//         style={[styles.TextArticle, { fontSize: 12, fontWeight: "700" }]}
//       >
//         {item.payments.map((i) => {
//           return i.title;
//         })}{" "}
//       </Text>
//       <Text style={styles.TextArticle}>Total : {item.total} €</Text>
//     </View>

//   </View>

//   <View style={styles.Touch}>

//   <View style={styles.etat}>
//     <Image source={group155} />
//     <Text style={styles.TextRed}>Commande prête</Text>
//   </View>
//     {!Loading ? (
//       <TouchableOpacity
//         style={styles.btnToCuisine}
//         onPress={() => {
//           OnPrinte(item.id, item);
//         }}
//       >
//         <Image source={group156} style={styles.img} />
//         <Text style={styles.TextButton}>Imprimer</Text>
//       </TouchableOpacity>
//     ) : (
//       <View style={styles.LoadingButton}>
//         <ActivityIndicator color={COLORS.primary} animating={true} />
//       </View>
//     )}
//   </View>
// </View>
// <ModalPrinter DesAcitvePopUp={DesAcitvePopUp} Visible={Visible} />
// </View>
