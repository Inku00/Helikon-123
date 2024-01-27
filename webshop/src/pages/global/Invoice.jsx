import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Invoice = ({ cart }) => {
  const invoiceRef = useRef();

  const calculateCartSum = () => {
    let amount = 0;
    cart.forEach(product => amount += product.toode.price * product.kogus);
    return amount.toFixed(2);
  };

  const generatePDF = () => {
    const invoiceElement = invoiceRef.current;

    html2canvas(invoiceElement)
      .then((canvas) => {
        console.log("html2canvas edukas");
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
        
      })
      .catch((error) => {
        console.error("html2canvas viga:", error);
      });

  };

  return (
    <div>
      <button onClick={generatePDF}>Genereeri PDF</button>
      <div>Total Sum: {calculateCartSum()}€</div>
      <div>Total {cart.length} Product(s)</div>
      <div ref={invoiceRef}>
        {/* Arve sisu renderdamine */}
        {/* Siia lisage oma arve sisu, mis kuvatakse PDF-failis */}
        <h1>Arve Sisu</h1>
        <p>Toode 1: 10€</p>
        <p>Toode 2: 15€</p>
        {/* Lisage siia kogu arve sisu */}
      </div>
    </div>
  );
};

export default Invoice;
