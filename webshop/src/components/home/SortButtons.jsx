import React from 'react'

function SortButtons(props) {

  const sortAZ = () => {
    props.products.sort((a,b) => a.name.localeCompare(b.name));
    props.setProducts(props.products.slice());
  }
 
  const sortZA = () => {
    props.products.sort((a,b) => b.name.localeCompare(a.name));
    props.setProducts(props.products.slice());
  }
 
  const sortPricesAsc = () => {
    props.products.sort((a,b) => a.price - b.price);
    props.setProducts(props.products.slice());
  }
 
  const sortPricesDesc = () => {
    props.products.sort((a,b) => b.price - a.price);
    props.setProducts(props.products.slice());
  }

  return (
    <div>
      <button onClick={sortAZ} >SortA-Z</button>
      <button onClick={sortZA} >SortZ-A</button>
      <button onClick={sortPricesAsc} >Sort price Asc</button>
      <button onClick={sortPricesDesc} >Sort price Desc</button>
    </div>
  )
}

export default SortButtons