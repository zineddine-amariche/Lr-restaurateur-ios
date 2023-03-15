import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  useColorScheme,
} from "react-native";
import React, { useEffect } from "react";
import { styles } from "./styles";
import group from "../../../../../assets/Accueil/Group149.png";
import group155 from "../../../../../assets/Accueil/Group151.png";
import group156 from "../../../../../assets/Accueil/Group156.png";
import { useCommandes } from "../../Hooks/useCommandes";
import { COLORS } from "../../../../../constants/theme";
import ModalPrinter from "../Card-1/Components/PopUp/ModalPrinter";
import { useSelector } from "react-redux";

const CardEn = ({ item, navigation }) => {
  const {
    Visible,
    Loading,
    ToPrete,
    ActiveDone,
    ActiveChange,
    DesAcitvePopUp,
  } = useCommandes();

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
    height: width <= 770 ? 148 : 152,
    marginTop: 10,
    marginHorizontal: 5,
    width: IsTab ? (width <= 770 ? "49%" : "45%") : 330,
    overflow: "hidden",
    marginBottom: 10,
  };
 

  return (
    <>

      <View style={Card}>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
          }}
          onPress={() => {
            navigation.navigate("Details", {
              item,
              Visible,
            });
          }}
        >
          <LeftCard item={item} />
          <RightCard
            item={item}
            Loading={Loading}
            ToPrete={ToPrete}
            marginLeftCus={marginLeftCus}
            navigation={navigation}
          />
        </TouchableOpacity>

        <ModalPrinter DesAcitvePopUp={DesAcitvePopUp} Visible={Visible} />
      </View>
    </>
  );
};

export default CardEn;



const LeftCard = ({ item }) => {
  const colorScheme = useColorScheme();
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
        <Text style={[styles.clientText,{color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,}]}>{item.bill.full_name}</Text>
      </View>
      {/* <Text style={styles.TextArticle}>{item.productsCount}produits</Text> */}
      <View style={styles.etat}>
        <Image source={group155} />
        <Text style={styles.TextRed}>En Cuisine</Text>
      </View>
    </View>
  );
};

const RightCard = ({ item, Loading, navigation, Visible, ToPrete }) => {
  return (
    <View
      style={{
        width: "50%",
        height: "100%",
        paddingTop: 30,
        paddingHorizontal: 15,
        alignItems: "flex-end",
      }}
    >
      <View style={styles.client}>
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
                Visible,
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
            ToPrete(item.id);
          }}
        >
          <Image source={group156} style={styles.img} />
          <Text numberOfLines={1} style={styles.TextButton}>
            Commande prête
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
//       Visible,
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
//     <Image source={group155} style={styles.img} />

//     <Text style={styles.TextRed}>En Cuisine</Text>
//   </View>
//     {!Loading ? (
//       <TouchableOpacity
//         style={styles.btnToCuisine}
//         onPress={() => {
//           ToPrete(item.id);
//         }}
//       >
//         <Image source={group156} style={styles.img} />
//         <Text style={styles.TextButton}>C'est prête !</Text>
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
