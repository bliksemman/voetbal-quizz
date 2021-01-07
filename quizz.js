
const quizz = [
    {
        vraag: `Wanneer heeft Nederland het EK gewonnen?`,
        antwoord: `1988`,
        fout: [`1914`, `1833`, `2020`]
    },
    {
        vraag: `Wanneer heeft Nederland de final van het WK bereikt?`,
        antwoord: `2010`,
        fout: [`1999`, `2009`, `2007`]
    },
    {
        vraag: `Waar speelt Virgil van Dijk`,
        antwoord: `Liverpool`,
        fout: [`Barcelona`, `Tottenham`, `Sevilla`]
    },
    {
        vraag: `De mascotte van Ajax is?`,
        antwoord: `Lucky`,
        fout: [`Green`, `Flint`, `Lucht`]
    },
    {
        vraag: `Bij welke club was Thomas Tuchel coach?`,
        antwoord: `PSG`,
        fout: [`Barcelona`, `Tottenham`, `Manchester`]
    },
    {
        vraag: `Hoe groot is een voetbal?`,
        antwoord: `Maten verschillen per voetbal`,
        fout: [`Zo groot als een fret`, `Maat 11`]
    },
    {
        vraag: `Wat is een tenue?`,
        antwoord: `Je voetbalshirt en broek`,
        fout: [`Een grasmast`]
    }
];

const toestand = {
    score: 0,
    index: 0
}

const volgende = (event) => {
    if (event.target.dataset.goed === "ja") {
        toestand.score++
    }
    toestand.index++;

    // Zoek de game op het scherm
    const gameElement = document.querySelector("#game");
    // Wis de inhoud
    gameElement.innerHTML = "";

    // Kijk of er nog een vraag is
    const vraag = quizz[toestand.index];
    if (vraag === undefined) {
        // nee; toon dan de score
        toonScore(gameElement);
    }
    else {
        // ja; toon dan de volgende vraag
        toonVraag(gameElement, vraag);
    }
}

const toonVraag = (gameElement, vraag) => {

    // Maak een nieuw vraag scherm
    var vraagBlauwdruk = document.querySelector('#vraag');
    var vraagElement = vraagBlauwdruk.content.cloneNode(true);
    vraagElement.querySelector(".vraag-tekst").textContent = vraag.vraag;

    // Ze de mogelijke antwoorden erbij
    const antwoordenElement = vraagElement.querySelector(".antwoorden");
    var antwoordBlauwdruk = document.querySelector('#antwoord');
    var alleAntwoorden = vraag.fout.map(tekst => { return { tekst, goed: "nee" }; });
    alleAntwoorden.push({ tekst: vraag.antwoord, goed: "ja" });
    hussel(alleAntwoorden);
    alleAntwoorden.forEach(mogelijkAntwoord => {
        const antwoordElement = antwoordBlauwdruk.content.cloneNode(true);
        const antwoordTekstElement = antwoordElement.querySelector(".antwoord")
        antwoordTekstElement.textContent = mogelijkAntwoord.tekst;
        antwoordTekstElement.addEventListener("click", volgende, true);
        antwoordTekstElement.dataset.goed = mogelijkAntwoord.goed;
        antwoordenElement.appendChild(antwoordTekstElement);
    });

    gameElement.appendChild(vraagElement);
}

const toonScore = (gameElement) => {
    var scoreBlauwdruk = document.querySelector("#score")
    var scoreElement = scoreBlauwdruk.content.cloneNode(true);
    scoreElement.querySelector(".score").textContent = toestand.score;
    gameElement.appendChild(scoreElement);
}



const hussel = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    toonVraag(document.querySelector("#game"), quizz[0]);
});