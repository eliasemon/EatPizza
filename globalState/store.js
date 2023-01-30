import { createStore , action , thunk } from 'easy-peasy';
import { CheckoutCardActions } from '../constants/enum';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const store = createStore({
    shopingCard : {},
    totalItemCount : 0,
    subTottal :  0,

    cachesForOrder : {},


    bootloaderLoading : true,
    LoginUI : false,


    unexpectedBackHandle : false,

    // actions 
    
    unexpectedBackHandleAction : action((state , payload) => {
        state.unexpectedBackHandle = payload;
        return

    }),

    LoadingChanger : action((state, payload) => {
        const {status , type} = payload
        if(type === "LoginUI"){
            state.LoginUI = status;
            return
        }        
        state.bootloaderLoading = status;
    }),


    // -------------

    clearShopingCard : thunk(async (actions, payload , {getStoreState}) => {
        await actions.clearShopingCardAction(payload);
        const {shopingCard , totalItemCount , subTottal } = getStoreState();
        const data = {shopingCard : {...shopingCard} ,totalItemCount : totalItemCount , subTottal : subTottal    }
        await AsyncStorage.setItem(
        'shopingCardLocalStorage',
            JSON.stringify(data),
        )
      }),

        clearShopingCardAction : action((state , payload)=>{
            state.shopingCard = {}
            state.totalItemCount = 0,
            state.subTottal = 0
        }),


        addDataFromLocalStorage : action((state,payload)=>{
            state.shopingCard = payload.shopingCard
            state.subTottal = payload.subTottal
            state.totalItemCount = payload.totalItemCount
        }),

        addDataToCachesForOrder : action((state , payload)=>{
            const {type , data} = payload
            if(type === "spread"){
                const tempData = { ...state.cachesForOrder} 
                state.cachesForOrder = {...tempData , ...data}
            }else {
                state.cachesForOrder  = {...data} 
            }
        }),
    //
    
    addToCard : thunk(async (actions, payload , {getStoreState}) => {
        await actions.addToShopingCart(payload);
        const {shopingCard , totalItemCount , subTottal } = getStoreState();
        const data = {shopingCard : {...shopingCard} ,totalItemCount : totalItemCount , subTottal : subTottal    }
        await AsyncStorage.setItem(
        'shopingCardLocalStorage',
            JSON.stringify(data),
        )
      }),

    addToShopingCart : action((state, payload) => {
        const {shopingCard} = state
        const {data , key} = payload
        
        state.totalItemCount += Number(data.itemCount)
        const unitPrice = Object.keys(data?.selectedAddonsForCard).reduce((acc , key)=>{
            const raw = data?.selectedAddonsForCard[key]
            acc =  acc +  (Number(raw.price) || 0)
            return acc
        },Number(data?.selectedVariant?.sellingPrice))
       
        const TotalPrice = (unitPrice * Number(data?.itemCount) )

        state.subTottal = Number(state.subTottal)  + TotalPrice
        data.unitPrice = unitPrice
        if(shopingCard[key]){ 
            shopingCard[key].itemCount = Number(shopingCard[key].itemCount) + data.itemCount
          }else{
            shopingCard[key] = data
        }
        
      }),


      UpdateCardItem : thunk(async (actions, payload , {getStoreState}) => {
        await actions.UpdateShopingCardItems(payload);
        const {shopingCard , totalItemCount , subTottal } = getStoreState();
        const data = {shopingCard : {...shopingCard} ,totalItemCount : totalItemCount , subTottal : subTottal    }
        await AsyncStorage.setItem(
        'shopingCardLocalStorage',
            JSON.stringify(data),
        )
      }),


    UpdateShopingCardItems :  action((state, payload) =>{
        const {action , key} = payload
        const {shopingCard} = state

        if(action == CheckoutCardActions.delete){
            state.subTottal -= (shopingCard[key].unitPrice  * shopingCard[key].itemCount)
            state.totalItemCount -= (shopingCard[key].itemCount)
            delete shopingCard[key];
            return
        }
        if(action == CheckoutCardActions.increment){
            state.totalItemCount += 1
            shopingCard[key].itemCount = Number(shopingCard[key].itemCount) + 1
            state.subTottal += shopingCard[key].unitPrice
            return
        }
        
        if(action == CheckoutCardActions.decrement){
            state.totalItemCount -= 1
            shopingCard[key].itemCount = Number(shopingCard[key].itemCount) - 1
            state.subTottal -= shopingCard[key].unitPrice
            return
        }
    })


    // productDetailsUiForAddToCard : false
  });


//   if(item?.selectedAddonsForCard){
//     setItemAddonsUI(
//     Object.keys(item?.selectedAddonsForCard).map((key=>{
//         const data = item?.selectedAddonsForCard[key]
//         totalPice.current+=Number(data.price)
//         return (
//             <View key={key} style={{display : "flex" ,  flexDirection: 'row' ,justifyContent : "space-between"}}> 
//                 <Text style={styles.cardTextTitle}>{data.name}</Text>
//                 <Text style={styles.cardTextTitle}>{data.price}৳</Text>
//             </View>
//         )
//     }))
//     )
//     unitPrice.current = totalPice.current;
//     totalPice.current *= Number(item.itemCount)
//     subTottal.current = Number(subTottal.current) + totalPice.current
// }