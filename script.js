const quoteContainer = document.getElementById('quote-Container');
const quoteText = document.getElementById('quote-Text');
const quoteAuthor = document.getElementById('quote-Author');
const twitterButton = document.getElementById('twitter-Button');
const newQuoteButton = document.getElementById('new-Quote');
const loader = document.getElementById('loader');

let apiQuotes = [];


// To show data is being loaded
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loader Animation
function loadComplete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// Function : Display a New Quote

function newQuote() {
    loading();
    //Pick a Random Quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // if Author field is blank, then dynamically replace it with "Author Unknown
    if (!quote.author) {
        quoteAuthor.textContent = "Unknown Author";
    } else {
        quoteAuthor.textContent = quote.author;
    }

    // Check Quote length to determine styling
    if (quote.text.length > 60) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // quoteAuthor.textContent = quote.author;
    quoteText.textContent = quote.text;
    loadComplete();
}
// Get Quotes from API or local source
// response is an array with nested objects
// async fetch reqstest within a Try Catch Statement
async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        alert(error)
        // Catching an Error
    }
}

// Tweet a Quote
function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterURL, '_blank');
}

// Event Listners
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

//on load
getQuotes();
