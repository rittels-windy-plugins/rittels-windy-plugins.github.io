const converter = new showdown.Converter();

const url = (name) =>
    `https://raw.githubusercontent.com/rittels-windy-plugins/${name}/refs/heads/master/README.md`;

const $ = (e) => document.querySelector(e);

let active = 0;

const plugins = [
    {
        title: "About",
        name: "rittels-windy-plugins.github.io",
        vis: "public",
        router: "",
    },
    {
        title: "Flight Planner",
        name: "windy-plugin-fp",
        vis: "priv",
        router: "flight-planner",
    },
    {
        title: "Trajectory",
        name: "windy-plugin-traj",
        vis: "priv",
        router: "traj",
    },
    {
        title: "Multipicker",
        name: "windy-plugin-da",
        vis: "public",
        router: "multipicker",
    },
    {
        title: "Airspaces",
        name: "windy-plugin-airspaces",
        vis: "public",
        router: "airspaces",
    },
    {
        title: "Rings",
        name: "windy-plugin-rings",
        vis: "public",
        router: "rings",
    },
    {
        title: "Day-Night",
        name: "windy-plugin-day-night",
        vis: "public",
        router: "day-night",
    },
];

function show(router) {
    let p = plugins.find((plugin) => plugin.router == router);
    if (!p) p = plugins[0];
    fetch(
        `https://raw.githubusercontent.com/rittels-windy-plugins/${p.name}${p.vis == "priv" ? "-readme" : ""}/refs/heads/master/README.md`
    )
        .then((r) => r.text())
        .then((t) => {
            $("#scrollable").innerHTML = converter.makeHtml(t);
            $("#menu").classList.add("hidden");
        });
}

plugins.forEach((p, i) => {
    let div = document.createElement("div");
    div.classList.add("menu-item");
    div.innerHTML = p.title;
    $("#menu").appendChild(div);
    div.addEventListener("click", () => {
        show(p.router);
        window.history.pushState({}, "", i == 0 ? "/" : "/?" + p.router);
    });
});

window.onload = () => {
    let { search } = window.location;
    if (!search) show(plugins[0].router);
    else show(search.slice(1));
};

$("#contents").onclick = () => $("#menu").classList.add("hidden");

$("#menu-icon").addEventListener("click", (e) => {
    $("#menu").classList.toggle("hidden");
});

document.body.onscroll = (e) => {
    let d = $("#title-2");
    if (e.target.scrollingElement.scrollTop > 80) {
        d.innerHTML = plugins[active].title;
        d.style.color = "rgb(40,40,40)";
    } else {
        d.innerHTML = "by rittels";
        d.style.color = "black";
    }
};
