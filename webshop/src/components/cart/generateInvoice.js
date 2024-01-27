const PDFDocument = require('pdfkit');
const fs = require('fs');

function generateInvoice(order, filename) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filename));

  // Lisa pealkiri
  doc.fontSize(20).text('Arve', { underline: true });

  // Lisa ettevõtte info
  doc.moveDown().fontSize(12).text('Ettevõtte Nimi');
  doc.text('Ettevõtte Aadress');
  doc.text('Ettevõtte Telefon');

  // Lisa kliendi info
  doc.moveDown().fontSize(12).text(`Kliendi nimi: ${order.customerName}`);
  doc.text(`Kliendi aadress: ${order.customerAddress}`);

  // Lisa toodete tabel
  doc.moveDown().fontSize(12);
  const itemsTableTop = doc.y;
  doc.text('Toode', 50, itemsTableTop);
  doc.text('Hind', 200, itemsTableTop);
  doc.text('Kogus', 280, itemsTableTop);
  doc.text('Kokku', 350, itemsTableTop);

  let itemsTableY = itemsTableTop + 20;
  order.items.forEach(item => {
    doc.fontSize(10).text(item.name, 50, itemsTableY);
    doc.text(`€${item.price}`, 200, itemsTableY);
    doc.text(item.quantity, 280, itemsTableY);
    doc.text(`€${item.price * item.quantity}`, 350, itemsTableY);
    itemsTableY += 20;
  });

  // Lisa kogusumma
  doc.moveDown().fontSize(12).text(`Kogusumma: €${order.totalPrice}`, { align: 'right' });

  // Lõpeta PDF
  doc.end();
}

module.exports = generateInvoice;
