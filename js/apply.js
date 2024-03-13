const forme1 = document.querySelector(".form");

forme1.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(forme1);
  const data = Object.fromEntries(formData);
  const formDetail = document.getElementById("MyForm1")

  try {
    const res = await fetch(`https://orijeen-admin.vercel.app/apply/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        applyName: data.applyName,
        applyEmail: data.applyEmail,
        applyPhone: data.applyPhone,
        applyClass: data.applyClass,
        applyCourse: data.applyCourse,
      }),
    });
    // let resJson = await res.json();
    if (res.status === 200) {
      console.log("fine");
      alert("Form submitted")
      formDetail.reset()

    } else {
      console.log("Some error occured");
    }
  } catch (err) {
    console.log(err);
  }

  console.log("====================================");
  console.log(data);
  console.log("====================================");
  // new FormData(forme1)
});
