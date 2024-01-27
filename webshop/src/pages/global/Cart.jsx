import React, { useState } from 'react'
import styles from "../../css/Cart.module.css";
import ParcelMachines from '../../components/cart/ParcelMachines';
import Payment from '../../components/cart/Payment';
import { useCartSum } from '../../store/CartSumContext';
import axios from 'axios';
 
function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || [] );
  const { setCartSum } = useCartSum();

  const calculateCartSum = () => {
    let amount = 0;
    cart.forEach(product => amount = amount + product.toode.price * product.kogus)
    return amount.toFixed(2);
  }

  const emptyCart = () => {
    cart.splice(0);
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartSum(0);
  }

  const decreaseQuantity = (index) => {
    cart[index].kogus = cart[index].kogus - 1;
    if (cart[index].kogus === 0) {
      cart.splice(index, 1);
    }
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartSum(calculateCartSum());
  }

  const increaseQuantity = (index) => {
    cart[index].kogus = cart[index].kogus + 1;
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartSum(calculateCartSum());
  }

  const removeFromCart = (index) => {
    cart.splice(index, 1)
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartSum(calculateCartSum());
  }
  
  const sendInvoice = async () => {
    const orderDetails = {
        items: cart,
        email: "kliendi-email@example.com", // Lisage siia klientide e-mail
        // Muud vajalikud andmed
    };

    try {
        const response = await axios.post('http://localhost:5000/send-invoice', orderDetails);
        console.log(response.data.message);
        // Käitle edukat vastust
    } catch (error) {
        console.error('Error sending invoice:', error);
        // Käitle veaolukorda
    }
};

  return (
    <div>
      {cart.length > 0 && 
      <div>
        Total Sum: {calculateCartSum()}€
        <br />
        <div> Total {cart.length} Product(s)</div>
        <button onClick={emptyCart} >Empty</button>
      </div>}
          {cart.length === 0 &&
          <img
            className='cartpicture'
            src="https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-29/90/empty_cart-512.png"
            alt="" />}
 
      {cart.map((product, index) =>
        <div className={styles.product} key={product.toode.id} >
          <img className={styles.image} src={product.toode.image} alt="" />
          <div className={styles.name}> {product.toode.name} </div>
          <div className={styles.price}> {product.toode.price.toFixed(2)} €</div>
          <div className={styles.quantity}>
            <img className={styles.button} src="/minus.png" alt="" onClick={() => decreaseQuantity(index)} />
            <div> {product.kogus} tk</div>
            <img className={styles.button} src="/plus.png" alt="" onClick={() => increaseQuantity(index)} />
          </div>
          <div className={styles.total}> {(product.toode.price * product.kogus).toFixed(2)} </div>
          <img className={styles.button} src="/remove.png" alt="" onClick={() => removeFromCart(index)} />
        </div>)}
        <button onClick={sendInvoice}>Saada Arve</button>

        <ParcelMachines />

        <Payment sum={calculateCartSum()} />
    </div>
  )
}
 
export default Cart