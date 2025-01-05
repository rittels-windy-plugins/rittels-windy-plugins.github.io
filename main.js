const converter = new showdown.Converter();

const url = (name) =>
    `https://raw.githubusercontent.com/rittels-windy-plugins/${name}/refs/heads/master/README.md`;

const $ = (e) => document.querySelector(e);

const plugins = [
    { title: "About", name: "rittels-windy-plugins.github.io", vis: "public" },
    { title: "Flight Planner", name: "windy-plugin-fp", vis: "priv" },
    { title: "Trajectory", name: "windy-plugin-traj", vis: "priv" },
    { title: "Density Altitude", name: "windy-plugin-da", vis: "public" },
    { title: "Airspaces", name: "windy-plugin-airspaces", vis: "public" },
    { title: "Rings", name: "windy-plugin-rings", vis: "public" },
    { title: "Day-Night", name: "windy-plugin-day-night", vis: "public" },
];

plugins.forEach((p) => {
    let div = document.createElement("div");
    div.classList.add("menu-item");
    div.innerHTML = p.title;
    $("#menu").appendChild(div);
    div.onclick = () => {
        fetch(`https://raw.githubusercontent.com/rittels-windy-plugins/${p.name}${p.vis == "priv" ? "-readme" : ""}/refs/heads/master/README.md`)
            .then((r) => r.text())
            .then((t) => {
                $("#scrollable").innerHTML = converter.makeHtml(t);
                $("#menu").classList.add("hidden");
            });
    };
    p.div = div;
});

$("#contents").onclick = () => $("#menu").classList.add("hidden");

$("#menu-icon").addEventListener("click", e => { $("#menu").classList.toggle("hidden"); })

plugins[0].div.click();