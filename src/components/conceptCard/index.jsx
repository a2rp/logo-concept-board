import { LuArrowUpRight, LuCheck } from "react-icons/lu";
import LogoArtwork from "../logoArtwork/index.jsx";
import styles from "./styles.module.css";

const ConceptCard = ({
    concept,
    brand,
    palette,
    typeStyle,
    layout,
    isSelected,
    onSelect,
}) => (
    <article
        className={isSelected ? styles.selectedCard : styles.conceptCard}
        style={{ backgroundColor: palette.paper, color: palette.ink }}
    >
        <div className={styles.cardHeading}>
            <span className={styles.conceptNumber}>
                {String(concept.order).padStart(2, "0")}
            </span>
            <span className={styles.styleName}>{concept.style}</span>
            {isSelected && (
                <span className={styles.selectedLabel}>
                    <LuCheck aria-hidden="true" /> Selected
                </span>
            )}
        </div>
        <button
            className={styles.selectButton}
            type="button"
            aria-pressed={isSelected}
            aria-label={`Refine the ${concept.name} logo direction`}
            onClick={onSelect}
        >
            <span className={styles.artworkFrame}>
                <LogoArtwork
                    concept={concept}
                    brand={brand}
                    palette={palette}
                    typeStyle={typeStyle}
                    layout={layout ?? concept.layout}
                />
            </span>
            <span className={styles.cardCopy}>
                <span>
                    <strong>{concept.name}</strong>
                    <small>{concept.description}</small>
                </span>
                <span className={styles.refineLabel}>
                    Refine <LuArrowUpRight aria-hidden="true" />
                </span>
            </span>
        </button>
    </article>
);

export default ConceptCard;
