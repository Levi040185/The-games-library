const game1 = {
    name: "Fifa23",
    type: "Football",
    rating: 7,
    isFavourite: false
}
const game2 = {
    name: "AOTennis 2",
    type: "Tennis",
    rating: 2,
    isFavourite: true
}
const game3 = {
    name: "Elden Ring",
    type: "Fantasy",
    rating: 4,
    isFavourite: false
}
const game4 = {
    name: "Horizon Forbidden West",
    type: "Adventure",
    rating: 3.5,
    isFavourite: false
}
const game5 = {
    name: "Pokémon Legends: Arceus",
    type: "RPG",
    rating: 3,
    isFavourite: true
}
const game6 = {
    name: "GTAV",
    type: "Open World",
    rating: 5,
    isFavourite: true
}
const game7 = {
    name: "Gran Turismo",
    type: "Car",
    rating: 6,
    isFavourite: true
}

const games = [game1, game2, game3, game4, game5, game6, game7];

const toString = (game) => {
    return `Name: ${game.name} - Type: ${game.type} - Rating: ${game.rating} - Favourite: ${game.isFavourite}`;
};



const table = document.createElement("table");

const thead = document.createElement("thead");

const tr = document.createElement("tr");

const thName = document.createElement("th");
thName.innerHTML = "Name";

const thType = document.createElement("th");
thType.innerHTML = "Type";

const thRating = document.createElement("th");
thRating.innerHTML = "Rating";

tr.appendChild(thName);
tr.appendChild(thType);
tr.appendChild(thRating);

thead.appendChild(tr);

const tbody = document.createElement("tbody");
tbody.id = "my-games-table-body";

table.appendChild(thead);
table.appendChild(tbody);

document.querySelector("main").appendChild(table);

const div = document.createElement("div");
div.id = "status";

const h3 = document.createElement("h3");
h3.innerHTML = "Status";

div.appendChild(h3);

document.querySelector("main").appendChild(div);

// Flowchart voor event listener: rij maken voor elke game - event listener koppelen aan elke rij - klik op rij? - game uit de forEach nemen met de document.querySelector - innerHTML toevoegen aan statusDiv
// Flowchart voor filterknoppen: klik op knop? - event listener uitvoeren - alles leegmaken - renderGames oproepen - filter toepassen? - forEach maakt nieuwe rijen.

function renderGames(games, filterFunction = () => true) {
    const tbody = document.querySelector("#my-games-table-body");

    tbody.innerHTML = "";

    games
        .filter(filterFunction)
        .forEach((game) => {
        const tr = document.createElement("tr");

        const tdName = document.createElement("td");
        tdName.innerHTML = game.name;

        const tdType = document.createElement("td");
        tdType.innerHTML = game.type;

        const tdRating = document.createElement("td");
        tdRating.innerHTML = game.rating;

        tr.appendChild(tdName);
        tr.appendChild(tdType);
        tr.appendChild(tdRating);

        tr.addEventListener("click", () => {
            const statusDiv = document.querySelector("#status");
        
            statusDiv.innerHTML = `
                <h3>Status</h3>
                <p>${toString(game)}</p>
            `;
        });

        tbody.appendChild(tr);
    });
}

renderGames(games);

const statusDiv = document.querySelector("#status");

statusDiv.addEventListener("mouseover", () => {
    statusDiv.style.backgroundColor = "#F00";
});

statusDiv.addEventListener("mouseout", () => {
    statusDiv.style.backgroundColor = "";
});

const h2 = document.querySelector("h2");

const createColor = () => {
    const number = Math.floor(Math.random() * 360);
    return `hsl(${number}, 100%, 50%)`;
};

h2.addEventListener("click", () => {
    h2.style.color = createColor();
});

const favouritesButton =
    document.querySelector("#show-favourites");

const showAllButton =
    document.querySelector("#show-all");

favouritesButton.addEventListener("click", () => {
    renderGames(games, (game) => game.isFavourite);
});
showAllButton.addEventListener("click", () => {
    renderGames(games);
});

const ratingInput =
    document.querySelector("#rating-input");

ratingInput.addEventListener("input", () => {
    renderGames(games, (game) =>
        game.rating > Number(ratingInput.value)
    );
});