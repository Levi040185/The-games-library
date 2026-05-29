const addGame = async (event) => {
    event.preventDefault();
    console.log("Add game clicked");
    const game = {
        name: document.querySelector("#name").value,
        type: document.querySelector("#type").value,
        rating: Number(document.querySelector("#rating").value),
    };

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

console.log("add-games.js loaded");
console.log("Add game button found:", addGameForm);

addGameForm.addEventListener("submit", addGame);
