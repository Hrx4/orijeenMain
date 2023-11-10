const contactName = document.querySelector('#contactName').value
const email = document.getElementById('email').value
const phone = document.getElementById('phone').value
const message = document.getElementById('message').value
const forme1 = document.querySelector('.form')

// let nameData , emailData , phoneData , messageData
// console.log(contactName);

forme1.addEventListener('submit' , async (event) =>{
    event.preventDefault();
    const formData = new FormData(forme1)
    const data = Object.fromEntries(formData);
    


    try {
        const res = await fetch(`http://localhost:8080/contact/`, {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contactName : data.contactName , 
            contactEmail : data.contactEmail , 
            contactPhone: data.contactPhone,
            contactMessage : data.contactMessage,
          }),
        });
        // let resJson = await res.json();
        if (res.status === 200) {
          console.log("fine");
          
        } else {
          console.log("Some error occured");
          
        }
      } catch (err) {
        console.log(err);
      }

      console.log('====================================');
    console.log(data);
    console.log('====================================');
    new FormData(forme1)
    console.log('====================================');
    console.log(contactName);
    console.log('====================================');
    contactName=''
    alert( 'Form submitted' );

})


// const handleSubmit = async(e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`http://localhost:8080/contact/`, {
//         method: "POST",
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           contactName : formData.name , 
//           contactEmail : formData.email , 
//           contactPhone: formData.phone,
//           contactMessage : formData.message,
//         }),
//       });
//       // let resJson = await res.json();
//       if (res.status === 200) {
//         console.log("fine");
        
//       } else {
//         console.log("Some error occured");
        
//       }
//     } catch (err) {
//       console.log(err);
//     }
    


//     console.log("Submitted Data:", formData);

//   };