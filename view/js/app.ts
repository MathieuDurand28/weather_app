/**
 * First try in JS & TS
 * @param withIP
 */
async function main(withIP: boolean = true): Promise<void> {
    let ville: string
    console.log("************************************\n************************************\n***GET METEO BY IP V1" +
        "\n************************************\n***MADE WITH TS\n************************************\n" +
        "***BY MATHIEU DURAND - 01/2022\n************************************\n************************************\n")
    if (withIP) {
        const ip = await fetch("https://api.my-ip.io/ip.json")
            .then(result => result.json())
            .then(data => data.ip)
            .catch(err => {
                console.log(`Une erreur est survenue lors de l'optention de l'adresse IP, ${err}`)
            })
        console.log(`IP: ${ip}\n***************************`)


        ville = await fetch(`http://ip-api.com/json/${ip}`)
            .then(result => result.json())
            .then(data => data.city)
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
        .then(data => data)
        .catch(err => {
            console.log(`Une erreur est survenue lors de l'optention de la meteo, ${err}`)
        })
    console.log(`WEATHER: ${JSON.stringify(meteo, null, 4)}\n***************************`)

    if (!meteo.success){
        document.querySelector("#temperature").textContent = meteo.error.info
        document.querySelector(".input_ville").setAttribute("class","hide")
        document.querySelector("#wi").setAttribute("class","hide")
    } else if (typeof meteo.current !== undefined) {
        document.querySelector("#temperature").textContent = (withIP)
            ? `En se basant sur votre IP, il fait actuellement ${meteo.current.temperature}°C à ${ville.toUpperCase()}`
            : `Il fait actuellement ${meteo.current.temperature}°C à ${ville.toUpperCase()}`
        document.querySelector("#wi").setAttribute("src", meteo.current.weather_icons[0])
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
