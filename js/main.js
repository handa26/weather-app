window.addEventListener('load', () => {
    let long; // Longitude
    let lat; // Latitude
    let temperatureDesc = document.querySelector('.temperature-desc');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.degree-section');
    const degreeSpan = document.querySelector('.degree-section span');


    if (navigator.geolocation) { // Melacak posisi pengguna
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // Beri permisi...
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/0cb6c73bdc60d8710a1fd7e4810b9e45/${lat},${long}`;
            fetch(api) //Fetching API
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;

                    // Set DOM Elements dari API
                    temperatureDegree.textContent = temperature;
                    temperatureDesc.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    // Set icons
                    setIcons(icon, document.querySelector('.icon'));
                    // Rumus Fahrenheit ke Celsius / C ke F
                    let celsius = (temperature - 32) * (5 / 9);

                    // Ubah Fahrenheit ke Celsius/sebaliknya
                    degreeSection.addEventListener('click', () => {
                        if (degreeSpan.textContent === 'F') {
                            degreeSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            degreeSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                })
        });
    } else {
        alert('Error');
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: 'white' });
        const currentIcon = icon.replace(/-/, "_").toUpperCase();

        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});