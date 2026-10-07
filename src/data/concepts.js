const directionTemplates = {
    compass: {
        id: "compass",
        name: "True North",
        style: "Directional",
        description: "A clear point of view with room to explore.",
        shape: "compass",
        layout: "horizontal",
    },
    leaf: {
        id: "leaf",
        name: "Good Growth",
        style: "Organic",
        description: "Soft edges and an easy, human rhythm.",
        shape: "leaf",
        layout: "stacked",
    },
    ridge: {
        id: "ridge",
        name: "Highline",
        style: "Architectural",
        description: "A strong silhouette made from simple lines.",
        shape: "ridge",
        layout: "horizontal",
    },
    monogram: {
        id: "monogram",
        name: "First Mark",
        style: "Monogram",
        description: "A memorable initial, framed for easy recognition.",
        shape: "monogram",
        layout: "stacked",
    },
    orbit: {
        id: "orbit",
        name: "Orbit",
        style: "Modern",
        description: "An open circle that suggests connection and motion.",
        shape: "orbit",
        layout: "horizontal",
    },
    bloom: {
        id: "bloom",
        name: "New Season",
        style: "Expressive",
        description: "A lively symbol with an optimistic point of view.",
        shape: "bloom",
        layout: "stacked",
    },
    arch: {
        id: "arch",
        name: "Good Form",
        style: "Classic",
        description: "A steady frame paired with a confident wordmark.",
        shape: "arch",
        layout: "horizontal",
    },
    signal: {
        id: "signal",
        name: "Signal",
        style: "Geometric",
        description: "A bold, compact mark that reads at a glance.",
        shape: "signal",
        layout: "stacked",
    },
};

const conceptsByIndustry = {
    Outdoor: ["compass", "leaf", "ridge", "monogram"],
    "Food & drink": ["bloom", "arch", "monogram", "signal"],
    Wellness: ["bloom", "orbit", "leaf", "arch"],
    Technology: ["signal", "orbit", "ridge", "monogram"],
    "Creative studio": ["signal", "bloom", "arch", "orbit"],
    "Home & living": ["arch", "leaf", "monogram", "compass"],
};

export const industryOptions = Object.keys(conceptsByIndustry);

export const createConceptSet = (industry, revision = 0) => {
    const conceptIds = conceptsByIndustry[industry] ?? conceptsByIndustry.Outdoor;
    const offset = revision % conceptIds.length;
    const rotatedIds = [
        ...conceptIds.slice(offset),
        ...conceptIds.slice(0, offset),
    ];

    return rotatedIds.map((id, index) => ({
        ...directionTemplates[id],
        order: index + 1,
    }));
};

export const getConceptById = (id) => directionTemplates[id];
