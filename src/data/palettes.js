export const paletteOptions = [
    { id: "citron", name: "Citron", accent: "#D7FA62", ink: "#25232A", paper: "#FBF8EF" },
    { id: "clay", name: "Clay", accent: "#FF8A68", ink: "#30231E", paper: "#FFF3EE" },
    { id: "iris", name: "Iris", accent: "#A9A0FF", ink: "#241F3A", paper: "#F5F2FF" },
    { id: "tide", name: "Tide", accent: "#8BD5EB", ink: "#1B3138", paper: "#F1FCFF" },
];

export const getPaletteById = (id) =>
    paletteOptions.find((palette) => palette.id === id) ?? paletteOptions[0];
