import React from 'react'

function Payment(props) {



  //https://support.every-pay.com/merchant-support/testing-open-banking-payments-in-demo-environment/
  const pay = () => {
    const url = "https://igw-demo.every-pay.com/api/v4/payments/oneoff";
    const paymentBody = {
      "api_username": "e36eb40f5ec87fa2",
      "account_name": "EUR3D1",
      "amount": props.sum,
      "order_reference": Math.random() * 9999999,
      "nonce": "a9b7f7e" + Math.random() * 9999999 + new Date(),
      "timestamp": new Date(),
      "customer_url": "https://err.ee"
      }
    const paymentHeaders = {
      "Authorization": "Basic ZTM2ZWI0MGY1ZWM4N2ZhMjo3YjkxYTNiOWUxYjc0NTI0YzJlOWZjMjgyZjhhYzhjZA==",
      "Content-Type": "application/json"
    }

    fetch(url, {"method": "POST", "body": JSON.stringify(paymentBody), "headers": paymentHeaders})
      .then(res => res.json())
      .then(json => window.location.href = json.payment_link)
  }

  // HTMLs: <Link to="/cart">
  // JavaScriptis: useNavigate("/admin")
  // window.location.href ---> kui suunatakse välisele URL-le

  return (
    <button onClick={pay}>Maksa</button>
  )
}

export default Payment