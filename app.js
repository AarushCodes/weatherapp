window.addEventListener("load", ()=> {
    let long;
    let lat;
    let tempratureDescription = document.querySelector('.temperature-description');
    let tempratureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature') 
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=a2ce5a0e99c9444278ca3717a5fc2aec`
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data)
                const { temp } = data.main;
                const ftemp = ((data.main.temp-273.15)*1.8)+32;
                const { icon } = data.weather[0].description
                tempratureDegree.textContent = ((data.main.temp-273.15)*1.8)+32;
                tempratureDescription.textContent = data.weather[0].main;
                locationTimezone.textContent = data.name;
                // FORMULA FOR CELSUIS

                let celsius = (ftemp - 32) * (5 / 9)
                //set icon
                setIcons(data.weather[0].description, document.querySelector('.icon'));

                //Change temp to c / f
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = 'C';
                        tempratureDegree.textContent = Math.floor(celsius);

                    }else{
                        temperatureSpan.textContent = 'F';
                        tempratureDegree.textContent = ftemp
                    }
                });

            });
        });

        
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"})
        var currentIcon = icon.replace(/-/g, "_").toUpperCase();
        if (currentIcon == 'SMOKE') {
            currentIcon = "FOG"
        }
        skycons.play();
        console.log(currentIcon)
        return skycons.set(iconID, Skycons[currentIcon])
    }
});