import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export const ContactUs = () => {
  const form = useRef();
  const [emailSent, setEmailSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault(); // kui "form" tag seest teha onSubmit, siis teeb ilma selle reata
    // rakendus refreshi

    emailjs.sendForm('service_87dwmbl', 'template_fw53c2e', form.current, '4V9DG0lO_DZ5Q5EfJ')
    .then((result) => {
      console.log(result.text);
      setEmailSent(true);
    })
    .catch((error) => {
      console.log(error.text);
      });
  };


  return (
    <div>
      {emailSent ? ( 
        <div>
          <p>Woohoo! Sinu sõnum on edukalt saadetud!</p>
          <p>Aitäh, et võtsid meiega ühendust. Me vaatame sinu sõnumit läbi ja võtame varsti sinuga ühendust. Seniks naudi oma päeva ja hoia silma peal oma e-maili postkastil!</p>
        </div>
      ) : (
        <form ref={form} onSubmit={sendEmail}>
          <br />
          <TextField name="from_name" label="Name" variant="outlined" /> <br /> <br />
          <label>Email</label> <br />
          <input type="email" name="from_email" /> <br />
          <label>Message</label> <br />
          <textarea name="message" /> <br />
          <Button type="submit" variant="outlined">Outlined</Button>
          <br />
        </form>
      )}
    </div>
  );
};