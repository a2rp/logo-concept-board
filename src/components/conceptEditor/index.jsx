import { LuBookmark, LuCheck, LuCopy, LuDownload } from "react-icons/lu";
import LogoArtwork from "../logoArtwork/index.jsx";
import { buildLogoSvg } from "../../utils/logoSvg.js";
import styles from "./styles.module.css";

const typeStyles = [
    { id: "modern", label: "Modern", sample: "Ag" },
    { id: "editorial", label: "Editorial", sample: "Ag" },
    { id: "geometric", label: "Geometric", sample: "Ag" },
];

const layouts = [
    { id: "horizontal", label: "Horizontal" },
    { id: "stacked", label: "Stacked" },
];

const ConceptEditor = ({
    concept,
    brand,
    palette,
    paletteOptions,
    typeStyle,
    layout,
    isSaved,
    status,
    onPaletteChange,
    onTypeStyleChange,
    onLayoutChange,
    onSave,
    onCopy,
    onDownload,
}) => {
    const svgMarkup = buildLogoSvg({
        concept,
        brand,
        palette,
        typeStyle,
        layout,
    });

    return (
        <section
            className={styles.conceptEditor}
            id="refine"
            aria-labelledby="refine-title"
        >
            <div className={styles.editorHeading}>
                <div>
                    <p>Refine your pick</p>
                    <h2 id="refine-title">{concept.name}</h2>
                </div>
                <span className={styles.directionStyle}>
                    {concept.style} direction
                </span>
            </div>

            <div className={styles.editorLayout}>
                <div className={styles.previewColumn}>
                    <div
                        className={styles.logoCanvas}
                        style={{ backgroundColor: palette.paper }}
                    >
                        <LogoArtwork
                            concept={concept}
                            brand={brand}
                            palette={palette}
                            typeStyle={typeStyle}
                            layout={layout}
                        />
                    </div>
                    <div className={styles.previewCaption}>
                        <span>Live logo preview</span>
                        <span>SVG · transparent background</span>
                    </div>
                    <details className={styles.codeDetails}>
                        <summary>View SVG markup</summary>
                        <pre>
                            <code>{svgMarkup}</code>
                        </pre>
                    </details>
                </div>

                <div className={styles.controlsColumn}>
                    <div className={styles.controlGroup}>
                        <h3>Color palette</h3>
                        <div
                            className={styles.paletteOptions}
                            role="group"
                            aria-label="Logo color palette"
                        >
                            {paletteOptions.map((option) => (
                                <button
                                    className={styles.paletteButton}
                                    key={option.id}
                                    type="button"
                                    aria-pressed={option.id === palette.id}
                                    aria-label={`Use the ${option.name} palette`}
                                    onClick={() => onPaletteChange(option.id)}
                                >
                                    <span
                                        style={{
                                            backgroundColor: option.accent,
                                        }}
                                    />
                                    <span>{option.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.controlGroup}>
                        <h3>Type style</h3>
                        <div
                            className={styles.typeOptions}
                            role="group"
                            aria-label="Logo type style"
                        >
                            {typeStyles.map((option) => (
                                <button
                                    className={
                                        typeStyle === option.id
                                            ? styles.typeButtonActive
                                            : styles.typeButton
                                    }
                                    key={option.id}
                                    type="button"
                                    aria-pressed={typeStyle === option.id}
                                    onClick={() => onTypeStyleChange(option.id)}
                                >
                                    <span
                                        className={`${styles.typeSample} ${styles[option.id]}`}
                                    >
                                        {option.sample}
                                    </span>
                                    <span>{option.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.controlGroup}>
                        <h3>Logo lockup</h3>
                        <div
                            className={styles.layoutOptions}
                            role="group"
                            aria-label="Logo layout"
                        >
                            {layouts.map((option) => (
                                <button
                                    className={
                                        layout === option.id
                                            ? styles.layoutButtonActive
                                            : styles.layoutButton
                                    }
                                    key={option.id}
                                    type="button"
                                    aria-pressed={layout === option.id}
                                    onClick={() => onLayoutChange(option.id)}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.editorActions}>
                        <button
                            className={styles.saveButton}
                            type="button"
                            onClick={onSave}
                            disabled={isSaved}
                        >
                            {isSaved ? (
                                <LuCheck aria-hidden="true" />
                            ) : (
                                <LuBookmark aria-hidden="true" />
                            )}
                            {isSaved ? "Saved to board" : "Save direction"}
                        </button>
                        <div className={styles.exportActions}>
                            <button
                                type="button"
                                onClick={() => onCopy(svgMarkup)}
                            >
                                <LuCopy aria-hidden="true" /> Copy SVG
                            </button>
                            <button
                                type="button"
                                onClick={() => onDownload(svgMarkup)}
                            >
                                <LuDownload aria-hidden="true" /> Download
                            </button>
                        </div>
                        <p
                            className={styles.statusMessage}
                            role="status"
                            aria-live="polite"
                        >
                            {status ||
                                "Changes update the preview immediately."}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConceptEditor;
