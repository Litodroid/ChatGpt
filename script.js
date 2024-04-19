const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#deleteButton");
let deleteModal = document.getElementById('deleteModal');
let confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
let closeModal = document.getElementById('closeModal');
let cancelDeleteBtn = document.getElementById('cancelDeleteBtn');


function _0xe17e(){const _0x435715=['801714hcldeK','40YpiRJG','10988943fJCCAa','467904FbBKuD','sk-kdQ0xqx','1946888lBNxtY','JRUCkeLNbq','3EHKAyM','VDET3BlbkF','4325048bPGQTH','cLeIZZD1bH','1256340gbRYXm','1998276fpdMAX','F3lu8TtaPJ','63ZsSvKS'];_0xe17e=function(){return _0x435715;};return _0xe17e();}const _0x1391e5=_0x1cd6;(function(_0x210868,_0x470840){const _0x385915=_0x1cd6,_0x18f7fd=_0x210868();while(!![]){try{const _0x4ded26=parseInt(_0x385915(0xe6))/(0x3bf*0x9+-0x1617+-0x23*0x55)+-parseInt(_0x385915(0xe0))/(-0x665+-0x4e*-0x22+0x3f5*-0x1)+parseInt(_0x385915(0xea))/(-0x2ff+-0xaae+0xdb0)*(-parseInt(_0x385915(0xe8))/(0x20e2+-0x7a*0x1+-0x819*0x4))+-parseInt(_0x385915(0xe4))/(-0x1a+0x1*-0x33b+0x35a)*(parseInt(_0x385915(0xe3))/(-0x1*0x10b1+0x1edd*-0x1+-0xae*-0x46))+parseInt(_0x385915(0xe5))/(-0xf5*-0x5+-0xa97*-0x1+-0xf59)+parseInt(_0x385915(0xdd))/(-0x105e+0x1e63+-0xdfd)+-parseInt(_0x385915(0xe2))/(-0x19*0xa+-0x39*-0x46+0x5b*-0x29)*(-parseInt(_0x385915(0xdf))/(-0x7*0x543+0x1*0x1fbe+0x521));if(_0x4ded26===_0x470840)break;else _0x18f7fd['push'](_0x18f7fd['shift']());}catch(_0x3a9d36){_0x18f7fd['push'](_0x18f7fd['shift']());}}}(_0xe17e,0x16e419+0xc4892*-0x2+0x107c3*0xf));function _0x1cd6(_0x40ded5,_0x1df28b){const _0x28e4f7=_0xe17e();return _0x1cd6=function(_0x874794,_0x551748){_0x874794=_0x874794-(0x14b0+0x1068+-0x121e*0x2);let _0x3c0a89=_0x28e4f7[_0x874794];return _0x3c0a89;},_0x1cd6(_0x40ded5,_0x1df28b);}const API_KEY=_0x1391e5(0xe7)+_0x1391e5(0xe1)+_0x1391e5(0xdc)+_0x1391e5(0xe9)+_0x1391e5(0xde)+'v';;

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
