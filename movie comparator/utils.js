//возвращает обёртку на функцию которая вызывается не чаще
//одного раза в заданном промежутке времени(dellay)
const debounce = (callback, delay = 1000) => {
    let timeoutID = 0;
    return (...args) => {
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
        timeoutID = setTimeout(() => {
            callback.apply(null, args);
        }, delay);

    };
};