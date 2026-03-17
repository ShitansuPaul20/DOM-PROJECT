const api = `https://dummyjson.com/quotes/random`
let quote = document.querySelector("blockquote")
let span = document.querySelector("span")
async function getQuote(){
    const resp = await fetch(api)
    let data =await resp.json()
    quote.innerHTML = data.quote
    span.innerHTML = data.author
    
}

function shareOnTwitter() {
  const quoteText = quote.innerText; 
  const authorText = span.innerText;
  const textToTweet = `${quoteText} - ${authorText}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textToTweet)}`;
  window.open(twitterUrl, '_blank');
}

