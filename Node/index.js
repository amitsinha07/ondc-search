const { createAuthorizationHeader } = require("ondc-crypto-sdk-nodejs");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const { isHeaderValid } = require("ondc-crypto-sdk-nodejs");

// const body = {
//     context: {
//       action: "search",
//       bap_id: "ondc-bob.azurewebsites.net",
//       bap_uri: "https://ondc-bob.azurewebsites.net",
//       domain: "ONDC:TRV10",
//       location: {
//         city: {
//           code: "std:080"
//         },
//         country: {
//           code: "IND"
//         }
//       },
//       message_id: "40963dc1-e402-4f4d-ae70-7c5863ca612c",
//       timestamp: "2024-10-16T12:53:41.867Z",
//       transaction_id: "870782be-6757-43f1-945c-8eeaf9536329",
//       ttl: "PT30S",
//       version: "2.0.1"
//     },
//     message: {
//       intent: {
//         fulfillment: {
//           stops: [
//             {
//               location: {
//                 gps: "13.008935, 77.644408"
//               },
//               type: "START"
//             },
//             {
//               location: {
//                 gps: "12.971186, 77.586812"
//               },
//               type: "END"
//             }
//           ]
//         },
//         payment: {
//           collected_by: "BPP",
//           tags: [
//             {
//               descriptor: {
//                 code: "BUYER_FINDER_FEES"
//               },
//               display: false,
//               list: [
//                 {
//                   descriptor: {
//                     code: "BUYER_FINDER_FEES_PERCENTAGE"
//                   },
//                   value: "3"
//                 }
//               ]
//             },
//             {
//               descriptor: {
//                 code: "SETTLEMENT_TERMS"
//               },
//               display: false,
//               list: [
//                 {
//                   descriptor: {
//                     code: "DELAY_INTEREST"
//                   },
//                   value: "5"
//                 },
//                 {
//                   descriptor: {
//                     code: "STATIC_TERMS"
//                   },
//                   value: "https://bob.org.in/privacy-policy"
//                 }
//               ]
//             }
//           ]
//         }
//       }
//     }
//   };

// const body = {
//   context: {
//     domain: "ONDC:TRV10",
//     action: "search",
//     country: "IND",
//     city: "std:080",
//     core_version: "2.0.1",
//     bap_id: "evolving-fawn-cleanly.ngrok-free.app",
//     bap_uri: "https://evolving-fawn-cleanly.ngrok-free.app",
//     transaction_id: "supr_kt1U3ujL",
//     message_id: "msg_MZJoEMmq",
//     timestamp: "2024-12-02T15:29:07.107993",
//     ttl: "PT30S"
//   },
//   message: {
//     intent: {
//       category: {
//         id: "Foodgrains"
//       },
//       fulfillment: [
//         {
//           type: "Delivery"
//         }
//       ],
//       payment: {
//         "@ondc/org/buyer_app_finder_fee_type": "percent",
//         "@ondc/org/buyer_app_finder_fee_amount": "3"
//       },
//       tags: [
//         {
//           code: "bap_terms",
//           list: [
//             {
//               code: "static_terms",
//               value: ""
//             },
//             {
//               code: "static_terms_new",
//               value: "https://github.com/ONDC-Official/NP-Static-Terms/buyerNP_BNP/1.0/tc.pdf"
//             },
//             {
//               code: "effective_date",
//               value: "2023-10-01T00:00:00.000Z"
//             }
//           ]
//         }
//       ]
//     }
//   }
// };

const body = {
  context: {
    domain: "nic2004:60232",
    country: "IND",
    city: "std:080",
    action: "search",
    core_version: "1.2.0",
    bap_id: "sharique.com",
    bap_uri: "https://sharique.com",
    transaction_id: "T1",
    message_id: "M1",
    timestamp: "2023-06-06T21:00:00.000Z",
    ttl: "PT30S",
  },
  message: {
    intent: {
      category: {
        id: "Immediate Delivery",
      },
      provider: {
        time: {
          days: "1,2,3,4,5,6,7",
          schedule: {
            holidays: ["2023-06-29", "2023-08-15"],
          },
          duration: "PT30M",
          range: {
            start: "1100",
            end: "2100",
          },
        },
      },
      fulfillment: {
        type: "Delivery",
        start: {
          location: {
            gps: "12.453544,77.928379",
            address: {
              area_code: "560041",
            },
          },
          authorization: {
            type: "OTP",
          },
        },
        end: {
          location: {
            gps: "12.453544,77.928379",
            address: {
              area_code: "560001",
            },
          },
          authorization: {
            type: "OTP",
          },
        },
      },
      payment: {
        type: "POST-FULFILLMENT",
        "@ondc/org/collection_amount": "300.00",
      },
      "@ondc/org/payload_details": {
        weight: {
          unit: "kilogram",
          value: 1,
        },
        dimensions: {
          length: {
            unit: "centimeter",
            value: 1,
          },
          breadth: {
            unit: "centimeter",
            value: 1,
          },
          height: {
            unit: "centimeter",
            value: 1,
          },
        },
        category: "Grocery",
        value: {
          currency: "INR",
          value: "300.00",
        },
        dangerous_goods: false,
      },
    },
  },
};

// const requestObject = {
//   context: {
//     domain: "nic2004:60232",
//     country: "IND",
//     city: "std:080",
//     action: "search",
//     core_version: "1.2.0",
//     bap_id: "seller.tipplr.in",
//     bap_uri: "https://seller.tipplr.in/ondc/logistics/v2",
//     transaction_id: "9cfa2b58-c35b-438a-b9d8-782184118be9",
//     message_id: "e98f9020-8fed-432f-8bb2-b0ba164343c3",
//     timestamp: "2024-12-20T04:55:58.131Z",
//     ttl: "PT30S"
//   },
//   message: {
//     intent: {
//       category: {
//         id: "Immediate Delivery"
//       },
//       provider: {
//         time: {
//           days: ["1", "2", "3", "4", "5", "6", "7"],
//           schedule: {
//             holidays: []
//           },
//           duration: "PT15M",
//           range: {
//             start: "1100",
//             end: "2100"
//           }
//         }
//       },
//       fulfillment: {
//         type: "Delivery",
//         start: {
//           location: {
//             gps: "12.905995,77.611475",
//             address: {
//               area_code: "560052"
//             }
//           }
//         },
//         end: {
//           location: {
//             gps: "12.935225,77.562731",
//             address: {
//               area_code: "560050"
//             }
//           }
//         }
//       },
//       payment: {
//         type: "POST-FULFILLMENT"
//       },
//       "@ondc/org/payload_details": {
//         weight: {
//           unit: "kilogram",
//           value: 3
//         },
//         dimensions: {
//           length: {
//             unit: "centimeter",
//             value: 20
//           },
//           breadth: {
//             unit: "centimeter",
//             value: 20
//           },
//           height: {
//             unit: "centimeter",
//             value: 30
//           }
//         },
//         category: "F&B",
//         value: {
//           currency: "INR",
//           value: 327.95
//         },
//         dangerous_goods: false
//       }
//     }
//   }
// };
// seller.tipplr.in|dd53a7c1-2f92-40fe-8aa7-e34f404c6c55



// const data = {
//   context: {
//     city: "std:080",
//     country: "IND",
//     bap_id: "ondc-api.gokhana.com",
//     timestamp: "2024-03-07T16:47:05.417Z",
//     message_id: "af264e20-832a-4720-8e21-eef91fad2972",
//     core_version: "1.2.0",
//     transaction_id: "fb612a4f-43a1-4754-a3de-a30a27ecc7fe",
//     domain: "ONDC:RET11",
//     action: "search",
//     ttl: "PT900S",
//     bap_uri: "https://ondc-api.gokhana.com/protocol/v1",
//   },
//   message: {
//     intent: {
//       payment: {
//         "@ondc/org/buyer_app_finder_fee_amount": "4",
//         "@ondc/org/buyer_app_finder_fee_type": "percent",
//       },
//       fulfillment: {
//         type: "Delivery",
//       },
//     },
//   },
// };

// privateKey:
//       "XkY4N6piI7t+oKret/3rtJW0yQTlvMPUnabFfSrHuP8yEQQ4fjmZv73+9awQdHkTaF38Gwg+tvqO6dVBrMKXkw==",
//     subscriberId: "api.abcscuat.com",

const data = {
  subscriber_id: "api.abcscuat.com",
  type: "BPP",
};

let search = async () => {
  let authorizationHeader = await createAuthorizationHeader({
    body: JSON.stringify(data),
    privateKey:
      "1poOOFXWeEGFA9MpL7J0O46FapaSUTFeZrFwXe3MW672j862MD2KfaGOHLZBg6W9D8/RDySenaJTq3zZ9QV2Cg==",
    subscriberId: "witslab-bap-preprod.thewitslab.com",
    subscriberUniqueKeyId: "3d3412e0-54d7-475d-bcd1-6ab204985e2e"
  });

  console.log(authorizationHeader)

  const res = await axios.post(
    "https://preprod.registry.ondc.org/v2.0/lookup",
    data,
    {
      headers: {
        Authorization: authorizationHeader,
      },
    }
  );
  console.log(res.data);

  // const isValid = await isHeaderValid({
  //   header: `Signature keyId="ondc-api.gokhana.com|c0539246-7697-4927-aa8e-69909a55e0d8|ed25519",algorithm="ed25519",created="1741346290",expires="1741349890",headers="(created) (expires) digest",signature="ZEE7X47/cza3fTIDZzIuZThdl7ZU04KdfSqi/ZeP1XgWaERiGg4Br7hePrfATEvl1czHqU9Yyfb7sXUTM3UGDQ=="`, // The Authorisation header sent by other network participants
  //   body: JSON.stringify(data),
  //   publicKey: "8BAFHvpN8iQ6XAW8f0wHjbzVG7/uTQ2grDFPBdQpCTU=",
  // });
  // console.log(isValid);
};

search();
