const converter = new showdown.Converter();

const url = (name) =>
    `https://raw.githubusercontent.com/rittels-windy-plugins/${name}/refs/heads/master/README.md`;

const $ = (e) => document.querySelector(e);

let active = 0;

const plugins = [
    { title: "About", name: "rittels-windy-plugins.github.io", vis: "public" },
    { title: "Flight Planner", name: "windy-plugin-fp", vis: "priv" },
    { title: "Trajectory", name: "windy-plugin-traj", vis: "priv" },
    { title: "Density Altitude", name: "windy-plugin-da", vis: "public" },
    { title: "Airspaces", name: "windy-plugin-airspaces", vis: "public" },
    { title: "Rings", name: "windy-plugin-rings", vis: "public" },
    { title: "Day-Night", name: "windy-plugin-day-night", vis: "public" },
];


plugins.forEach((p, i) => {
    let div = document.createElement("div");
    div.classList.add("menu-item");
    div.innerHTML = p.title;
    $("#menu").appendChild(div);
    div.onclick = () => {
        active = i;
        fetch(`https://raw.githubusercontent.com/rittels-windy-plugins/${p.name}${p.vis == "priv" ? "-readme" : ""}/refs/heads/master/README.md`)
            .then((r) => r.text())
            .then((t) => {
                $("#scrollable").innerHTML = converter.makeHtml(t);
                $("#menu").classList.add("hidden");
            });
    };
    p.div = div;
});

window.onload = () => {
    let { search } = window.location;
    if (search) {
        let searchTitles = plugins.map(({ title }) => title.toLowerCase().replace(" ", "-"))
        let ix = searchTitles.findIndex(t => t == search.slice(1));
        if (ix != -1) {
            plugins[ix].div.click();
        }
    }
}

$("#contents").onclick = () => $("#menu").classList.add("hidden");

$("#menu-icon").addEventListener("click", e => { $("#menu").classList.toggle("hidden"); })

document.body.onscroll = e => {
    let d = $("#title-2");
    if (e.target.scrollingElement.scrollTop > 80) {
        d.innerHTML = plugins[active].title;
        d.style.color = "red";
    } else {
        d.innerHTML = "by rittels";
        d.style.color = "black";
    }
}

plugins[0].div.click();