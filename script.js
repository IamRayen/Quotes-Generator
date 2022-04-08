//Elements
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("generate");
const moveLeftBtn = document.getElementById("goleft");
const moveRightBtn = document.getElementById("goright");
const copyBtn = document.getElementById("copy");

//Getting the quotes:

let apiQuotes = [];

// add new quote

const addQuote = () => {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //checking if author field is blank
    quote.author
        ? (authorText.innerText = quote.author)
        : (authorText.innerText = "Unknown");

    //check quote length
    quote.text.length > 120
        ? quoteText.classList.add("long-quote")
        : quoteText.classList.remove("long-quote");
    quoteText.innerText = quote.text;
};

//get quotes from API

const getQuotes = async () => {
    const apiURL = "https://type.fit/api/quotes";

    try {
        apiQuotes = await (await fetch(apiURL)).json();
        addQuote();
    } catch (error) {
        console.log(error, "working with local quotes because api is DOWN");
        apiQuotes = localQuotes;
        addQuote();
    }
};

//Tweet quote
const tweetQuote = () => {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterURL, "_blank");
};

//Copy Function

const copyText = () => {
    //select text
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    navigator.clipboard.writeText(quote + " - " + '"'+author+'"');
};

//Event Listeners

newQuoteBtn.addEventListener("click", addQuote);
twitterBtn.addEventListener("click", tweetQuote);
copyBtn.onclick = copyText;

//bootstrap popover
var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
}); 



//on Load
getQuotes();
