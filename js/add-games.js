const addStatusError = (status) => {
    const statusDiv = document.querySelector("#status");
    statusDiv.innerHTML = `
        <h3>Status</h3>
        <p class="error">${status}</p>
    `;
};

const nameIsUnique = async (name) => {
    const response = await fetch(
        `http://localhost:3000/games/name/${name}`
    );

    const result = await response.json();

    return result === null;
};

const addGame = async (event) => {
    event.preventDefault();
    const game = {
        name: document.querySelector("#name").value,
        type: document.querySelector("#type").value,
        rating: Number(document.querySelector("#rating").value),
    };

    if (game.name === "" || game.type === "" || game.rating === 0) {
        addStatusError("No empty values allowed for name, type and rating.");
        return;
    }

    if (game.name.length < 2 || game.name.length > 64) {
        addStatusError("The length of a name should be between 2 and 64 characters.");
        return;
    }

    if (game.rating < 0 || game.rating > 10) {
        addStatusError("The rating is not valid");
        return;
    }

    const isUnique = await nameIsUnique(game.name);
    if (!isUnique) {
        addStatusError("The name is not unique in the library.");
        return;
    }

    const response = await fetch("http://localhost:3000/games", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
    });

    const result = await response.json();

    const statusDiv = document.querySelector("#status");

    statusDiv.innerHTML = `
        <h3>Status</h3>
        <p>Game ${result.name} was added.</p>
    `;
};

const addGameForm = document.querySelector("form");


addGameForm.addEventListener("submit", addGame);
