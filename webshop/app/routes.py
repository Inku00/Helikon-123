from flask import Blueprint, request, jsonify
from utilities.pdf_generator import generate_pdf
from utilities.email_sender import send_email

main = Blueprint('main', __name__)

@main.route('/send-invoice', methods=['POST'])
def send_invoice():
    data = request.json
    pdf_path = generate_pdf(data)
    send_email(data['email'], pdf_path)
    return jsonify({"message": "Invoice sent successfully"})