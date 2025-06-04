import React, { useEffect } from 'react'
import {useState, useContext} from 'react'
import  Navbar  from '../Navbar/Navbar';
import Login from '../Modal/Login';
import Sell from '../Modal/Sell';
import { ItemsContext } from '../Context/Item';
import { fetchFromFirestore } from '../Firebase/Firebase';
import Card from '../Card/Card';



const Home = () => {

   const[openModal, setModal] = useState(false)
   const[openModalSell, setModalSell] = useState(false)

   const toggleModal = () => {setModal(!openModal)}
   const toggleModalSell = () => {setModalSell(!openModalSell)}

   const itemsCtx = ItemsContext(); //refers to the context values

   useEffect(() => {
       const getItems = async () => {
        const datas = await fetchFromFirestore();
        itemsCtx ?. setItems(datas); //itemsCtx ?. setItems is the setItems function provided by the context.
                                       //data is fetched from firestore
       }

       getItems();
   }, [])

   useEffect(() => {
    console.log('updated items', itemsCtx.items)
   }, [itemsCtx.items])

  return (
    <div>
       <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell}/>
       <Login toggleModal= {toggleModal} status = {openModal} />
        <Sell setItems={(itemsCtx).setItems} toggleModalSell={toggleModalSell} status={openModalSell}  />
       <Card items = {(itemsCtx).items || []} />
    </div>
  )
}

export default Home
