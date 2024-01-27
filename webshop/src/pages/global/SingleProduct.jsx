import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
// import productsFromFile from '../../data/products.json'
 
function SingleProduct() {
  const { product_id } = useParams();
  const [dbProducts, setDbProducts] = useState([]); // ALATI ORIGINAALSED TOOTED 481tk
  const found = dbProducts.find(product => product.id === Number(product_id));
  const url = "https://mihkel-react-webshop-10-23-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  // uef + import
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setDbProducts(json);
      })
  }, []);

  if (dbProducts.length === 0) {
    return <Spinner />
  }
 
  if (found === undefined) {
    return <div>Ei leitud</div>
  }
 
  return (
    <div>
      <div>Product id: {found.id}</div> <br />
      <div>Product name: {found.name}</div> <br />
      <div>Price: {found.price}</div> <br />
      <div>Description: {found.description}</div> <br />
      <div>Category: {found.category}</div> <br />
      <img src={found.image} alt=""/> <br />
    </div>
    )
  }
 
export default SingleProduct