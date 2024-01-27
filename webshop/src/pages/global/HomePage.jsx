import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import styles from '../../css/HomePage.module.css';
import { Spinner } from 'react-bootstrap';
import SortButtons from '../../components/home/SortButtons';
import { useCartSum } from '../../store/CartSumContext';
import productsData from '../../data/products.json'; // Impordi otse fail

function HomePage() {
  // Seisud
  const [products, setProducts] = useState(productsData); // Toote andmed
  const { setCartSum } = useCartSum(); // Ostukorvi summa
  const [selectedCategory, setSelectedCategory] = useState(''); // Valitud kategooria

  // Funktsioon toote lisamiseks ostukorvi
  const addToCart = (product) => {
    const cartFromLS = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cartFromLS.findIndex(
      (cartProduct) => cartProduct.toode.id === product.id
    );

    if (existingProductIndex !== -1) {
      cartFromLS[existingProductIndex].kogus += 1;
    } else {
      cartFromLS.push({ kogus: 1, toode: product });
    }

    localStorage.setItem('cart', JSON.stringify(cartFromLS));

    // Arvuta ostukorvi summa
    const cartSum = cartFromLS.reduce(
      (total, cartProduct) =>
        total + cartProduct.toode.price * cartProduct.kogus,
      0
    );
    setCartSum(cartSum.toFixed(2)); // Salvesta ostukorvi summa seisusse
  };

  // Filtrite loomine kategooriate jaoks
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  // Kategooriate filtreerimine
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === '') {
      // Kui kategooria pole valitud, kuvame kõik tooted
      setProducts(productsData);
    } else {
      // Filtrime tooted vastavalt valitud kategooriale
      const filteredProducts = productsData.filter(
        (product) => product.category === category
      );
      setProducts(filteredProducts);
    }
  };

  // Laadimise indikaator
  if (products.length === 0) {
    return <Spinner />; // Kui andmed pole veel laaditud, näita laadimise indikaatorit
  }

  // Tagastab komponendi JSX-i
  return (
    <div>
      <SortButtons products={products} setProducts={setProducts} />

      <div className={styles.categories}>
        <button onClick={() => filterByCategory('')}>Kõik</button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => filterByCategory(category)}
            className={category === selectedCategory ? styles.selected : ''}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.products}>
        {products.length === 0 ? (
          <Spinner />
        ) : (
          products.map((product, index) => (
            <div key={index} className={styles.product}>
              <img className={styles.image} src={product.image} alt="" />
              <div className={styles.name}>{product.name}</div>
              <div>{product.price}</div>
              <Button variant="contained" onClick={() => addToCart(product)}>
                Lisa ostukorvi
              </Button>
              <Link to={`/product/${product.id}`}>
                <button>Vaata toodet</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
