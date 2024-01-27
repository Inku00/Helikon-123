import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import productsFromFile from "../../data/products.json"
import { ToastContainer, toast } from 'react-toastify';

function EditProduct() {                        // 27333323 === URL-s "27333323"
  const [dbProducts, setDbProducts] = useState([]); // ALATI ORIGINAALSED TOOTED 481tk
  const { product_id } = useParams();           // 22676756 === URL-s "22676756"  
  const found = dbProducts.find(product => product.id === Number(product_id));
  // const found2 = productsFromFile.filter(product => product.id === Number(product_id))[0];
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const activeRef = useRef();
  const navigate = useNavigate();
  const [idUnique, setIdUnique] = useState(true);
  const url = "https://mihkel-react-webshop-10-23-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  // uef + import
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setDbProducts(json);
      })
  }, []);

  const edit = () => {

    if (idRef.current.value === "") {
      toast.error("Id pole täidetud!");
      return;
    }

    if (nameRef.current.value === "") {
      toast.error("Nimi pole täidetud!");
      return;
    }

    // if (nameRef.current.value[0] === nameRef.current.value[0].toLowerCase()) {
    //   toast.error("Väikse algustähega või numbri või tähemärgiga ei saa alustada!");
    //   return;
    // }

    if (nameRef.current.value[0] !== nameRef.current.value[0].toUpperCase()) {
      toast.error("Väikse algustähega ei saa alustada!");
      return;
    }

    if (priceRef.current.value === "") {
      toast.error("Hind pole täidetud!");
      return;
    }

    if (Number(priceRef.current.value) < 0) {
      toast.error("Hind peab olema positiivne!");
      return;
    }

    // index - järjekorranumber, mitmes ta on alates 0st
    const index = dbProducts.findIndex(product => product.id === Number(product_id));
    dbProducts[index] = {
      "id": Number(idRef.current.value),
      "image": imageRef.current.value,
      "name": nameRef.current.value,
      "price": Number(priceRef.current.value),
      "description": descriptionRef.current.value,
      "category": categoryRef.current.value,
      "active": activeRef.current.checked
    }
    fetch(url, {"method": "PUT", "body": JSON.stringify(dbProducts)})
      .then(() => navigate("/admin/products"));
  }

  const checkIdUniqueness = () => {
    // SIIN SEES KONTROLLIME, kas kellelgi on selline ID olemas nagu idRef.current.value sees
    const result = dbProducts.find(product => product.id === Number(idRef.current.value));
    if (result === undefined) {
      setIdUnique(true);
    } else {
      setIdUnique(false);
    }
  }

  if (found === undefined) {
    return <div>Ei leitud</div>
  }

  return (
    <div>
      { idUnique === false && <div>Sisestatud ID ei ole unikaalne!</div>}
      <label>ID</label> <br />
      <input ref={idRef} onChange={checkIdUniqueness} type="number" defaultValue={found.id} /> <br />
      <label>Name</label> <br />
      <input ref={nameRef} type="text"  defaultValue={found.name} /> <br />
      <label>Price</label> <br />
      <input ref={priceRef} type="number" defaultValue={found.price} /> <br />
      <label>Image</label> <br />
      <input ref={imageRef} type="text" defaultValue={found.image} /> <br />
      <label>Category</label> <br />
      <input ref={categoryRef} type="text" defaultValue={found.category} /> <br />
      <label>Description</label> <br />
      <input ref={descriptionRef} type="text" defaultValue={found.description} /> <br />
      <label>Active</label> <br />
      <input ref={activeRef} type="checkbox" defaultChecked={found.active} /> <br />
      {/* <Link to="/admin/products"> */}
      <button disabled={ idUnique === false } onClick={edit}>Muuda</button>
      {/* </Link> */}

      <ToastContainer 
        theme="dark"
        position="bottom-right"
      />
    </div>
  )
}

export default EditProduct


// {
//   "id": 27333323,
//   "image": "https://i.ebayimg.com/thumbs/images/g/vmMAAOSwnXVibfoX/s-l225.webp",
//   "name": "Roblox Random Virtual",
//   "price": 2.49,
//   "description": "Roblox Random Virtual Toy Codes New Celebrity Series Sent By Messages Unused",
//   "category": "figure",
//   "active": true
// },
// {
//   "id": 22676756,
//   "image": "https://i.ebayimg.com/thumbs/images/g/F3sAAOSwtnNixxSh/s-l225.webp",
//   "name": "Stranger Things 4",
//   "price": 40.73,
//   "description": "Stranger Things 4 - Eddie with Guitar Funko Pop! PRE-ORDER #1250 + .5 Protector",
//   "category": "figure",
//   "active": true
// }