// import { toast } from 'react-toastify'; 

// import { async } from "@firebase/util";
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
import { db } from "../config";
// import { closeLoading, showLoading } from '../src/components/loading/loading';



export const getDataWithInfinityScroll = async ( setItems , collectionRef , limitation , lastDoc  ) =>{

  const q = query(collection(db, `${collectionRef}`), orderBy("name"), startAfter (lastDoc || 0), limit(limitation));
  const data = await getDocs(q)
  // console.log(data.docs.length)
  setItems(data.docs)
}












export const showDataWithPagination = (setState, collectionRef, startingPoint, limitation, fristAttemp) => {
  const q = query(collection(db, `${collectionRef}`), orderBy("name"), startAt(startingPoint), limit(limitation));
  if (fristAttemp) {
    // getDocs(collection(db, `${collectionRef}`) , (snapshot) => {
    // })
  }
  onSnapshot(q, (snapshot) => {
    setState(prv => ({ ...prv, snapshot: snapshot }))
    //   .forEach(doc => console.log(doc.data()))  
  })
}

export const showDataWithOutPagination = (setState, collectionRef) => {

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


export const showDataByArrayQuers = (setState , collectionRef , queryArray , queryField ) => {
  const q = query(collection(db, `${collectionRef}`), where(`${queryField}`, 'array-contains-any', queryArray));
  
  onSnapshot(q, (snapshot) => {
    setState(snapshot.docs)
  })

}

export const addDataToCollection = async (items, collectionRef) => {

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
  try {
  
    if(isSingle && await isExist(collection(db, `${collectionRef}`) , items.name)){
     
      return
    }
    const colRef = doc(db, `${collectionRef}` , `${items.id}`)
    // delete items["id"]
    await setDoc( colRef ,  {...items});
 
  } catch (e) {
   
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