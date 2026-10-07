import { buildLogoSvg } from "../../utils/logoSvg.js";
import styles from "./styles.module.css";

const LogoArtwork = ({
    concept,
    brand,
    palette,
    typeStyle = "modern",
    layout = concept.layout,
    className = "",
}) => {
    const svgMarkup = buildLogoSvg({
        concept,
        brand,
        palette,
        typeStyle,
        layout,
    });
    const imageLabel = `${brand.name || "Your Brand"}, ${concept.name} direction`;

    return (
        <div
            className={`${styles.logoArtwork} ${className}`.trim()}
            role="img"
            aria-label={imageLabel}
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
    );
};

export default LogoArtwork;
