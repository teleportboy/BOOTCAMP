//Отправить запрос на получение списка фильмов
const fetchData = async searchQuery => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "b91e1d60",
            s: searchQuery
        }
    });

    console.log(response.data);
};

//колбэк для ивента
const onInput = event => {
    fetchData(event.target.value);
};

const input = document.querySelector("input");
input.addEventListener("input", debounce(onInput));
