import { collection, getDocs } from "firebase/firestore"
import { createContext, useContext, useEffect, useState } from "react"
import { fireStore } from "../Firebase/firebase"

const Context = createContext(null)
export const ItemsContext = () => useContext(Context) 

export const ItemsContextProvider = ({ children }) => {
  const [items, setItems] = useState(null)

  useEffect(() => {
    const fetchItemsFromFireStore = async () => {
      try {
        const productsCollection = collection(fireStore, "products") //firestore collections are case sensitive
        const productSnapshot = await getDocs(productsCollection)
        const productsList = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setItems(productsList)
      } catch (error) {
        console.log(error, "error fetching products")
      }
    }

    fetchItemsFromFireStore()
  }, [])

  return (
    <>
      <Context.Provider value={{ items, setItems }}>
        {children}
      </Context.Provider>
    </>
  )
}
