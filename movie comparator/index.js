let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryTarget, movieSide) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "b91e1d60",
            i: movie.imdbID
        }
    });

   summaryTarget.innerHTML = movieTemplate(response.data);

   if (movieSide === "left") {
       leftMovie = response.data;
   } else {
       rightMovie = response.data;
   }

   if (leftMovie && rightMovie) {
       runComparison();
   }

};

const runComparison = () => {
    console.log("opachki go go go");
}

//аштиэмэльный кусок говна для отображения инфы по фильму
const movieTemplate = (movieInfo) => {
    const boxOffice = parseInt(
        movieInfo.BoxOffice.replace(/\$/g, "").replace(/,/g, "")
    );
    const metascore = parseInt(movieInfo.Metascore);
    const imdbRating = parseFloat(movieInfo.imdbRating);
    const imdbVotes = parseInt(movieInfo.imdbVotes);
    const awards = movieInfo.Awards.split(" ").reduce((prev, word) => {
        const value = parseInt(word);

        if (isNaN(value)) {
            return prev;
        } else {
            return prev + value;
        }
    }, 0);

    console.log(awards);




    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieInfo.Poster}">
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieInfo.Title}</h1>
                    <h4>${movieInfo.Genre}</h4>
                    <p>${movieInfo.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieInfo.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieInfo.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieInfo.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieInfo.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieInfo.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>      
    `;
};

const autocompleteConfig = {
    //це колбек шобы удобнее настраивать опшины
    //в выпадающем меню а не дрочить по кд внутренности функции
    //p.s. спасибо джсу за удобные колбеки 
    renderOption(movie) {
        const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
        return `
            <img src="${imgSrc}">
            ${movie.Title} (${movie.Year})
        `;
    },
    inputValue(movie) {
        return movie.Title;
    },
    //Отправить запрос на получение списка фильмов
    async fetchData(searchQuery) {
        const response = await axios.get("http://www.omdbapi.com/", {
            params: {
                apikey: "b91e1d60",
                s: searchQuery
            }
        });

        if (response.data.Error) {
            return [];
        }

        return response.data.Search;
    }

};

createAutoComplete({
    root: document.querySelector("#left-autocomplete"),
    ...autocompleteConfig,
    onOptionSelect(movie) {
        document.querySelector(".tutorial").classList.add("is-hidden");
        onMovieSelect(movie, document.querySelector("#left-summary"), "left");
    } 
});

createAutoComplete({
    root: document.querySelector("#right-autocomplete"),
    ...autocompleteConfig,
    onOptionSelect(movie) {
        document.querySelector(".tutorial").classList.add("is-hidden");
        onMovieSelect(movie, document.querySelector("#right-summary"), "right");
    }    
});
