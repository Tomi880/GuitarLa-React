import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db"

export const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem("cart")
        return localStorageCart ? JSON.parse(localStorageCart) : []
      }
    
      const [data] = useState(db)
      const [cart, setCart] = useState(initialCart)
    
      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
      }, [cart])
    
      function addToCart(item){
    
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id)
    
        if(itemExists >= 0){
          console.log("Ya existe en el carrito")
          const updatedCart = [...cart]
          updatedCart[itemExists].quantity++
          setCart(updatedCart)
        } else {
          item.quantity = 1
          console.log("Agregado al carrito")
          setCart([...cart, item])
        }
    
      }
    
      function removeFromCart(id){
        console.log("Eliminado del carrito")
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    
      }
    
      function incrementQuantity(id){
        console.log("Incrementando la cantidad de guitarras")
        const updatedCart = [...cart]
        const guitar = updatedCart.find(guitar => guitar.id === id)
        guitar.quantity++
        setCart(updatedCart)
      }
    
      // otra forma de hacerlo
    
      // function function incrementQuantity(id){
      //   const updatedCart = cart.map( item => {
      //     if(item.id === id){
      //       return {
      //         ...item,
      //         quantity: item.quantity + 1
      //       }
      //     }
      //     return item
      //   })
      //   setCart(updatedCart)
      // }
    
      function decrementQuantity(id){
        console.log("Quitando una guitarra")
        const updatedCart = [...cart]
        const guitar = updatedCart.find(guitar => guitar.id === id)
        guitar.quantity--
        if(guitar.quantity === 0){
          updatedCart.splice(updatedCart.indexOf(guitar), 1)
        }
        setCart(updatedCart)
      }
    
      // otra forma de hacerlo
    
      // function decrementQuantity(id){
      //   const updatedCart = cart.map( item => {
      //     if(item.id === id && item.quantity > 1){
      //       return {
      //         ...item,
      //         quantity: item.quantity - 1
      //       }
      //     }
      //     return item
      //   })
      //   setCart(updatedCart)
      // }
    
      function cleanCart(){
        console.log("Carrito vacio")
        setCart([])
      }

    //State Derivados

    const isEmpty = useMemo( () => cart.length === 0 , [cart])
    const cartTotal = useMemo( () => cart.reduce ((total, item) => total + (item.price * item.quantity), 0) , [cart])

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        cleanCart,
        isEmpty,
        cartTotal
    }

}
