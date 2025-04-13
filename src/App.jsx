import { useState, useEffect } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"

function App() {

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

  return (
    <>
    <Header
      cart={cart}
      removeFromCart={removeFromCart}
      incrementQuantity={incrementQuantity}
      decrementQuantity={decrementQuantity}
      cleanCart={cleanCart}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar) => (
              <Guitar  
              key = {guitar.id}
              guitar = {guitar}
              cart = {cart}
              setCart = {setCart}
              addToCart = {addToCart}
              />
            ))}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
