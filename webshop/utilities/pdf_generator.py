from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

def generate_pdf(order_details, filename="invoice.pdf"):
    c = canvas.Canvas(filename, pagesize=letter)
    c.drawString(100, 750, "Invoice for Order")
    # Siia lisage loogika, mis kuvab tellimuse üksikasjad PDF-il
    c.save()
    return filename