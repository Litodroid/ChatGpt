const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#deleteButton");
let deleteModal = document.getElementById('deleteModal');
let confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
let closeModal = document.getElementById('closeModal');
let cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

function _0x1f0b(){const _0x29e0c4=['6VGJVtI','21MAStVP','258ujWWdf','279724GAPXAX','3241926FKAUEx','3592782lwJqTX','433870lCiVcE','3365416NPZRyE','10fTuFWn','12316kcwkjz','5372312OnjIkO'];_0x1f0b=function(){return _0x29e0c4;};return _0x1f0b();}(function(_0x10d21d,_0xa5ec8a){const _0x5db77b=_0x253c,_0xda386f=_0x10d21d();while(!![]){try{const _0x36ad95=-parseInt(_0x5db77b(0xca))/0x1*(-parseInt(_0x5db77b(0xc7))/0x2)+parseInt(_0x5db77b(0xc9))/0x3*(parseInt(_0x5db77b(0xc5))/0x4)+parseInt(_0x5db77b(0xc2))/0x5+parseInt(_0x5db77b(0xc1))/0x6+parseInt(_0x5db77b(0xc8))/0x7*(-parseInt(_0x5db77b(0xc3))/0x8)+-parseInt(_0x5db77b(0xcb))/0x9+-parseInt(_0x5db77b(0xc4))/0xa*(-parseInt(_0x5db77b(0xc6))/0xb);if(_0x36ad95===_0xa5ec8a)break;else _0xda386f['push'](_0xda386f['shift']());}catch(_0x20dc26){_0xda386f['push'](_0xda386f['shift']());}}}(_0x1f0b,0xa0144));function _0x253c(_0x1de3d7,_0x1bf897){const _0x1f0bc2=_0x1f0b();return _0x253c=function(_0x253c45,_0x26f5a1){_0x253c45=_0x253c45-0xc1;let _0x533c33=_0x1f0bc2[_0x253c45];return _0x533c33;},_0x253c(_0x1de3d7,_0x1bf897);}const QVBJX0tFWT0nc2sta2RRMHhxeEYzbHU4VHRhUEpWREVUM0JsYmtGSlJVQ2tlTE5icWNMZUlaWkQxYkh2Jzs=
// Save the API key in localStorage
let userText = null;
const loadDataFromLocalstorage = () => {
    // Load saved chats and theme from local storage and apply/add on the page
    const themeColor = localStorage.getItem("themeColor");

    document.body.classList.toggle("light-mode", themeColor === "light_mode");
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";

    const defaultText = `<div class="default-text">
                            <h1>LitoIA-Litodroid</h1>
                            <p>Inicie una conversacion y experimente el poder de LitoIA.</p>
                        </div>`

    chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
    chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to bottom of the chat container
}

const createChatElement = (content, className) => {
    // Create new div and apply chat, specified class and set html content of div
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = content;
    return chatDiv; // Return the created chat div
}

const getChatResponse = async (incomingChatDiv) => {
    const API_URL = "https://api.openai.com/v1/completions";
    const pElement = document.createElement("p");

    // Define the properties and data for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: userText,
            max_tokens: 2048,
            temperature: 0.2,
            n: 1,
            stop: null
        })
    }

    // Send POST request to API, get response and set the reponse as paragraph element text
    try {
        const response = await (await fetch(API_URL, requestOptions)).json();
        pElement.textContent = response.choices[0].text.trim();
    } catch (error) { // Add error class to the paragraph element and set error text
        pElement.classList.add("error"); 
       pElement.innerHTML = `Si te gusto esto apoya al creador con una donacion via paypal <a
            href="https://paypal.me/litodroid">Go on</a>`;
    }

    // Remove the typing animation, append the paragraph element and save the chats to local storage
    incomingChatDiv.querySelector(".typing-animation").remove();
    incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
    localStorage.setItem("all-chats", chatContainer.innerHTML);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
}

const copyResponse = (copyBtn) => {
    // Copy the text content of the response to the clipboard
    const reponseTextElement = copyBtn.parentElement.querySelector("p");
    navigator.clipboard.writeText(reponseTextElement.textContent);
    copyBtn.textContent = "done";
    setTimeout(() => copyBtn.textContent = "content_copy", 1000);
}

const showTypingAnimation = () => {
    // Display the typing animation and call the getChatResponse function
    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="images/chatbot.jpg" alt="chatbot-img">
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
                </div>`;
    // Create an incoming chat div with typing animation and append it to chat container
    const incomingChatDiv = createChatElement(html, "incoming");
    chatContainer.appendChild(incomingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    getChatResponse(incomingChatDiv);
}

const handleOutgoingChat = () => {
    userText = chatInput.value.trim(); // Get chatInput value and remove extra spaces
    if (!userText) return; // If chatInput is empty return from here

    // Clear the input field and reset its height
    chatInput.value = "";
    chatInput.style.height = `${initialInputHeight}px`;

    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="images/user.jpg" alt="user-img">
                        <p>${userText}</p>
                    </div>
                </div>`;

    // Create an outgoing chat div with user's message and append it to chat container
    const outgoingChatDiv = createChatElement(html, "outgoing");
    chatContainer.querySelector(".default-text")?.remove();
    chatContainer.appendChild(outgoingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    setTimeout(showTypingAnimation, 500);
}
themeButton.addEventListener("click", () => {
    // Toggle body's class for the theme mode and save the updated theme to the local storage 
    document.body.classList.toggle("light-mode");
    localStorage.setItem("themeColor", themeButton.innerText);
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
});

const initialInputHeight = chatInput.scrollHeight;

chatInput.addEventListener("input", () => {
    // Adjust the height of the input field dynamically based on its content
    chatInput.style.height = `${initialInputHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If the Enter key is pressed without Shift and the window width is larger 
    // than 800 pixels, handle the outgoing chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleOutgoingChat();
    }
});

loadDataFromLocalstorage();
sendButton.addEventListener("click", handleOutgoingChat);
// model 
deleteButton.addEventListener('click', function () {
    deleteModal.style.display = 'block';
});

closeModal.addEventListener('click', function () {
    deleteModal.style.display = 'none';
});

cancelDeleteBtn.addEventListener('click', function () {
    deleteModal.style.display = 'none';
});

confirmDeleteBtn.addEventListener('click', function () {
    localStorage.removeItem("all-chats");
    loadDataFromLocalstorage();
    deleteModal.style.display = 'none';
});

// loader
document.addEventListener("DOMContentLoaded", function () {
    // Simulate a delay for demonstration purposes
    setTimeout(function () {
        // Hide the loading page and show the content after a delay
        document.querySelector(".loader-wrapper").style.display = "none";
        document.querySelector(".chat-container").style.display = "block";
    
        // Enable scrolling after the content is loaded
    }, 4000); // You can adjust the delay as needed
});
