import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'

function Supplier() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, []);

  const sortAZ = () => {
    products.sort((a,b) => a.title.localeCompare(b.title));
    setProducts(products.slice());
  }

  const filterRatingMoreThan4 = () => {
    const result = products.filter(product => product.rating.rate > 4);
    setProducts(result);
  }

  return (
    <div>
      <Button onClick={sortAZ}>Sort A-Z</Button>
      <Button onClick={filterRatingMoreThan4}>Show with rating higher than 4.0</Button>

      <table>

        <thead>
          <tr>
            <th>Image</th>
            <th>Id</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Rating rate</th>
            <th>Rating count</th>
          </tr>
        </thead>
        
        <tbody>
          {products.map(product => 
          <tr key={product.id}>
              <td><img className="image" src={product.image} alt="" /></td>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.rating.rate}</td>
              <td>{product.rating.count}</td>
          </tr>)}
        </tbody>

      </table>
    </div>
  )
}

export default Supplier