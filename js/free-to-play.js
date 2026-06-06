// Importeren
const fetchGames = async () => {
    const response = await fetch(
        "https://free-to-play-games-database.p.rapidapi.com/api/games", {
            method: "GET",
            headers: {
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
                "X-RapidAPI-Key": "47b12b905bmshb0da1156b96b3a8p17a940jsn4138eec0c203",
            },
        }
    );

    const result = await response.json();

    return result;
};

// Aantal cards om te beginnen
let numberOfGames = 20;


// Games weergeven
const renderGames = async () => {
    const games = await fetchGames();

    const gamesContainer = document.querySelector("#games-container");
    gamesContainer.className = "games-grid";
    gamesContainer.innerHTML = "";

    // Filters
    const titleFilter = document.querySelector("#title-filter");
    const searchText = titleFilter.value.toLowerCase();
    const platform = readPlatform();
    const sortOption = readSortOption();

    let gamesToRender = games
        .filter((game) =>
            game.title.toLowerCase().includes(searchText)
        )
        .filter((game) =>
            platform === "all" || game.platform === platform
        );

    if (sortOption === "title") {
        gamesToRender = gamesToRender.toSorted((a, b) =>
            a.title.localeCompare(b.title)
        );
    }

    if (sortOption === "release-date") {
        gamesToRender = gamesToRender.toSorted((a, b) =>
            new Date(b.release_date) - new Date(a.release_date)
        );
    }

    gamesToRender
        .slice(0, numberOfGames)
        .forEach((game) => {
            const gameCard = document.createElement("div");
            gameCard.className = "game-card";

            const title = document.createElement("h3");
            title.innerHTML = game.title;

            const image = document.createElement("img");
            image.src = game.thumbnail;
            image.alt = game.title;

            const infoDiv = document.createElement("div");
            infoDiv.className = "game-info";

            gameCard.appendChild(title);
            gameCard.appendChild(image);
            gameCard.appendChild(infoDiv);

            gameCard.addEventListener("click", () => {
                if (infoDiv.innerHTML === "") {
                    infoDiv.innerHTML = `
                    <p>${game.short_description}</p>
                    <p>Genre: ${game.genre}</p>
                    <p>Platform: ${game.platform}</p>
                    <p>Release date: ${game.release_date}</p>
                    <p>Publisher: ${game.publisher}</p>
                    <a href="${game.game_url}" target="_blank">Open game</a>
                `;
                } else {
                    infoDiv.innerHTML = "";
                }
            });

            gamesContainer.appendChild(gameCard);
        });
};

// Meer games laden met button
const loadMoreButton = document.querySelector("#load-more-games");
loadMoreButton.addEventListener("click", () => {
    numberOfGames += 20;
    renderGames();
});

// Hulpfuncties
const titleFilter = document.querySelector("#title-filter");
titleFilter.addEventListener("input", () => {
    renderGames();
});

const readPlatform = () => {
    return document.querySelector('input[name="platform"]:checked').value;
};

const readSortOption = () => {
    return document.querySelector('input[name="sort-games"]:checked').value;
};

const platformButtons =
    document.querySelectorAll('input[name="platform"]');

platformButtons.forEach((button) => {
    button.addEventListener("change", () => {
        renderGames();
    });
});

const sortButtons =
    document.querySelectorAll('input[name="sort-games"]');

sortButtons.forEach((button) => {
    button.addEventListener("change", () => {
        renderGames();
    });
});

// start
renderGames();