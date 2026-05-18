/* ================================================= */
/* NAVBAR MOBILE */
/* ================================================= */

const hamburger =
  document.querySelector(".hamburger");

const navLinks =
  document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {

  navLinks.classList.toggle("active");

});

/* ================================================= */
/* REVEAL ANIMATION */
/* ================================================= */

function revealElements() {

  const reveals =
    document.querySelectorAll(".reveal");

  reveals.forEach((element) => {

    const windowHeight =
      window.innerHeight;

    const elementTop =
      element.getBoundingClientRect().top;

    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {

      element.classList.add("active");

    }

  });

}

window.addEventListener(
  "scroll",
  revealElements
);

revealElements();

/* ================================================= */
/* HERO TYPING EFFECT */
/* ================================================= */

const typingElement =
  document.querySelector(".typing");

const typingText =
  "Warisan Suara Kalimantan Tengah";

let charIndex = 0;

let isDeleting = false;

function typeEffect() {

  if (!typingElement) return;

  if (!isDeleting) {

    typingElement.textContent =
      typingText.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === typingText.length) {

      isDeleting = true;

      setTimeout(typeEffect, 4000);

      return;

    }

  } else {

    typingElement.textContent =
      typingText.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {

      isDeleting = false;

      setTimeout(typeEffect, 3500);

      return;

    }

  }

  setTimeout(
    typeEffect,
    isDeleting ? 45 : 90
  );

}

setTimeout(() => {

  typeEffect();

}, 3500);

/* ================================================= */
/* QUOTE ANIMATION */
/* ================================================= */

/* ================================================= */
/* CHATBOT TOGGLE */
/* ================================================= */

const chatbotToggle =
  document.querySelector(".chatbot-toggle");

const chatbotBox =
  document.querySelector(".chatbot-box");

const closeChat =
  document.querySelector(".close-chat");

chatbotToggle.addEventListener("click", () => {

  chatbotBox.classList.toggle("active");

});

closeChat.addEventListener("click", () => {

  chatbotBox.classList.remove("active");

});

/* ================================================= */
/* CHAT AI GEMINI */
/* ================================================= */

const API_KEY =
  "AIzaSyDadOrf7eObjmyacH5z0OfqETUBl4P89Zg";  

const sendBtn =
  document.getElementById("sendBtn");

const chatInput =
  document.getElementById("chatInput");

const chatBody =
  document.getElementById("chatBody");

async function sendMessage() {

  const message =
    chatInput.value.trim();

  if (!message) return;

  /* ========================= */
  /* USER MESSAGE */
  /* ========================= */

  const userDiv =
    document.createElement("div");

  userDiv.classList.add(
    "user-message"
  );

  userDiv.innerHTML =
    message;

  chatBody.appendChild(userDiv);

  chatInput.value = "";

  chatBody.scrollTop =
    chatBody.scrollHeight;

  /* ========================= */
  /* LOADING MESSAGE */
  /* ========================= */

  const loadingDiv =
    document.createElement("div");

  loadingDiv.classList.add(
    "bot-message"
  );

  loadingDiv.innerHTML =
    "Yozz AI sedang berpikir...";

  chatBody.appendChild(loadingDiv);

  chatBody.scrollTop =
    chatBody.scrollHeight;

  try {

    const response =
      await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            contents: [
              {

                parts: [
                  {

                    text: `
Kamu adalah AI edukasi Alat Musik Tradisional Kecapi Dari Kalimantan Tengah.

Tugas kamu:
- Hanya membahas budaya Indonesia.
- Fokus utama pada Kecapi Kalimantan Tengah.
- Bisa menjelaskan:
  • Kecapi ( bentuk, senar, makna dibalik bentuk)
  • tradisi & budaya Dayak
  • sejarah budaya
  • pelestarian budaya
  • musik tradisional kalimantan tengah
  • lagu tradisional kalimantan tengah
  -apapun itu yang berhubungan dengan suku, adat, budaya dan kearifa tradisional masyarakat dayak.

- Gunakan bahasa yang santai, edukatif, dan mudah dipahami pelajar.
- Jawaban maksimal 10 kalimat agar tidak terlalu panjang.
- Jika pengguna bertanya di luar topik budaya Indonesia, tolak dengan sopan.
- beri jawaban sesingkat dan sepadat mungkin namun tetap berdaging.

Pertanyaan pengguna:
${message}
                    `,

                  },

                ],

              },

            ],

          }),

        }
      );

    const data =
      await response.json();

    console.log(data);

    if (!data.candidates) {

      throw new Error(

        data.error?.message ||
        "AI tidak memberi respon"

      );

    }

    const aiReply =
      data.candidates[0]
      .content.parts[0].text;

    loadingDiv.innerHTML =
      aiReply;

    chatBody.scrollTop =
      chatBody.scrollHeight;

  } catch (error) {

    console.log(error);

    loadingDiv.innerHTML =
      "Terjadi kesalahan server.";

  }

}

/* ================================================= */
/* SEND MESSAGE EVENT */
/* ================================================= */

sendBtn.addEventListener(
  "click",
  sendMessage
);

chatInput.addEventListener(
  "keypress",
  (e) => {

    if (e.key === "Enter") {

      sendMessage();

    }

  }
);

/* ================================================= */
/* NAVBAR SCROLL EFFECT */
/* ================================================= */

window.addEventListener(
  "scroll",
  () => {

    const header =
      document.querySelector(".header");

    header.classList.toggle(
      "sticky",
      window.scrollY > 50
    );

  }
);

/* ================================================= */
/* PARALLAX HERO */
/* ================================================= */

window.addEventListener(
  "scroll",
  () => {

    const hero =
      document.querySelector(".hero");

    let offset =
      window.scrollY;

    hero.style.backgroundPositionY =
      offset * 0.5 + "px";

  }
);