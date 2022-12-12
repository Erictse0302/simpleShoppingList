import Basket from "./components/Basket";
import Header from "./components/Header";
import Main from "./components/Main";
import data from "./data";
import { useDeferredValue, useEffect, useState, useTransition } from "react";

function App() {
  const {products} = data;
  const [cartItems,setCartItems] = useState([]);
  const onAdd = (product) =>{
    console.log('add')
    const exsit = cartItems.find((x) => x.id === product.id);
    if (exsit){
      const newCartItems = cartItems.map((x)=>
        x.id === product.id ? {...exsit,qty: exsit.qty + 1}: x
      );
      setCartItems(newCartItems);
      localStorage.setItem('cartItems',JSON.stringify(newCartItems));
    } else{
      const newCartItems = [...cartItems,{...product,qty:1}];
      setCartItems(newCartItems);
      localStorage.setItem('cartItems',JSON.stringify(newCartItems)); 
    }
  };
  
  const onRemove = (product) =>{
    console.log('Remove');
    const exsit = cartItems.find((x) => x.id === product.id);
    if (exsit.qty ===1){
      const newCartItems = cartItems.filter((x) => x.id!== product.id);
      setCartItems(newCartItems);
      localStorage.setItem('cartItems',JSON.stringify(newCartItems));
    }else{
      const newCartItems = cartItems.map((x)=>
      x.id === product.id ? {...exsit,qty: exsit.qty - 1}: x
    );
    setCartItems(newCartItems);
    localStorage.setItem('cartItems',JSON.stringify(newCartItems));
    }
  };

const [isPending,startTransition] = useTransition();

const cartItemsCount = useDeferredValue(cartItems.length)


  useEffect(()=>{
    startTransition(()=>{  setCartItems(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[]);})
    setCartItems(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[]);
  },[]);

  return isPending? (<div>Loading...</div>)
  :(
    <div>
      <Header countCartItems = {cartItemsCount}/>
    <div className="row" >
      <Main cartItems= {cartItems}
      onAdd = {onAdd}
      onRemove = {onRemove}
      products={products}/>
      <Basket
      cartItems= {cartItems}
      onAdd = {onAdd}
      onRemove = {onRemove}
      />
    </div>
    </div>
  );
}

export default App;
