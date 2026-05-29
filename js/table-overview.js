const games = [];
let captionText = "All games";

const fetchGames = async () => {
  games.length = 0;

  const response = await fetch("http://localhost:3000/games");

  const result = await response.json();

  games.push(...result);
};

const searchByFetch = async (chars) => {
  games.length = 0;

  const response = await fetch(`http://localhost:3000/games?query=${encodeURIComponent(chars)}`);

  const result = await response.json();

  games.push(...result);
};

const fetchAndRenderGames = async (chars = "") => {
  if (chars === "") {
    captionText = "All games";
    await fetchGames();
  } else {
    captionText = `Games with name containing "${chars}"`;
    await searchByFetch(chars);
  }

  renderGames(games);
};

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

const caption = document.createElement("caption");
caption.innerHTML = captionText;

table.appendChild(caption);
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
    const caption = document.querySelector("caption");
    caption.innerHTML = captionText;

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

fetchAndRenderGames();

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

const ratingInput =
    document.querySelector("#rating-input");

const nameInput =
    document.querySelector("#name-input");

const fetchGamesButton =
    document.querySelector("#fetch-games");

favouritesButton.addEventListener("click", () => {
    renderGames(games, (game) => game.isFavourite);
});

showAllButton.addEventListener("click", async () => {
    nameInput.value = "";
    ratingInput.value = "";

    await fetchAndRenderGames("");
});

ratingInput.addEventListener("input", () => {
    renderGames(games, (game) =>
        game.rating > Number(ratingInput.value)
    );
});

fetchGamesButton.addEventListener("click", async () => {
    await fetchAndRenderGames(nameInput.value.trim());
});