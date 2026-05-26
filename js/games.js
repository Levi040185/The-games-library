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

const friendGames = [{
        name: "Minecraft",
        type: "Open World",
        rating: 5,
        isFavourite: true
    },
    {
        name: "Tetris",
        type: "Puzzle",
        rating: 5,
        isFavourite: false
    }
];

const allGames = [...games, ...friendGames];

const toString = (game) => {
    return `Name: ${game.name} - Type: ${game.type} - Rating: ${game.rating} - Favourite: ${game.isFavourite}`;
};

const calculateAverageRating = () => {
    let total = 0;
    games.forEach((game) => {
        total += game.rating;
    });
    return (total / games.length).toFixed(1);
};

const getHighestRating = () => {
    if (games.length === 0) {
        return null;
    }
    let highestGame = games[0];
    games.forEach((game) => {
        if (game.rating > highestGame.rating) {
            highestGame = game;
        }
    });

    return highestGame;
};

const printGamesRatingAbove = (games, rating) => {
    const gamesAboveRating = games.filter((game) => {
        return game.rating > rating;
    });

    gamesAboveRating.forEach((game) => {
        addStatus(toString(game));
    });
};

const [firstGame, secondGame] = games;

const printAllGames = (listOfGames) => {
    listOfGames
        .map(toString)
        .forEach(addStatus);
};

const filterAndPrintGames = (games, customFilter) => {
    const filteredGames = games.filter(customFilter);
    filteredGames.forEach((game) => {
        addStatus(toString(game));
    });
};

addStatus("<strong>My own games:</strong>");
printAllGames(games);

addStatus("<strong>Some statistics ...</strong>");
addStatus(`Average rating: ${calculateAverageRating()}`);

const highestGame = getHighestRating();

if (highestGame === null) {
    addStatus("No games found");
} else {
    addStatus(`${highestGame.name} is the game with the highest rating: ${highestGame.rating}`);
}

addStatus("<strong>My first 2 games are:</strong>");
addStatus(firstGame.name);
addStatus(secondGame.name);

addStatus("<strong>My best friend's games:</strong>");
printAllGames(friendGames);

addStatus("<strong>All the games in our library:</strong>");
printAllGames(allGames);

addStatus("<strong>These are all games with rating above 3:</strong>");
printGamesRatingAbove(games, 3);

addStatus("<strong>These are all the favourite games in the library</strong>");
filterAndPrintGames(games, (game) =>{
    return game.isFavourite === true;
});

addStatus(`<strong>These games have type "Open World"</strong>`);
filterAndPrintGames(games, (game) => {
    return game.type === "Open World";
});