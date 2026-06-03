const data = [];

const fetchData = async () => {
    const response = await fetch(
        "https://api.mcsrvstat.us/3/mc-central.net"
    );

    const result = await response.json();

    data.unshift({
        time: new Date(),
        players: result.players.online,
        maxplayers: result.players.max,
    });
};

const renderData = async () => {
    const tableBody = document.querySelector("#minecraftTable");

    tableBody.innerHTML = "";
    await fetchData();
    const numberOfLines = readNumberOfLines();
    const shouldSortOnPlayers = sortOnPlayers();
    const shouldSortNewestFirst = sortNewestFirst();

    const dataToRender = data.toSorted((a, b) => {
        if (shouldSortOnPlayers && a.players !== b.players) {
            return b.players - a.players;
        }

        if (shouldSortNewestFirst) {
            return b.time - a.time;
        }

        return a.time - b.time;
    });

    dataToRender.slice(0, numberOfLines).forEach((item) => {
        const tr = document.createElement("tr");

        const tdDate = document.createElement("td");
        tdDate.innerHTML = item.time.toLocaleDateString();

        const tdTime = document.createElement("td");
        tdTime.innerHTML = item.time.toLocaleTimeString();

        const tdPlayers = document.createElement("td");
        tdPlayers.innerHTML = item.players;

        const tdMaxPlayers = document.createElement("td");
        tdMaxPlayers.innerHTML = item.maxplayers;

        tr.appendChild(tdDate);
        tr.appendChild(tdTime);
        tr.appendChild(tdPlayers);
        tr.appendChild(tdMaxPlayers);

        tableBody.appendChild(tr);
    });
};

const renderStartTime = () => {
    const startTime = document.querySelector("#start-time");
    startTime.innerHTML = new Date().toLocaleTimeString();
};

const readNumberOfLines = () => {
    const selectedRadio =
        document.querySelector('input[name="numberOfLines"]:checked');

    return Number(selectedRadio.value);
};

const sortOnPlayers = () => {
    return document.getElementById("value").checked;
};

const sortNewestFirst = () => {
    return document.getElementById("time-first").checked;
};

renderStartTime();
renderData();
setInterval(renderData, 5000);