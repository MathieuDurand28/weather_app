/**
 * First try in JS & TS
 * @param withIP
 */
async function main(withIP = true){
    let ville

    if (withIP) {
        const ip = await fetch("https://api.my-ip.io/ip.json")
            .then(result => result.json())
            .then(data => data.ip)
            .catch(err => {
                console.log(`Une erreur est survenue lors de l'optention de l'adresse IP, ${err}`)
            })
        console.log(`IP: ${ip}\n***************************`)


        ville = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_ZrJtTK3bD29neNMEzwpJ9VpI01jjO&ipAddress=${ip}`)
            .then(result => result.json())
            .then(data => data.location.city)
            .catch(err => {
                console.log(`Une erreur est survenue lors de l'optention dela ville , ${err}`)
            })
        console.log(`CITY: ${ville}\n***************************`)

    } else {
        // @ts-ignore
        ville = document.getElementById("ville").value
        console.log(`CITY: ${ville}\n***************************`)
    }

    const meteo = await fetch(`http://api.weatherstack.com/current?access_key=ac24823841a02bb04fa6e983372109db&query=${ville}`)
        .then(result => result.json())
        .then(data => data.current)
        .catch(err => {
            console.log(`Une erreur est survenue lors de l'optention de la meteo, ${err}`)
        })
    console.log(`WEATHER: ${JSON.stringify(meteo, null, 4)}\n***************************`)


    if (typeof meteo !== "undefined") {
        document.querySelector("#temperature").textContent = (withIP)
            ? `En se basant sur votre IP, il fait actuellement ${meteo.temperature}°C à ${ville.toUpperCase()}`
            : `Il fait actuellement ${meteo.temperature}°C à ${ville.toUpperCase()}`
        document.querySelector("#wi").setAttribute("src", meteo.weather_icons[0])

    } else {
        // @ts-ignore
        document.getElementById("ville").value = "Ville inconnue !"
        document.querySelector("#temperature").textContent = "Merci de réessayer avec un autre nom de ville."
    }
}

main().then(() => {
    console.log("end of script")
}).catch(err => {
    console.log(err)
})

document.addEventListener('keydown', (k) => {
    if (k.key === "Enter") {
        // @ts-ignore
        (document.getElementById("ville").value === "") ? main() : main(false)
    }
})
