const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor= document.getElementById('autor');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

let apiQuotes = [];

// Get new Quotes

function newQuote() {
    // Pick a random quote from apiQuote array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if there is no auther. If there is, replace it with Unknown
    if(!quote.author){
        quoteAuthor.textContent = 'Unknown';
    } else{
        quoteAuthor.textContent = quote.author;
    }

    // Check quote length to determine the styling
    if(quote.text.length > 100){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
}

// Get Quotes from API

async function getQuotes(){
    // Show loading
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        // Hide loader and Show quote 
        complete();
    }catch (error){
        alert(error);// Catch Error Here
    }
}


// Tweet a Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}


// Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load

getQuotes();