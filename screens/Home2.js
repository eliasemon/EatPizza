import React, {useRef , useState , useEffect} from 'react';
import {Animated, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import { getCloser } from '../utils';
import Header from '../components/Header';
// import ListItem from './components/ListItem';


import { View, Text, TouchableOpacity, Image, ScrollView, FlatList, ActivityIndicator } from "react-native";

import { itemList, categories as categoriesList } from '../constants/dummy'
import ProductCard from '../components/ProductCard';
import { getDataWithOutRealTimeUpdates, getDataWithInfinityScroll } from '../utils';





const {diffClamp} = Animated;
const headerHeight = 250 * 2;

const Home2 = () => {
    const [categories, setCategories] = useState("")
    const [isCollapse, setIsCollapse] = useState(true)
    const [isActiveCategoriesId, setisActiveCategoriesId] = useState({})
    const [itemsSnapshot, setItemsSnapshot] = useState("")
    const [itemsDataForView , setItemsDataForView] = useState([])









    const infinityScrollHandle = () =>{
        const isActiveCatArr = Object.keys(isActiveCategoriesId)
        if(itemsSnapshot && !!itemsSnapshot[4]){
            if(isActiveCatArr.length > 0){
                getDataWithInfinityScroll(setItemsSnapshot , "productlist" , 5 , itemsSnapshot[4] , {queryField : "selectedCatagories" , queryArray : isActiveCatArr}).catch(v => console.log(v))
                // return;
            }else{
                getDataWithInfinityScroll(setItemsSnapshot , "productlist" , 5 , itemsSnapshot[4]).catch(v => console.log(v))
            }
        }
    }


    if (itemsSnapshot.length > 0) {
        console.log(itemsSnapshot[0].data())
    }

    useEffect(() => {
        // getDataWithInfinityScroll(setItemsSnapshot , "productlist" , 5)
        getDataWithOutRealTimeUpdates(setCategories, "catagories");
    }, []);

    useEffect(()=>{
        if(itemsSnapshot && itemsSnapshot.length > 0){
           const data =  itemsSnapshot.map(doc => doc.data())
           setItemsDataForView(prv => ([...prv , ...data]))
        }
        
    },[itemsSnapshot])

    useEffect(() => {
        const isActiveCatArr = Object.keys(isActiveCategoriesId)
            if(isActiveCatArr.length > 0){
                getDataWithInfinityScroll(setItemsSnapshot , "productlist" , 5 , false , {queryField : "selectedCatagories" , queryArray : isActiveCatArr}).catch(v => console.log(v))
                return;
            }
            else{ 
                getDataWithInfinityScroll(setItemsSnapshot , "productlist" , 5 ).catch(v => console.log(v))
            }
    }, [isActiveCategoriesId])

    const handleChipPress = (id) => {
        setItemsDataForView([])
        setisActiveCategoriesId((prv) => {
            if(prv[`${id}`]){
                delete prv[`${id}`]
            }else{
                prv[`${id}`] = true
            }
            return ({ ...prv })
        })
    }

    const handleCollapseButton = () => {
        setIsCollapse(!isCollapse)
    }

    const getCategoryArray = (inputArray, isCollapse) => {
        let outputArray = [];
        if (inputArray.length >= 5 && isCollapse) {
            outputArray = categories.slice(0, 5).map((doc) => {
                const item = doc.data()
                item.id = doc.id
                return (
                    <TouchableOpacity onPress={() => { handleChipPress(item.id) }} style={isActiveCategoriesId[`${item.id}`] ?
                        styles.activeChip
                        : styles.chip} key={item.id}>
                        <Text style={styles.chipText}>{item.name}</Text>
                    </TouchableOpacity>
                )
            })
            outputArray.push(
                <TouchableOpacity onPress={() => { setIsCollapse((prev) => !prev) }} style={styles.chip} key="more">
                    <Text style={styles.chipText}>...{inputArray.length - 5} more</Text>
                </TouchableOpacity>
            )
        }
        else {
            outputArray = outputArray = inputArray.map((doc) => {
                const item = doc.data()
                item.id = doc.id
                return (
                    <TouchableOpacity onPress={() => { handleChipPress(item.id) }} style={isActiveCategoriesId[`${item.id}`] ?
                        styles.activeChip
                        : styles.chip} key={item.id}>
                        <Text style={styles.chipText}>{item.name}</Text>
                    </TouchableOpacity>
                )
            })
        }
        return outputArray
    }

















    // Animate scroll code start  
  const ref = useRef(null);

  const scrollY = useRef(new Animated.Value(0));
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -(headerHeight / 2)],
  });

  const translateYNumber = useRef();

  translateY.addListener(({value}) => {
    translateYNumber.current = value;
  });

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {y: scrollY.current},
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const handleSnap = ({nativeEvent}) => {
    const offsetY = nativeEvent.contentOffset.y;
    if (
      !(
        translateYNumber.current === 0 ||
        translateYNumber.current === -headerHeight / 2
      )
    ) {
      if (ref.current) {
        ref.current.scrollToOffset({
          offset:
            getCloser(translateYNumber.current, -headerHeight / 2, 0) ===
            -headerHeight / 2
              ? offsetY + headerHeight / 2
              : offsetY - headerHeight / 2,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
        <Header {...{headerHeight ,  categories , getCategoryArray , handleCollapseButton , isCollapse }} />
      </Animated.View>
      <Animated.FlatList
        onEndReached={infinityScrollHandle}
        scrollEventThrottle={16}
        contentContainerStyle={{paddingTop: headerHeight}}
        onScroll={handleScroll}
        ref={ref}
        onMomentumScrollEnd={handleSnap}
        data={itemsDataForView}
        renderItem={({item}) => (<ProductCard cardsType="button" item={item}/>)}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1,
  },
  subHeader: {
    height: headerHeight / 2,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  subHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},
heading: {
    flexDirection: 'row',
    justifyContent: 'space-between'
},
title: {
    color: "white",
    fontSize: 32,
    width: '70%'
},
notification: {
    height: 54,
    width: 54,
    margin: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, .12)'
},
banner: {
    width: '100%',
    marginVertical: 30
},
section: {
    marginBottom: 10,
},
sectionTitle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'left',
},
categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},
collapseButton: {
    paddingHorizontal: 20
},
chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10,
},
chip: {
    backgroundColor: 'rgba(255,255,255,.1)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    margin: 5,
    borderRadius: 20
},
activeChip: {
    backgroundColor: 'rgba(0,255,0,.125)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    margin: 5,
    borderRadius: 20
},
chipText: {
    color: "#fff"
},
cardContainer: {
    // paddingBottom: '20%'
},
card: {
    width: '100%',
    height: 120,
    backgroundColor: '#252525',
    borderRadius: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
},
cardProduct: {
    flexDirection: 'row'
},
cardImage: {
    width: "30%",
    height: 80,
},
cardTextBox: {
    marginLeft: 20,
    justifyContent: 'space-between'
},
cardTextTitle: {
    fontSize: 20,
    color: '#fff'
},
cardTextCategory: {
    fontSize: 16,
    color: '#808080'
},
cardTextPrice: {
    fontSize: 18,
    color: 'rgba(21,190,119,1)'
},

});

export default Home2;