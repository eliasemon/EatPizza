import { createStore , action } from 'easy-peasy';
import { CheckoutCardActions } from '../constants/enum';

export const store = createStore({
    shopingCard : {},
    totalItemCount : 0,
    subTottal :  0,


    bootloaderLoading : true,
    LoginUI : false,

    // actions 

    LoadingChanger : action((state, payload) => {
        const {status , type} = payload
        if(type === "LoginUI"){
            state.LoginUI = status;
            return
        }        
        state.bootloaderLoading = status;
    }),


    // -------------
    addToCard : action((state, payload) => {
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
            shopingCard[key].itemCount = Number(prv[key].itemCount) + data.itemCount
          }else{
            shopingCard[key] = data
        }
        console.log(state.subTottal)
      }),

    UpdateCardItem :  action((state, payload) =>{
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