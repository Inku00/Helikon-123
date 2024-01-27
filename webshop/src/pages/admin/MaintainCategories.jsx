import React, { useEffect, useRef, useState } from 'react'

function MaintainCategories() { // [{"name": "lego"}, {"name": "star wars"}, {"name": "figure"}]
  const url = "https://mihkel-react-webshop-10-23-default-rtdb.europe-west1.firebasedatabase.app/categories.json";
  const [categories, setCategories] = useState([]);
  const categoryRef = useRef();

  useEffect(() => {
    fetch(url)
      .then(res => res.json()) // null -->
      .then(json => setCategories(json || []))
  }, []);

  const add = () => {
    categories.push({"name": categoryRef.current.value});
    fetch(url, {"method": "PUT", "body": JSON.stringify(categories)});
    setCategories(categories.slice());
    categoryRef.current.value = "";
  }

  const remove = (index) => {
    categories.splice(index,1);
    fetch(url, {"method": "PUT", "body": JSON.stringify(categories)});
    setCategories(categories.slice());
  }

  return (
    <div>
      <label>Kategooria</label> <br />
      <input ref={categoryRef} type="text" /> <br />
      <button onClick={add}>Sisesta</button> <br />
      {categories.map((category, index) => 
        <div key={category.name}>
          {category.name}
          <button onClick={() => remove(index)}>x</button>
        </div>)}
    </div>
  )
}

export default MaintainCategories