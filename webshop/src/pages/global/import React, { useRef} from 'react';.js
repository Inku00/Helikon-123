import React, { useRef} from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import styles from "../../css/Cart.module.css";


function Cart() {
  const invoiceRef = useRef();

  const calculateCartSum = () => {
    let amount = 0;
    cart.forEach(product => amount += product.toode.price * product.kogus);
    return amount.toFixed(2);
  };



  const generatePDF = () => {
    const invoiceElement = invoiceRef.current;


    const input = invoiceRef.current;
    invoiceElement.classList.remove('hidden-on-screen');
    html2canvas(input) // Suurendab skaalat, et suurendada teksti suurust
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = 210; // A4 laius mm
        const pdfHeight = 297; // A4 kõrgus mm
        const imgWidth = canvas.width * 0.1; // Teisenda pikslid mm-ks
        const imgHeight = canvas.height * 0.1; // Teisenda pikslid mm-ks
        const x = (pdfWidth - imgWidth) / 2; // Keskel
        const y = 30; // Alusta 30mm lehe ülaosast
  
  
      // Logo lisamine
      const logoUrl = 'https://cdn.midjourney.com/e3f803da-788d-4bdb-9492-6d6f6e6a8c00/0_0_2048_N.webp?method=width&qst=6'; // Asenda see oma logo URL-iga
      const logoSize = { width: 15, height: 15 }; // Logo suurus väiksem
      pdf.addImage(logoUrl, 'PNG', pdfWidth - logoSize.width - 10, 10, logoSize.width, logoSize.height);
  
      // Arve sisu lisamine
      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      
      pdf.save("invoice.pdf");
      invoiceElement.classList.add('hidden-on-screen');
    } );
  };
    // Arve stiili määratlemine
const invoiceStyle = {
  background: '#fff',
  padding: '15mm',
  margin: '15mm',
  fontSize: '30pt', // Suurenda teksti suurust
};

  return (
    <div>
      {cart.length > 0 && (
        <div>
          <div ref={invoiceRef} style={invoiceStyle}>
          <div ref={invoiceRef} style={{ background: '#fff', padding: '15mm', margin: '15mm' }}>
            <h1 style={{ textAlign: 'left', color: '#333', marginBottom: '5mm' }}>Arve</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5mm' }}>
              <div>
                <h2>Ettevõtte Helikon OÜ</h2>
                <p>Aadress: Tartu mnt 123</p>
                <p>Telefon: +372 56 123 123</p>
                <p>Email: info@helikon.ee</p>
              </div>
              <div>
                <h2>Ostja Andmed</h2>
                <p>Ostja Nimi</p>
                <p>Aadress: Ostja Aadress</p>
                </div>
              </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Toote Nimi</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Hind</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Kogus</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Kokku</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.toode.name}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{product.toode.price.toFixed(2)} €</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{product.kogus}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>€{(product.toode.price * product.kogus).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 style={{ textAlign: 'right', marginTop: '5mm' }}>Kogusumma: €{calculateCartSum()}</h3>
          </div>
          <button onClick={generatePDF}>Genereeri PDF</button>
          <div>Total Sum: {calculateCartSum()}€</div>
          <div>Total {cart.length} Product(s)</div>
          <button onClick={emptyCart}>Empty Cart</button>
          {cart.map((product, index) => (
            <div className={styles.product} key={product.toode.id}>
              <img className={styles.image} src={product.toode.image} alt={product.toode.name} />
              <div className={styles.name}> {product.toode.name} </div>
              <div className={styles.price}> {product.toode.price.toFixed(2)} €</div>
              <div className={styles.quantity}>
                <button onClick={() => decreaseQuantity(index)}>-</button>
                <div> {product.kogus} tk</div>
                <button onClick={() => increaseQuantity(index)}>+</button>
              </div>
              <div className={styles.total}> {(product.toode.price * product.kogus).toFixed(2)} €</div>
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </div>
          ))}
        </div>
      )}
      {cart.length === 0 && (
        <img className='cartpicture' src="https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-29/90/empty_cart-512.png" alt="Empty Cart" />
      )}
      <ParcelMachines />
      <Payment sum={calculateCartSum()} />
    </div>
  );
}

export default Cart;
