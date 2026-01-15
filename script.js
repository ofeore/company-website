// REVERSE IMAGES TASK

document.querySelector("#image-section").addEventListener("click", function () {
  this.classList.toggle("row-reverse");
});

// CONTACT TASK

document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector("#contact button"); // Target the button specifically inside #contact section
  const input = document.querySelector("#contact input"); // Target the input specifically inside #contact section
  const para = document.querySelector("#contact p"); // Target the p specifically inside #contact section

  button.addEventListener("click", function () {
    // Get the input value
    const name = input.value;

    // Check if the input is empty or just whitespace
    if (name.trim() === "") {
      // Highlight the input field with a red border for error
      input.style.border = "1px solid red";
    } else {
      const message = `Nice to meet you, ${name} 👋! We will be in contact.`;

      // Create a new <p> element to display the message
      const messageElement = document.createElement("p");
      messageElement.textContent = message;
      messageElement.style.fontSize = "18px";
      messageElement.style.textAlign = "left";
      messageElement.style.marginTop = "10px";
      messageElement.style.color = "black"; // Adjust color to match your design

      // Append the message element below the form
      document.querySelector("#contact").appendChild(messageElement);

      // Hide the input, button, and p.
      input.style.display = "none";
      button.style.display = "none";
      para.style.display = "none";

      // Reset the input border color if valid
      input.style.border = "";
    }
  });
});

// ADD API TASK

const quoteheader = document.getElementById("quote");

async function chuckAPI() {
  fetch("https://api.chucknorris.io/jokes/random")
    .then((res) => res.json())
    .then((data) => {
      const quote = data.value; // API returns an array
      console.log(quote);
      quoteheader.textContent = quote;
    })
    .catch((err) => {
      console.error(err);
      quoteheader.textContent = "CloudFlare bugging";
    });
}

// Update every 10 seconds instead of 1 sec to avoid rate limits
setInterval(chuckAPI, 3000);

chuckAPI(); // run once on load

/* Attempt at modal */

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const modalSub = document.getElementById("modal-span");
const closeBtn = document.querySelector(".close-btn");

// Select all "Read the article" buttons
document.querySelectorAll(".card button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const title = card.querySelector("h2").innerText;
    const subtitle = card.querySelector("span").innerText;
    const text = card.querySelector("p").innerText;

    modalTitle.innerText = title;
    modalText.innerText = text;
    modalSub.innerText = subtitle;
    modal.style.display = "flex";

    // Disable scroll when on modal
    document.body.classList.add("no-scroll");
  });
});

// Close when clicking X
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.classList.remove("no-scroll");
});

// Close when clicking outside modal box
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.classList.remove("no-scroll");
  }
});

// Close with ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.style.display = "none";
  }
});
