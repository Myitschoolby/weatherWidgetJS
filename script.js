const Weather = function() {

    const show = function(data) {
        const infoBlock = document.querySelector('.weather_info');

        if (!infoBlock) return;
        infoBlock.innerHTML = '';

        const h3 = document.createElement('h3'),
            divDate = document.createElement('div'),
            divCurrent = document.createElement('div'),
            divTitle = document.createElement('div'),
            imgIcon = document.createElement('img'),
            divTemp = document.createElement('div');
        
        
        h3.innerHTML = `${data.location.country}, ${data.location.name}`;

        divDate.classList.add('date');
        divDate.innerHTML = `${data.current.last_updated}`;

        divCurrent.classList.add('current');

        divTitle.classList.add('title');
        divTitle.innerHTML = `${data.current.condition.text}`;

        imgIcon.src = data.current.condition.icon;
        
        divTemp.classList.add('temp');
        divTemp.innerHTML = `${data.current.temp_c} C&deg;`;

        divCurrent.appendChild(divTitle);
        divCurrent.appendChild(imgIcon);
        divCurrent.appendChild(divTemp);

        infoBlock.appendChild(h3);
        infoBlock.appendChild(divDate);
        infoBlock.appendChild(divCurrent);
    };

    const mwSearch = async function(query) {
        if (!query) return;

        const url = 'http://api.weatherapi.com/v1/current.json?key={KEY API}&q=' + query;

        await fetch(url).then(function(response) {
            return response.json();
        }).then(function(result) {
            show(result);
        });
    };

    const queryInput = document.querySelector('.weather_query [name="query"]'),
        searchButton = document.querySelector('.weather_query [name="search"]');
    
    if (!queryInput || !searchButton) return;

    searchButton.addEventListener('click', function() {
        let queryValue = queryInput.value || '';

        mwSearch(queryValue);
    });

};

window.addEventListener('load', function() {
    new Weather();
});