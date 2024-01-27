import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
// import productsFromFile from "../../data/products.json";
import { Link } from "react-router-dom";

function MaintainProducts() {
  const searchedRef = useRef();
  const [products, setProducts] = useState([]); // Kõikuvas seisundis (HTMLs)
  const [dbProducts, setDbProducts] = useState([]); // ALATI ORIGINAALSED TOOTED 481tk
  const url = "https://mihkel-react-webshop-10-23-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  // uef + import
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        setDbProducts(json);
      })
  }, []);

  const deleteProduct = (index) => {
    dbProducts.splice(index, 1);
    fetch(url, {"method": "PUT", "body": JSON.stringify(products)})
    setProducts(dbProducts.slice());
  }

  const searchFromProducts = () => {
    const result = dbProducts.filter((product) =>
      product.name
        .toLowerCase()
        .includes(searchedRef.current.value.toLowerCase())
    );
    setProducts(result);
  };

  if (dbProducts.length === 0) {
    return <Spinner />
  }

  return (
    <div>
      <div>{products.length} tk</div>
      <input ref={searchedRef} onChange={searchFromProducts} type="text" />
      
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              className={product.active ? "active" : "inactive"}
            >
              <td><img src={product.image} alt="" /></td>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.active + 0}</td>
              <td>
                <button onClick={() => deleteProduct(index)}>Kustuta</button>
                <Link to={"/admin/edit/" + product.id}>
                  <button>Muuda</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default MaintainProducts;
