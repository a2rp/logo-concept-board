const escapeXml = (value) =>
    String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

const fontFamilies = {
    modern: "Arial, Helvetica, sans-serif",
    editorial: "Georgia, 'Times New Roman', serif",
    geometric: "'Trebuchet MS', Arial, sans-serif",
};

const getMark = (shape, brand, palette) => {
    const { accent, ink } = palette;

    switch (shape) {
        case "compass":
            return `<circle cx="38" cy="38" r="33" fill="${accent}"/><path d="m38 12 9 29-9-7-9 7 9-29Z" fill="${ink}"/><path d="m38 64-7-20 7 5 7-5-7 20Z" fill="${ink}"/>`;
        case "leaf":
            return `<path d="M67 9C32 9 10 25 10 49c0 13 9 21 22 21 24 0 35-23 35-61Z" fill="${accent}" stroke="${ink}" stroke-linejoin="round" stroke-width="3"/><path d="M15 63c13-17 28-28 47-39" fill="none" stroke="${ink}" stroke-linecap="round" stroke-width="3"/>`;
        case "ridge":
            return `<path d="m7 65 22-34 12 17 10-14 20 31H7Z" fill="${accent}" stroke="${ink}" stroke-linejoin="round" stroke-width="3"/><path d="M7 65h64" stroke="${ink}" stroke-linecap="round" stroke-width="3"/><circle cx="56" cy="20" r="7" fill="${ink}"/>`;
        case "monogram": {
            const initial = escapeXml((brand.name || "M").trim().charAt(0).toUpperCase());
            return `<rect x="7" y="7" width="62" height="62" rx="18" fill="${accent}"/><text x="38" y="52" fill="${ink}" font-family="${fontFamilies.editorial}" font-size="43" font-weight="700" text-anchor="middle">${initial}</text>`;
        }
        case "orbit":
            return `<circle cx="38" cy="38" r="27" fill="none" stroke="${ink}" stroke-width="4"/><ellipse cx="38" cy="38" rx="36" ry="15" fill="none" stroke="${accent}" stroke-width="7" transform="rotate(-38 38 38)"/><circle cx="60" cy="18" r="7" fill="${ink}"/>`;
        case "bloom":
            return `<g fill="${accent}" stroke="${ink}" stroke-width="2.5"><ellipse cx="38" cy="21" rx="10" ry="18"/><ellipse cx="38" cy="21" rx="10" ry="18" transform="rotate(60 38 38)"/><ellipse cx="38" cy="21" rx="10" ry="18" transform="rotate(120 38 38)"/></g><circle cx="38" cy="38" r="7" fill="${ink}"/>`;
        case "arch":
            return `<path d="M10 68V39a28 28 0 0 1 56 0v29H10Z" fill="${accent}" stroke="${ink}" stroke-linejoin="round" stroke-width="4"/><path d="M25 68V41a13 13 0 0 1 26 0v27" fill="none" stroke="${ink}" stroke-width="4"/>`;
        case "signal":
            return `<path d="M10 57a40 40 0 0 1 56 0M19 47a27 27 0 0 1 38 0M29 37a13 13 0 0 1 18 0" fill="none" stroke="${ink}" stroke-linecap="round" stroke-width="6"/><circle cx="38" cy="63" r="7" fill="${accent}" stroke="${ink}" stroke-width="3"/>`;
        default:
            return `<circle cx="38" cy="38" r="30" fill="${accent}"/>`;
    }
};

export const buildLogoSvg = ({
    concept,
    brand,
    palette,
    typeStyle = "modern",
    layout = concept.layout,
}) => {
    const isStacked = layout === "stacked";
    const viewBox = isStacked ? "0 0 320 224" : "0 0 520 160";
    const shapeTransform = isStacked
        ? "translate(122 10) scale(0.92)"
        : "translate(34 42) scale(1)";
    const name = escapeXml(brand.name || "Your Brand");
    const tagline = escapeXml(brand.tagline || "");
    const title = escapeXml(`${brand.name || "Your Brand"} - ${concept.name}`);
    const font = fontFamilies[typeStyle] ?? fontFamilies.modern;
    const wordmarkSize = Math.min(
        isStacked ? 28 : 36,
        Math.max(isStacked ? 13 : 16, (isStacked ? 270 : 355) / (name.length * 0.62)),
    );
    const wordmarkX = isStacked ? 160 : 130;
    const wordmarkY = isStacked ? 147 : 74;
    const taglineX = isStacked ? 160 : 132;
    const taglineY = isStacked ? 174 : 102;
    const textAnchor = isStacked ? "middle" : "start";
    const taglineSize = Math.min(
        isStacked ? 12 : 14,
        Math.max(8, (isStacked ? 270 : 375) / (tagline.length * 0.58 || 1)),
    );
    const taglineMarkup = tagline
        ? `<text x="${taglineX}" y="${taglineY}" fill="${palette.ink}" font-family="${fontFamilies.modern}" font-size="${taglineSize}" letter-spacing="0.4" opacity="0.72" text-anchor="${textAnchor}">${tagline}</text>`
        : "";

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><title>${title}</title><g transform="${shapeTransform}">${getMark(concept.shape, brand, palette)}</g><text x="${wordmarkX}" y="${wordmarkY}" fill="${palette.ink}" font-family="${font}" font-size="${wordmarkSize}" font-weight="700" letter-spacing="-1.2" text-anchor="${textAnchor}">${name}</text>${taglineMarkup}</svg>`;
};

export const makeSvgFilename = (brandName, conceptName) => {
    const cleanName = `${brandName}-${conceptName}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    return `${cleanName || "logo-concept"}.svg`;
};
