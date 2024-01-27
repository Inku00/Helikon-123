import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';

// Impordi oma tooteandmed otse arvutis asuvast failist
import productsData from '../../data/products.json';

function AddProduct() {
  // Ref-id muutujad
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const activeRef = useRef();

  // Olekumuutujad
  const [idUnique, setIdUnique] = useState(true);
  const { t } = useTranslation();

  // Funktsioon toote lisamiseks
  const addProduct = () => {
    // Kontrolli, kas nõutavad väljad on täidetud
    if (!nameRef.current.value || !priceRef.current.value || !categoryRef.current.value) {
      toast.error("Palun täitke nimi, hind ja kategooria väljad!");
      return;
    }

    // Leia järgmine saadaolev ID
    const newId = getNextAvailableId();

    // Lisa uus toode andmete hulka
    const newProduct = {
      "id": newId,
      "image": imageRef.current.value,
      "name": nameRef.current.value,
      "price": Number(priceRef.current.value),
      "description": descriptionRef.current.value,
      "category": categoryRef.current.value,
      "active": activeRef.current.checked
    };

    productsData.push(newProduct);

    // Teavitused ja tühjendamine jäävad samaks

    toast("Toode lisatud!");

    // Tühjenda väljade sisu
    idRef.current.value = "";
    imageRef.current.value = "";
    nameRef.current.value = "";
    priceRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
    activeRef.current.checked = false;
  }

  // Leia järgmine saadaolev ID
  const getNextAvailableId = () => {
    const existingIds = productsData.map(product => product.id);
    if (existingIds.length === 0) {
      return 1; // Kui pole olemas ühtegi toodet, alusta ID-ga 1
    }
    const maxId = Math.max(...existingIds);
    return maxId + 1;
  };

  // Kategooriate valikute loomine - kasutades Set, et eemaldada duplikaadid
  const uniqueCategories = [...new Set(productsData.map(product => product.category))];

  return (
    <div>
      <label>ID</label> <br />
      <input ref={idRef} value={getNextAvailableId()} readOnly></input> <br />
      <label>{t("name")}</label> <br />
      <input ref={nameRef} type="text"></input> <br />
      <label>{t("price")}</label> <br />
      <input ref={priceRef} type="number"></input> <br />
      <label>{t("image")}</label> <br />
      <input ref={imageRef} type="text"></input> <br />
      <label>{t("category")}</label> <br />
      <select ref={categoryRef}>
        { uniqueCategories.map(category => <option key={category}>{category}</option> )}
      </select><br />
      <label>{t("description")}</label> <br />
      <input ref={descriptionRef} type="text"></input> <br />
      <label>{t("active")}</label> <br />
      <input ref={activeRef} type="checkbox"></input> <br />
      <button onClick={() => addProduct()}>{t("add")}</button>

      <ToastContainer />
    </div>
  )
}

export default AddProduct;
