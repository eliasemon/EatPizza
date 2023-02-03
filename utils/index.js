// import { toast } from 'react-toastify'; 

// import { async } from "@firebase/util";
// import { async } from "@firebase/util";

import { getFirestore } from "firebase/firestore";
import {  
   where ,
   deleteDoc ,
   doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
  query,
  orderBy,
  startAt,
  startAfter,
  endAt,
  limit } from "firebase/firestore";
// import { closeLoading, showLoading } from '../src/components/loading/loading';





// export const getUsersOrderHistory = async ( setItems , collectionRef , queryObj  ) =>{
//   const db = getFirestore()
//   const q = query(collection(db, `${collectionRef}`) , where(`${queryObj.queryField}` ,  '==' , queryObj.targetItem ));

//   const data = await getDocs(q)
//   // const reverseData = (data.docs).reverse()
//   setItems(data.docs)
// }

export const getUsersOrderHistory = async ( setItems , collectionRef , queryObj  ) =>{
  const db = getFirestore()
  const q = query(collection(db, `${collectionRef}`) , where(`${queryObj.queryField}` ,  '==' , queryObj.targetItem ));

  const data = await getDocs(q)
  // const reverseData = (data.docs).reverse()
  setItems(data.docs)
}

export const getCurrentOrder = async ( setItems , collectionRef , queryObj  ) =>{
  const db = getFirestore()
  const q = query(collection(db, `${collectionRef}`) , where(`${queryObj.queryField}` ,  '==' , queryObj.targetItem ) , where("status" ,  "not-in" , [ "cancel" , "compleate"]));
  onSnapshot(q ,(snapshot) =>{
    setItems(snapshot)
  })
}





export const getDataWithInfinityScroll = async ( setItems , collectionRef , limitation , lastDoc , queryObj ) =>{
  const db = getFirestore()
  let q;
  if(queryObj){
    q = query(collection(db, `${collectionRef}`),where(`${queryObj.queryField}` ,  'array-contains-any' , queryObj.queryArray ) ,orderBy("name"), startAfter(lastDoc || 0), limit(limitation));
  }else{
    q = query(collection(db, `${collectionRef}`), orderBy("name"), startAfter (lastDoc || 0), limit(limitation));
  }
    const data = await getDocs(q)
  // console.log(data.docs.length)
  setItems(data.docs)
}




export const getDataWithOutRealTimeUpdates = async (setState, collectionRef) => {
  const db = getFirestore()
  const q = query(collection(db, `${collectionRef}`));
      const data = await getDocs(q)
      setState(data.docs)
 
  // return returnPromise
}













export const showDataWithOutPagination = (setState, collectionRef) => {
  const db = getFirestore()
  const q = query(collection(db, `${collectionRef}`));
  const returnPromise = new Promise((resolve , reject)=>{
      onSnapshot(q, (snapshot) => {

      setState(snapshot.docs)
      resolve(snapshot.docs.length)
        // //   .forEach(doc => console.log(doc.data()))
    })
  })
  return returnPromise
}

export const getSingleDataWithOutRealTimeUpdates = async (collectionRef , idRef) => {
  const db = getFirestore()
  const docRef = doc(db, `${collectionRef}`, `${idRef}`);
  const docSnap = await getDoc(docRef);
  return new Promise((resolve , reject)=>{
    if (docSnap.exists()) {
      resolve(docSnap.data())
    }else{
      reject("SomeThings went worng don't do piracy")
    }


  })
}

export const getSingleDataWithRealTimeUpdates = async ( setState ,collectionRef , idRef) => {
  const db = getFirestore()
  const docRef = doc(db, `${collectionRef}`, `${idRef}`);
  onSnapshot(docRef , (snapshot)=>{
    setState(snapshot.data())
  })
}



export const getSingleDataWithOutRealTimeUpdatesWithoutCustomPromise = async (collectionRef , idRef) => {
  const db = getFirestore()
  const docRef = doc(db, `${collectionRef}`, `${idRef}`);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  if(data){
    data.id = docSnap.id
  }
  
  return data
}


export const showDataByArrayQuers = (setState , collectionRef , queryArray , queryField ) => {
  const db = getFirestore()
  const q = query(collection(db, `${collectionRef}`), where(`${queryField}`, 'array-contains-any', queryArray));
  
  onSnapshot(q, (snapshot) => {
    setState(snapshot.docs)
  })

}

export const addDataToCollection = async (items, collectionRef) => {
  const db = getFirestore()
  try {

    const colRef = collection(db, `${collectionRef}`)
    if(await isExist(colRef , items.name)){
     
      return
    }
    await addDoc( colRef , { ...items });
  

  } catch (e) {

  }
}


export const setDataToCollection = async (items , collectionRef , isSingle = true) => {
  const db = getFirestore()
  try {
  
    if(isSingle && await isExist(collection(db, `${collectionRef}`) , items.name)){
      return
    }
    const colRef = doc(db, `${collectionRef}` , `${items.id}`)
    console.log(JSON.stringify(items))
    // delete items["id"]
    await setDoc( colRef ,  {...items});
 
  } catch (e) {
    console.log(e)
  }
}






const isExist = async (colRef , itemsName) =>{
  const q = query(colRef, where("name", "==", itemsName));
  const docSnap = await getDocs(q)
  if(docSnap.docs.length == 0){
    return false
  }
  return true
}



// export const delteColloctionInstance = async (itemsID, collectionRef) => {
//   try {

//     await deleteDoc(doc(db, `${collectionRef}`, `${itemsID}`));

//   } catch (e) {

//   }
  
// }






// export const UUID =   () => {
//   var dt = new Date().getTime();
//   var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
//       var r = (dt + Math.random()*16)%16 | 0;
//       dt = Math.floor(dt/16);
//       return (c=='x' ? r :(r&0x3|0x8)).toString(16);
//   });
//   return uuid;
// }


// export const shortUUID =   () => {
//   var dt = new Date().getTime();
//   var uuid = 'xy-xxx-yxy-xxy'.replace(/[xy]/g, (c) => {
//       var r = (dt + Math.random()*16)%16 | 0;
//       dt = Math.floor(dt/16);
//       return (c=='x' ? r :(r&0x3|0x8)).toString(16);
//   });
//   return uuid;
// }

