import { LuArrowUpRight, LuBookmark, LuTrash2 } from "react-icons/lu";
import { getConceptById } from "../../data/concepts.js";
import { getPaletteById } from "../../data/palettes.js";
import LogoArtwork from "../logoArtwork/index.jsx";
import styles from "./styles.module.css";

const SavedConcepts = ({ items, onApply, onRequestRemove }) => (
    <section
        className={styles.savedConcepts}
        id="saved"
        aria-labelledby="saved-title"
    >
        <div className={styles.sectionHeading}>
            <div>
                <p>On this device</p>
                <h2 id="saved-title">Saved concepts</h2>
            </div>
            <span className={styles.savedCount}>
                <LuBookmark aria-hidden="true" /> {items.length} saved
            </span>
        </div>

        {items.length === 0 ? (
            <div className={styles.emptyState}>
                <LuBookmark aria-hidden="true" />
                <p>Save a direction you like and it will be waiting here.</p>
            </div>
        ) : (
            <div className={styles.savedGrid}>
                {items.map((item) => {
                    const concept = getConceptById(item.conceptId);
                    const palette = getPaletteById(item.paletteId);

                    if (!concept) {
                        return null;
                    }

                    return (
                        <article className={styles.savedCard} key={item.key}>
                            <div
                                className={styles.preview}
                                style={{ backgroundColor: palette.paper }}
                            >
                                <LogoArtwork
                                    concept={concept}
                                    brand={item.brand}
                                    palette={palette}
                                    typeStyle={item.typeStyle}
                                    layout={item.layout}
                                />
                            </div>
                            <div className={styles.savedCardBody}>
                                <div className={styles.savedCardText}>
                                    <strong>{item.brand.name}</strong>
                                    <span>
                                        {concept.name} · {concept.style}
                                    </span>
                                </div>
                                <span className={styles.paletteLabel}>
                                    <span
                                        style={{
                                            backgroundColor: palette.accent,
                                        }}
                                    />
                                    {palette.name}
                                </span>
                                <div className={styles.savedActions}>
                                    <button
                                        className={styles.applyButton}
                                        type="button"
                                        onClick={() => onApply(item)}
                                    >
                                        Apply to board{" "}
                                        <LuArrowUpRight aria-hidden="true" />
                                    </button>
                                    <button
                                        className={styles.removeButton}
                                        type="button"
                                        aria-label={`Remove ${item.brand.name}, ${concept.name} direction from saved concepts`}
                                        onClick={() => onRequestRemove(item)}
                                    >
                                        <LuTrash2 aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        )}
    </section>
);

export default SavedConcepts;
