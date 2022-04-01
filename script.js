let apiQuotes= []

// add new quote

const addQuote = () =>{
    const quote = []
    quote.push(apiQuotes[Math.floor((Math.random() * apiQuotes.length))])
    console.log(quote)
    console.log(apiQuotes.length)
}

//get quotes from API

const getQuotes = async() => {
    
    const apiURL = 'https://type.fit/api/quotes'

    try {

        apiQuotes = await (await fetch(apiURL)).json();
        console.log(apiQuotes)
        addQuote()

    } catch (error) {

        console.log(error,"working with local quotes because api is DOWN")
        apiQuotes = localQuotes
        addQuote()

    }
}

getQuotes()

