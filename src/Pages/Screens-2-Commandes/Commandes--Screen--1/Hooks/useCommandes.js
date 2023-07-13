import {BluetoothEscposPrinter} from '@brooons/react-native-bluetooth-escpos-printer';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {LOADING, REFRESH, SUCCESS} from '../../../../Redux/Types/Commandes';
import {
  DELETE_MESSAGES_PRINTER,
  PRINTER_FAILED,
} from '../../../../Redux/Types/Printer';
import {API_URL_PROD, API_URL_DEV} from '@env';
import {GetAllCommandes} from '../../../../Redux/Actions/Commandes';

export function useCommandes() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const Commandes = useSelector(state => state.Commandes);
  const {toComfirm, others, loading_btn, refresh, orders} = Commandes;
  const Printer = useSelector(state => state.Printer);
  const {isPrinter, nombreTicket} = Printer;
  // console.log('isPrinter', isPrinter)
  const textButtonFiltre = ['Toutes', 'À préparer', 'En Cuisine', 'Prêtes'];
  const [status, setStatus] = useState('Toutes');
  const [Loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [IsChanged, setIsChanged] = useState(false);
  const [Visible, setVisible] = useState(false);
  const auth = useSelector(state => state.auth);
  const mergedArray = [...toComfirm, ...others];
  const {Token, establishments, user, login} = auth;
  const {width} = useWindowDimensions();

  let configHead = {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'fr',
      Authorization: 'Bearer ' + Token,
      accept: 'application/json',
      login: login?.login,
      establishment: establishments?.id,
    },
  };
  // console.log(configHead,'headcommande')

  const GetProducts = async id => {
    dispatch({type: LOADING});
    // console.log("id", id);
    let body = JSON.stringify({
      orderId: id,
    });
    // let URL = 'https://m2.live-resto.fr/apiv2e/orders/details';
    // let URL = 'https://m2.live-resto.fr/apiv2e/orders/details';

    let API_BASE_URL;

    if (__DEV__) {
      API_BASE_URL = API_URL_DEV;
    } else {
      API_BASE_URL = API_URL_PROD;
    }

    let url = `${API_BASE_URL}/orders/details`;
    try {
      if (Token) {
        await axios
          .post(url, body, configHead)
          .then(res => {
            let Data = res.data.order;

            console.log('dataStatus--------------------', Data);
            // dispatch({ type: ORDER_SUCCESS, payload: Data });
          })
          .catch(err => {
            console.log('--- error failed', err);
            // dispatch({type: COMMANDES_FAILED});
          });
        // DesActiveLoading()
        // dispatch({ type: STOP_COMMANDES_LOADING });
      }
    } catch (error) {
      console.log('--- error failed', error);
    }
  };
  const ActiveChange = () => {
    setIsChanged(true);
  };
  const DesActiveChange = () => {
    setIsChanged(false);
  };
  const ActiveDone = () => {
    setIsDone(true);
  };
  const PrinteById = async (item, ordersById, nombreArticl) => {
    let i = 1;
    let typeIo =
      item.type == 10
        ? 'Livraison'
        : item.type == 20
        ? 'Retrait sur place'
        : 'Sur place';
    do {
      if (IsChanged && ordersById && ordersById.length > 0) {
        // console.log(`title print`, i);
        // console.log(`body print`, i);
        //  console.log(`ordersById`, ordersById);
        //  console.log('nombreArticl', nombreArticl)
        // console.log('item', item);
        try {
          await BluetoothEscposPrinter.printerInit();
          await BluetoothEscposPrinter.printerLeftSpace(0);
          await BluetoothEscposPrinter.printerAlign(
            BluetoothEscposPrinter.ALIGN.CENTER,
          );
          await BluetoothEscposPrinter.setBlob(0);
          await BluetoothEscposPrinter.printText('______________________\r\n', {
            fonttype: 3,
            widthtimes: 1,
            heigthtimes: 1,
          });
          await BluetoothEscposPrinter.printText('Live Resto\r\n', {
            encoding: 'GBK',
            codepage: 0,
            widthtimes: 3,
            heigthtimes: 3,
            fonttype: 1,
          });
          await BluetoothEscposPrinter.setBlob(0);
          await BluetoothEscposPrinter.printText('#' + item?.id + '\r\n', {
            encoding: 'GBK',
            codepage: 0,
            widthtimes: 3,
            heigthtimes: 3,
            fonttype: 1,
          });
          await BluetoothEscposPrinter.printerAlign(
            BluetoothEscposPrinter.ALIGN.CENTER,
          );
          await BluetoothEscposPrinter.setBlob(0);
          await BluetoothEscposPrinter.printText(typeIo + '\r\n', {
            encoding: 'GBK',
            codepage: 0,
            widthtimes: 3,
            heigthtimes: 3,
            fonttype: 1,
          });
          await BluetoothEscposPrinter.printText('\r\n', {});
          await BluetoothEscposPrinter.printerAlign(
            BluetoothEscposPrinter.ALIGN.CENTER,
          );
          await BluetoothEscposPrinter.printText(
            '______________________________________\r\n',
            {
              fonttype: 1,
            },
          );

          item?.type == 10 &&
            (await BluetoothEscposPrinter.printText(
              'Client : ' +
                item?.delivery?.full_name +
                '  --  ' +
                item?.delivery?.phone +
                '\r\n',
              {},
            ),
            await BluetoothEscposPrinter.printText(
              ' Adresse : ' + item.delivery.address + '  \r\n',
              {},
            ),
            item?.delivery.city !== '' &&
              (await BluetoothEscposPrinter.printText(
                ' ' +
                  item?.delivery.city +
                  ' - ' +
                  item?.delivery.postal +
                  ' \r\n',
                {},
              )),
            item?.delivery.floor !== '' &&
              (await BluetoothEscposPrinter.printText(
                'Etage : ' + item?.delivery.floor + ' \r\n',
                {
                  encoding: 'UTF-8',
                },
              )),
            item?.delivery.building !== '' &&
              (await BluetoothEscposPrinter.printText(
                'Immeuble : ' + item?.delivery.building + ' \r\n',
                {
                  encoding: 'UTF-8',
                },
              )),
            item?.delivery.code_doorbell !== '' &&
              (await BluetoothEscposPrinter.printText(
                'Code sonette: ' + item?.delivery.code_doorbell + ' \r\n',
                {},
              )),
            item?.delivery.code_elevator !== '' &&
              (await BluetoothEscposPrinter.printText(
                'Code ascenceur : ' + item?.delivery.code_elevator + ' \r\n',
                {},
              )),
            await BluetoothEscposPrinter.printText('\r\n', {}),
            await BluetoothEscposPrinter.printText(
              '______________________________________\r\n',
              {
                fonttype: 1,
              },
            ));
          {
            ordersById.map(i => {
              return (
                BluetoothEscposPrinter.printColumn(
                  [38, 0, 8],
                  [
                    BluetoothEscposPrinter.ALIGN.LEFT,
                    BluetoothEscposPrinter.ALIGN.CENTER,
                    BluetoothEscposPrinter.ALIGN.RIGHT,
                  ],
                  [
                    '' + i?._joinData.quantity + 'x ' + i?.title + '',
                    '',
                    '' + i?._joinData.price.toFixed(2) + ' €',
                  ],
                  {
                    encoding: 'windows-1254',
                    codepage: 25,
                    widthtimes: 0.75,
                    heigthtimes: 0.75,
                  },
                ),
                i._joinData.extras &&
                  i._joinData.extras.map(ext => {
                    return (
                      BluetoothEscposPrinter.printerAlign(
                        BluetoothEscposPrinter.ALIGN.LEFT,
                      ),
                      BluetoothEscposPrinter.printText(
                        ext.option + ' :  ' + ext.choice + '' + '' + '\r\n',
                        {
                          encoding: 'windows-1254',
                          codepage: 25,
                        },
                      )
                    );
                  }),
                BluetoothEscposPrinter.printText('\r\n', {})
              );
            });
          }

          await BluetoothEscposPrinter.printText('\r\n', {});
          await BluetoothEscposPrinter.printerAlign(
            BluetoothEscposPrinter.ALIGN.CENTER,
          );
          await BluetoothEscposPrinter.setBlob(0);
          await BluetoothEscposPrinter.printText(
            " Nombre d'articles: " + nombreArticl + '\r\n',
            {
              encoding: 'windows-1254',
              codepage: 25,
              widthtimes: 1,
              heigthtimes: 1,
              fonttype: 1,
            },
          );

          await BluetoothEscposPrinter.printText(
            '______________________________________\r\n',
            {
              fonttype: 1,
            },
          );
          await BluetoothEscposPrinter.printText('\r\n', {});

          await BluetoothEscposPrinter.printColumn(
            [20, 2, 10],
            [
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.RIGHT,
            ],
            [
              'Frais de Livraison',
              ':',
              '' + item?.delivery_price.toFixed(2) + ' €',
            ],
            {
              encoding: 'windows-1254',
              codepage: 25,
            },
          );

          await BluetoothEscposPrinter.printColumn(
            [20, 2, 10],
            [
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.CENTER,
              BluetoothEscposPrinter.ALIGN.RIGHT,
            ],
            ['Remise :', '', '' + item?.discount.toFixed(2) + ' € \r\n'],
            {
              encoding: 'windows-1254',
              codepage: 25,
            },
          );

          await BluetoothEscposPrinter.printColumn(
            [14, 0, 8],
            [
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.RIGHT,
            ],
            ['Prix Total :', '', '' + item?.total.toFixed(2) + ' €'],
            {
              encoding: 'windows-1254',
              codepage: 25,
              widthtimes: 1,
              heigthtimes: 1,
            },
          );
          await BluetoothEscposPrinter.printText('\r\n', {});

          await BluetoothEscposPrinter.printColumn(
            [20, 2, 10],
            [
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.RIGHT,
            ],
            ['Moyen de paiement ', ':', ''],
            {
              encoding: 'windows-1254',
              codepage: 25,
            },
          );
          {
            item?.payments && item?.payments.length > 0
              ? item?.payments.map(i => {
                  return BluetoothEscposPrinter.printColumn(
                    [38, 0, 8],
                    [
                      BluetoothEscposPrinter.ALIGN.LEFT,
                      BluetoothEscposPrinter.ALIGN.CENTER,
                      BluetoothEscposPrinter.ALIGN.RIGHT,
                    ],
                    [
                      '' + i.title + ' :',
                      '',
                      '' + i._joinData.amount.toFixed(2) + ' €',
                    ],
                    {
                      encoding: 'windows-1250',
                      codepage: 25,
                      widthtimes: 0.75,
                      heigthtimes: 0.75,
                    },
                  );
                })
              : await BluetoothEscposPrinter.printText(' \r\n', {});
          }

          await BluetoothEscposPrinter.printText(
            '_________________________________\r\n',
            {
              fonttype: 1,
              heigthtimes: 1,
            },
          );
          await BluetoothEscposPrinter.printText('\r\n', {});
          await BluetoothEscposPrinter.printerAlign(
            BluetoothEscposPrinter.ALIGN.CENTER,
          );
          await BluetoothEscposPrinter.printText(
            "Merci d'avoir commandé chez Live Resto\r\n",
            {
              encoding: 'windows-1250',
              codepage: 25,
            },
          );

          await BluetoothEscposPrinter.printText(
            'UNE ENTREPRISE FRAN€AISE \r\n',
            {
              encoding: 'GBK',
            },
          );
          await BluetoothEscposPrinter.printerAlign(
            BluetoothEscposPrinter.ALIGN.CENTER,
          );
          await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
          await BluetoothEscposPrinter.printText('  \r\n', {
            encoding: 'windows-1250',
            codepage: 25,
            widthtimes: 3,
            heigthtimes: 3,
            fonttype: 1,
          });
        } catch (error) {
          dispatch({
            type: PRINTER_FAILED,
            payload: 'COMMANDE NON IMPRIMÉE !',
          });
          setTimeout(() => {
            dispatch({type: DELETE_MESSAGES_PRINTER});
          }, 5000);
          alert(error);
        }
        ActiveDone();

        // console.log('#', item?.id)
        // console.log('Client :', item?.delivery.full_name)
        // console.log('Addresse', item?.delivery.address)
        // console.log('Ville', item?.delivery.city)

        //  if (ordersById && ordersById.length > 0) {
        //    ordersById?.map((i) => {
        //      console.log("----------------------",  i?._joinData.quantity, "  ", i.title , "  ", i?._joinData.price.toFixed(2));
        //       //  i._joinData.extras && console.log('----------------------', i._joinData.extras);
        //      i._joinData.extras &&
        //        i._joinData.extras.map((ext) => {
        //          return console.log(
        //            "-----------EXTRAS-----------",
        //            ext.option,

        //            ext.choice,
        //            "prix ****",
        //            ext.price
        //          );
        //        });
        //    });
        //  }

        // console.log( " Nombre d'articles: " , nombreArticl)
        // console.log("Moyen de paiment : ", item.payments[0].title);

        //  console.log(
        //    "Frais de Livraison",
        //    ":",
        //    "" + item.delivery_price.toFixed(2) + " €"
        //  );

        // console.log("Remise", item.discount.toFixed(2));
        // console.log("Prix Total :", "", "" + item.total.toFixed(2) + " €");

        // //  console.log("item.discount", item.discount);
        //  console.log("is Done .... ", isDone?'cut' :"next");
        console.log(
          '' + ' amount',
          item?.payments[0].title,
          ':',
          item?.payments[0]._joinData.amount,
        );
      }
      if (isDone) {
        await BluetoothEscposPrinter.cutOnePoint();
        // console.log(`cut priint`, i);
        // console.log(`-----------`);
        if (i <= nombreTicket) {
          ActiveChange();
          // console.log("is change .... ");
        } else {
          DesActiveChange();
        }
      }
      i++;
    } while (i <= nombreTicket);
  };
  // To cuisnie
  const ToCuisine = async id => {
    // const url = 'https://m2.live-resto.fr/apiv2e/orders/update';
    // const url = 'https://devgab.live-resto.fr/apiv2e/orders/update';

    let API_BASE_URL;

    if (__DEV__) {
      API_BASE_URL = API_URL_DEV;
    } else {
      API_BASE_URL = API_URL_PROD;
    }

    let url = `${API_BASE_URL}/orders/update`;
    try {
      dispatch({type: LOADING});
      await fetch(url, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + Token,
          login: login?.login,
          establishment: establishments?.id,
        },
        body: JSON.stringify({
          orderId: id,
          action: 'kitchenstate_id',
          kitchenstate_id: 30,
        }),
      })
        .then(res => res.json())
        .then(response => {
          console.log('response||||', response);
          dispatch({type: SUCCESS});
          GetAllCommandes(dispatch, configHead);
        });
    } catch (error) {
      console.log(error);
    }
  };
  // Prete
  const ToDeliv = async id => {
    // const url = 'https://m2.live-resto.fr/apiv2e/orders/update';
    // const url = 'https://devgab.live-resto.fr/apiv2e/orders/update';

    // m2.live-resto.fr

    let API_BASE_URL;
    if (__DEV__) {
      API_BASE_URL = API_URL_DEV;
    } else {
      API_BASE_URL = API_URL_PROD;
    }

    let url = `${API_BASE_URL}/orders/update`;

    console.log('orders', url)
    try {
      dispatch({type: LOADING});
      await fetch(url, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + Token,
          login: login?.login,
          establishment: establishments?.id,
        },
        body: JSON.stringify({
          orderId: id,
          action: 'kitchenstate_id',
          kitchenstate_id: 40,
        }),
      })
        .then(res => res.json())
        .then(response => {
          console.log('response||||', response);
          dispatch({type: SUCCESS});
          GetAllCommandes(dispatch, configHead);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const AcitvePopUp = () => {
    setVisible(true);
  };
  const DesAcitvePopUp = () => {
    setVisible(false);
  };
  const ActiveLoading = () => {
    setLoading(true);
  };
  const DesActiveLoading = () => {
    setLoading(false);
  };
  const GetOrdersOnClick = async (id, item) => {
    ActiveLoading();

    let body = JSON.stringify({
      orderId: id,
    });
    // let URL = 'https://m2.live-resto.fr/apiv2e/orders/details';
    // let URL = "https://devgab.live-resto.fr/apiv2e/orders/details";
    let API_BASE_URL;

    if (__DEV__) {
      API_BASE_URL = API_URL_DEV;
    } else {
      API_BASE_URL = API_URL_PROD;
    }

    let url = `${API_BASE_URL}/orders/details`;
    try {
      if (Token) {
        await fetch(url, {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + Token,
            login: login?.login,
            establishment: establishments?.id,
          },
          body,
        })
          .then(res => res.json())
          .then(dataStatus => {
            ActiveDone(),
              ActiveChange(),
              // console.log('dataStatus.order.products,', dataStatus.order.products,)
              // console.log('dataStatus.order.productsCount,', dataStatus.order.productsCount,)
              PrinteById(
                item,
                dataStatus.order.products,
                dataStatus.order.productsCount,
              );
          })
          .catch(err => {
            console.log('--- error fey', err);
            // dispatch({type: COMMANDES_FAILED});
          });
        dispatch({type: REFRESH});
      }
    } catch (error) {
      console.log('--- error fey', error);
    }
  };
  // function Button Card 1
  const OnClick = (id, item) => {
    if (isPrinter) {
      GetOrdersOnClick(id, item);
      setTimeout(() => {
        ToCuisine(id);
        setLoading(false);
      }, 4000);
    } else {
      setLoading(true);
      AcitvePopUp();
      setTimeout(() => {
        ToCuisine(id);
        dispatch({type: REFRESH});
        setLoading(false);
      }, 4000);
    }
  };
  // function Button Card 2
  const ToPrete = id => {
    ActiveLoading();
    setTimeout(() => {
      ToDeliv(id);
      dispatch({type: REFRESH});
    }, 3000);
    // }
  };
  // function Button Card 3
  const OnPrinte = (id, item) => {
    if (isPrinter) {
      GetOrdersOnClick(id, item);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } else {
      ActiveLoading();
      AcitvePopUp();
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  const NavigatonTo = (nav, To) => {
    nav.navigate(To);
  };

  const ToReservation = () => {
    navigation.navigate('Reservation');
  };
  const ToCommandes = () => {
    navigation.navigate('Commandes');
  };

  return {
    textButtonFiltre,
    toComfirm,
    setStatus,
    status,
    GetProducts,
    Token,
    orders,
    mergedArray,
    ToCuisine,
    configHead,
    ToDeliv,
    loading_btn,
    isPrinter,
    OnClick,
    Visible,
    DesAcitvePopUp,
    refresh,
    ToPrete,
    Loading,
    ActiveChange,
    ActiveDone,
    AcitvePopUp,
    NavigatonTo,
    GetOrdersOnClick,
    ActiveLoading,
    DesActiveLoading,
    PrinteById,
    width,
    OnPrinte,
    dispatch,
    ToReservation,
    ToCommandes,
  };
}

//  test printer extars in line
// {
//   orders && orders.length > 0
//     ? orders.map((i) => {
//         i._joinData.extras &&
//           i._joinData.extras.map((ext) => {
//             return BluetoothEscposPrinter.printColumn(
//               [32, 0, 8],
//               [
//                 BluetoothEscposPrinter.ALIGN.LEFT,
//                 BluetoothEscposPrinter.ALIGN.LEFT,
//                 BluetoothEscposPrinter.ALIGN.RIGHT,
//               ],
//               [
//                 "" + "extars" + " ",
//                 "" + ext.choice + "",
//                 "" + ext.price + " €",
//               ],
//               {
//                 encoding: "windows-1254",
//                 codepage: 25,
//                 widthtimes: 0.75,
//                 heigthtimes: 0.75,
//               }
//             );
//           });
//       })
//     : await BluetoothEscposPrinter.printText(
//         "No article .... \r\n",
//         {}
//       );
// }

// const doWihlePrintr = async (item) => {
//   let i = 1;
//   do {
//     if (IsChanged && orders) {
//       // console.log(`title print`, i);
//       // console.log(`body print`, i);
//       try {
//         await BluetoothEscposPrinter.printerInit();
//         await BluetoothEscposPrinter.printerLeftSpace(0);
//         await BluetoothEscposPrinter.printerAlign(
//           BluetoothEscposPrinter.ALIGN.CENTER
//         );
//         await BluetoothEscposPrinter.setBlob(0);
//         await BluetoothEscposPrinter.printText("______________________\r\n", {
//           fonttype: 3,
//           widthtimes: 1,
//           heigthtimes: 1,
//         });
//         await BluetoothEscposPrinter.printText("Live Resto\r\n", {
//           encoding: "GBK",
//           codepage: 0,
//           widthtimes: 3,
//           heigthtimes: 3,
//           fonttype: 1,
//         });
//         await BluetoothEscposPrinter.setBlob(0);
//         await BluetoothEscposPrinter.printText("#" + item.id + "\r\n", {
//           encoding: "GBK",
//           codepage: 0,
//           widthtimes: 3,
//           heigthtimes: 3,
//           fonttype: 1,
//         });
//         await BluetoothEscposPrinter.printText(
//           "______________________________________\r\n",
//           {
//             fonttype: 1,
//           }
//         );
//         await BluetoothEscposPrinter.printerAlign(
//           BluetoothEscposPrinter.ALIGN.CENTER
//         );
//         await BluetoothEscposPrinter.setBlob(0);
//         await BluetoothEscposPrinter.printText(" Livraison \r\n", {
//           encoding: "GBK",
//           codepage: 0,
//           widthtimes: 3,
//           heigthtimes: 3,
//           fonttype: 1,
//         });
//         await BluetoothEscposPrinter.printText("\r\n", {});
//         await BluetoothEscposPrinter.printerAlign(
//           BluetoothEscposPrinter.ALIGN.CENTER
//         );
//         await BluetoothEscposPrinter.printText(
//           "Client : " +
//             item.delivery.full_name +
//             "  --  " +
//             item.delivery.phone +
//             "\r\n",
//           {}
//         );
//         await BluetoothEscposPrinter.printText(
//           " Addresse : " + item.delivery.address + "  \r\n",
//           {}
//         );
//         await BluetoothEscposPrinter.printText(
//           "Ville : " + item.delivery.city + " \r\n",
//           {}
//         );
//         await BluetoothEscposPrinter.printerAlign(
//           BluetoothEscposPrinter.ALIGN.CENTER
//         );
//         await BluetoothEscposPrinter.printText(
//           "______________________________________\r\n",
//           {
//             fonttype: 1,
//           }
//         );
//         await BluetoothEscposPrinter.printText("\r\n", {});

//         {
//           orders.map((i) => {
//             return (
//               BluetoothEscposPrinter.printColumn(
//                 [38, 0, 8],
//                 [
//                   BluetoothEscposPrinter.ALIGN.LEFT,
//                   BluetoothEscposPrinter.ALIGN.CENTER,
//                   BluetoothEscposPrinter.ALIGN.RIGHT,
//                 ],
//                 [
//                   "" + i?._joinData.quantity + "x " + i?.title + "",
//                   "",
//                   "" + i?._joinData.price.toFixed(2) + " €",
//                 ],
//                 {
//                   encoding: "windows-1254",
//                   codepage: 25,
//                   widthtimes: 0.75,
//                   heigthtimes: 0.75,
//                 }
//               ),
//               i._joinData.extras &&
//                 i._joinData.extras.map((ext) => {
//                   return (
//                     BluetoothEscposPrinter.printerAlign(
//                       BluetoothEscposPrinter.ALIGN.LEFT
//                     ),
//                     BluetoothEscposPrinter.printText(
//                       " " + ext.choice + "\r\n",
//                       {
//                         encoding: "windows-1254",
//                         codepage: 25,
//                       }
//                     )
//                   );
//                 }),
//               BluetoothEscposPrinter.printText("\r\n", {})
//             );
//           });
//         }

//         await BluetoothEscposPrinter.printText("\r\n", {});
//         await BluetoothEscposPrinter.printerAlign(
//           BluetoothEscposPrinter.ALIGN.CENTER
//         );
//         await BluetoothEscposPrinter.setBlob(0);
//         await BluetoothEscposPrinter.printText(
//           " Nombre d'articles: " + orders.productsCount + "\r\n",
//           {
//             encoding: "windows-1254",
//             codepage: 25,
//             widthtimes: 1,
//             heigthtimes: 1,
//             fonttype: 1,
//           }
//         );

//         await BluetoothEscposPrinter.printText(
//           "______________________________________\r\n",
//           {
//             fonttype: 1,
//           }
//         );
//         await BluetoothEscposPrinter.printColumn(
//           [20, 2, 10],
//           [
//             BluetoothEscposPrinter.ALIGN.LEFT,
//             BluetoothEscposPrinter.ALIGN.LEFT,
//             BluetoothEscposPrinter.ALIGN.RIGHT,
//           ],
//           ["Moyen de paiement ", ":", "" + item.payments[0].title + ""],
//           {
//             encoding: "windows-1254",
//             codepage: 25,
//           }
//         );
//         await BluetoothEscposPrinter.printColumn(
//           [20, 2, 10],
//           [
//             BluetoothEscposPrinter.ALIGN.LEFT,
//             BluetoothEscposPrinter.ALIGN.LEFT,
//             BluetoothEscposPrinter.ALIGN.RIGHT,
//           ],
//           [
//             "Frais de Livraison",
//             ":",
//             "" + item.delivery_price.toFixed(2) + " €",
//           ],
//           {
//             encoding: "windows-1254",
//             codepage: 25,
//           }
//         );

//         await BluetoothEscposPrinter.printColumn(
//           [20, 2, 10],
//           [
//             BluetoothEscposPrinter.ALIGN.LEFT,
//             BluetoothEscposPrinter.ALIGN.CENTER,
//             BluetoothEscposPrinter.ALIGN.RIGHT,
//           ],
//           ["Remise :", "", "" + item.discount.toFixed(2) + " € \r\n"],
//           {
//             encoding: "windows-1254",
//             codepage: 25,
//           }
//         );

//         await BluetoothEscposPrinter.printColumn(
//           [14, 0, 8],
//           [
//             BluetoothEscposPrinter.ALIGN.LEFT,
//             BluetoothEscposPrinter.ALIGN.LEFT,
//             BluetoothEscposPrinter.ALIGN.RIGHT,
//           ],
//           ["Prix Total :", "", "" + item.total.toFixed(2) + " €"],
//           {
//             encoding: "windows-1254",
//             codepage: 25,
//             widthtimes: 1,
//             heigthtimes: 1,
//           }
//         );

//         await BluetoothEscposPrinter.printText(
//           "_________________________________\r\n",
//           {
//             fonttype: 1,
//             heigthtimes: 1,
//           }
//         );
//         await BluetoothEscposPrinter.printText("\r\n", {});
//         await BluetoothEscposPrinter.printerAlign(
//           BluetoothEscposPrinter.ALIGN.CENTER
//         );
//         await BluetoothEscposPrinter.printText(
//           "Merci d'avoir commandé chez Live Resto\r\n",
//           {
//             encoding: "windows-1250",
//             codepage: 25,
//           }
//         );

//         await BluetoothEscposPrinter.printText(
//           "UNE ENTREPRISE FRAN€AISE \r\n",
//           {
//             encoding: "GBK",
//           }
//         );
//         await BluetoothEscposPrinter.printerAlign(
//           BluetoothEscposPrinter.ALIGN.CENTER
//         );
//         await BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {});
//         await BluetoothEscposPrinter.printText("  \r\n", {
//           encoding: "windows-1250",
//           codepage: 25,
//           widthtimes: 3,
//           heigthtimes: 3,
//           fonttype: 1,
//         });
//       } catch (error) {
//         dispatch({ type: PRINTER_FAILED, payload: "l'impression échoué" });
//         setTimeout(() => {
//           dispatch({ type: DELETE_MESSAGES_PRINTER });
//         }, 5000);
//         alert(error);
//       }

//       ActiveDone();
//       console.log("is Done .... ", item.id);
//       console.log("item.discount .... ", item.discount);
//       if (orders && orders.length > 0) {
//         orders?.map((i) => {
//           console.log("----------------------", i.title);
//         });
//       }
//     }
//     if (isDone) {
//       await BluetoothEscposPrinter.cutOnePoint();
//       // console.log('nombreTicket', nombreTicket);
//       console.log(`cut priint`, i);
//       console.log("orders.productsCount", orders.productsCount);
//       console.log(`-----------`);
//       if (i <= nombreTicket) {
//         ActiveChange();
//         console.log("is change .... ");
//       } else {
//         DesActiveChange();
//       }
//     }
//     i++;
//   } while (i <= nombreTicket);
// };

// console.log(establishments?.id,'estaId')
// console.log(login?.login,'login')
// console.log(user,'user')
// let login = AsyncStorage.getItem('login');
// let establishment_id = AsyncStorage.getItem('_id');
// const [login, setLogin] = useState('')
// const [establishments_id, setEstablishmentId] = useState('')
// const [token, setToken] = useState('')

//   useEffect(() => {
//     setTimeout(async () => {
//       try {
//     let login = await AsyncStorage.getItem('login');
//     let establishment_id=await AsyncStorage.getItem('_id')
//     let token= await AsyncStorage.getItem('token')
//     if (login && token && establishment_id) {
//      setLogin(login);
//      setEstablishmentId(establishment_id)
//      setToken(token)
//     }

//   } catch (error) {
//     error,
//       // dispatch({ type: LOGIN_FAILED, payload: "échec de connexion !" }),
//       console.log('error login commande header', error.message);
//     console.log('error', error);
//   }
// }, 1000);
//   }, []);

// await BluetoothEscposPrinter.printText(
//   'Client : ' +
//     item?.delivery.full_name +
//     '  --  ' +
//     item?.delivery.phone +
//     '\r\n',
//   {},
// );
// await BluetoothEscposPrinter.printText(
//   ' Adresse : ' + item?.delivery.address + '  \r\n',
//   {},
// );
// item?.delivery.address_extra !== '' &&
//   (await BluetoothEscposPrinter.printText(
//     ' Addresse_extra : ' + item?.delivery.address_extra + '  \r\n',
//     {},
//   ));
// item?.delivery.city !== '' &&
//   (await BluetoothEscposPrinter.printText(
//     'City : ' +
//       item?.delivery.city +
//       ' - ' +
//       item?.delivery.postal +
//       ' \r\n',
//     {},
//   ));

// item?.delivery.floor !== '' &&
//   (await BluetoothEscposPrinter.printText(
//     'etage : ' + item?.delivery.floor + ' \r\n',
//     {},
//   ));
// item?.delivery.residence !== '' &&
//   (await BluetoothEscposPrinter.printText(
//     'residence : ' + item?.delivery.residence + ' \r\n',
//     {},
//   ));
// item?.delivery.building !== '' &&
//   (await BluetoothEscposPrinter.printText(
//     'building : ' + item?.delivery.building + ' \r\n',
//     {},
//   ));
// item?.delivery.apartment !== '' &&
//   (await BluetoothEscposPrinter.printText(
//     'apartment : ' + item?.delivery.apartment + ' \r\n',
//     {},
//   ));
// item?.delivery.code_doorbell !== '' &&
//   (await BluetoothEscposPrinter.printText(
//     'code_doorbell : ' + item?.delivery.code_doorbell + ' \r\n',
//     {},
//   ));
// item?.delivery.code_portal !== '' &&
//   (await BluetoothEscposPrinter.printText(
//     'code_portal : ' + item?.delivery.code_portal + ' \r\n',
//     {},
//   ));
// item?.delivery.code_building !== '' &&
//   (await BluetoothEscposPrinter.printText(
//     'code_building : ' + item?.delivery.code_building + ' \r\n',
//     {},
//   ));
// item?.delivery.code_elevator !== '' &&
//   (await BluetoothEscposPrinter.printText(
//     'code_elevator : ' + item?.delivery.code_elevator + ' \r\n',
//     {},
//   ));

// await BluetoothEscposPrinter.printerAlign(
//   BluetoothEscposPrinter.ALIGN.CENTER,
// );
// await BluetoothEscposPrinter.printText(
//   '______________________________________\r\n',
//   {
//     fonttype: 1,
//   },
// );
