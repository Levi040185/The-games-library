const game1 = {name: "Fifa23", type: "Football", rating: 7, isFavourite: false}
const game2 = {name: "AOTennis 2", type: "Tennis", rating: 2, isFavourite: true}
const game3 = {name: "Elden Ring", type: "Fantasy", rating: 4, isFavourite: false}
const game4 = {name: "Horizon Forbidden West", type: "Adventure", rating: 3.5, isFavourite: false}
const game5 = {name: "Pokémon Legends: Arceus", type: "RPG", rating: 3, isFavourite: true}
const game6 = {name: "GTAV", type: "Open World", rating: 5, isFavourite: true}
const game7 = {name: "Gran Turismo", type: "Car", rating: 6, isFavourite: true}

const toString = (game) => {
    return `Name: ${game.name} - Type: ${game.type} - Rating: ${game.rating} - Favourite: ${game.isFavourite}`;
};

const calculateAverageRating = () => {
    return (game1.rating + game2.rating + game3.rating + game4.rating + game5.rating + game6.rating + game7.rating) / 7;
};

const getHighestRating = () => {
    let highestGame = game1;
    if (game2.rating > highestGame.rating) {
        highestGame = game2;
    }
    if (game3.rating > highestGame.rating) {
        highestGame = game3;
    }
    if (game4.rating > highestGame.rating) {
        highestGame = game4;
    }
    if (game5.rating > highestGame.rating) {
        highestGame = game5;
    }
    if (game6.rating > highestGame.rating) {
        highestGame = game6;
    }
    if (game7.rating > highestGame.rating) {
        highestGame = game7;
    }
    return highestGame;
};

const isFavourite = (game) => {
    return game.isFavourite;
};

const printFavouriteGames = () => {
    addStatus("<strong>These are all the favourite games in the library</strong>");

    isFavourite(game1) ? addStatus(game1.name) : null;
    isFavourite(game2) ? addStatus(game2.name) : null;
    isFavourite(game3) ? addStatus(game3.name) : null;
    isFavourite(game4) ? addStatus(game4.name) : null;
    isFavourite(game5) ? addStatus(game5.name) : null;
    isFavourite(game6) ? addStatus(game6.name) : null;
    isFavourite(game7) ? addStatus(game7.name) : null;
};

const printAllGames = () => {
    addStatus("<strong>These are all games in the library</strong>");
    addStatus(toString(game1));
    addStatus(toString(game2));
    addStatus(toString(game3));
    addStatus(toString(game4));
    addStatus(toString(game5));
    addStatus(toString(game6));
    addStatus(toString(game7));
    printFavouriteGames();
    addStatus("<strong>Some statistics ...</strong>");
    addStatus(`Average rating: ${calculateAverageRating()}`);
    const highestGame = getHighestRating();
    addStatus(`${highestGame.name} is game with the highest rating: ${highestGame.rating}`);
}

printAllGames();