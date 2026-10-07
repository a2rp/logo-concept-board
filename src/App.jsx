import { useEffect, useState } from "react";
import BrandBrief from "./components/brandBrief/index.jsx";
import ConceptCard from "./components/conceptCard/index.jsx";
import ConceptEditor from "./components/conceptEditor/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import { createConceptSet, getConceptById } from "./data/concepts.js";
import { getPaletteById, paletteOptions } from "./data/palettes.js";
import { makeSvgFilename } from "./utils/logoSvg.js";
import styles from "./App.module.css";

const savedStorageKey = "logo-concept-board-saved-directions";
const initialBrand = {
    name: "Wildroot",
    tagline: "Room to grow.",
    industry: "Outdoor",
};

const readSavedConcepts = () => {
    try {
        const parsed = JSON.parse(localStorage.getItem(savedStorageKey) || "[]");

        return Array.isArray(parsed)
            ? parsed.filter(
                  (item) =>
                      item &&
                      typeof item.key === "string" &&
                      getConceptById(item.conceptId) &&
                      typeof item.brand?.name === "string" &&
                      paletteOptions.some((palette) => palette.id === item.paletteId),
              )
            : [];
    } catch {
        return [];
    }
};

const App = () => {
    const [brand, setBrand] = useState(initialBrand);
    const [buildCount, setBuildCount] = useState(0);
    const [directions, setDirections] = useState(
        createConceptSet(initialBrand.industry),
    );
    const [selectedDirectionId, setSelectedDirectionId] = useState("compass");
    const [paletteId, setPaletteId] = useState("citron");
    const [typeStyle, setTypeStyle] = useState("modern");
    const [layout, setLayout] = useState("horizontal");
    const [savedItems, setSavedItems] = useState(readSavedConcepts);
    const [editorStatus, setEditorStatus] = useState("");
    const palette = getPaletteById(paletteId);
    const selectedDirection =
        directions.find((direction) => direction.id === selectedDirectionId) ??
        directions[0];

    useEffect(() => {
        try {
            localStorage.setItem(savedStorageKey, JSON.stringify(savedItems));
        } catch {
            return;
        }
    }, [savedItems]);

    const buildDirections = () => {
        const nextBuildCount = buildCount + 1;
        const nextDirections = createConceptSet(brand.industry, nextBuildCount);
        setDirections(nextDirections);
        setSelectedDirectionId(nextDirections[0].id);
        setLayout(nextDirections[0].layout);
        setBuildCount(nextBuildCount);
        setEditorStatus("");
    };

    const selectDirection = (direction) => {
        setSelectedDirectionId(direction.id);
        setLayout(direction.layout);
        setEditorStatus("");
    };

    const currentDirectionIsSaved = savedItems.some(
        (item) =>
            item.conceptId === selectedDirection.id &&
            item.brand.name === brand.name &&
            item.brand.tagline === brand.tagline &&
            item.paletteId === paletteId &&
            item.typeStyle === typeStyle &&
            item.layout === layout,
    );

    const saveDirection = () => {
        if (currentDirectionIsSaved) {
            return;
        }

        const savedDirection = {
            key: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            conceptId: selectedDirection.id,
            brand: { ...brand },
            paletteId,
            typeStyle,
            layout,
        };

        setSavedItems((currentItems) => [savedDirection, ...currentItems]);
        setEditorStatus("Direction saved on this device.");
    };

    const copySvg = async (svgMarkup) => {
        try {
            await navigator.clipboard.writeText(svgMarkup);
            setEditorStatus("SVG markup copied to the clipboard.");
        } catch {
            setEditorStatus("Clipboard unavailable. Use View SVG markup to copy it.");
        }
    };

    const downloadSvg = (svgMarkup) => {
        const file = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
        const fileUrl = URL.createObjectURL(file);
        const link = document.createElement("a");

        link.href = fileUrl;
        link.download = makeSvgFilename(brand.name, selectedDirection.name);
        document.body.append(link);
        link.click();
        link.remove();
        window.setTimeout(() => URL.revokeObjectURL(fileUrl), 0);
        setEditorStatus("SVG downloaded.");
    };

    const applySavedDirection = (item) => {
        const concept = getConceptById(item.conceptId);

        setBrand(item.brand);
        setDirections(createConceptSet(item.brand.industry));
        setSelectedDirectionId(concept.id);
        setPaletteId(item.paletteId);
        setTypeStyle(item.typeStyle);
        setLayout(item.layout);
        setEditorStatus("Saved direction restored to the board.");
        document.getElementById("refine")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className={styles.appShell}>
            <SiteHeader savedCount={savedItems.length} />
            <main className={styles.pageContent}>
                <section className={styles.hero} id="studio">
                    <p className={styles.label}>Logo concept board</p>
                    <h1>Give this brand a shape.</h1>
                    <p className={styles.description}>
                        Start with a few details. Compare four directions, refine
                        the right one, and take the SVG with you.
                    </p>
                </section>
                <BrandBrief
                    brand={brand}
                    onBrandChange={setBrand}
                    onGenerate={buildDirections}
                    buildCount={buildCount}
                />
                <section className={styles.section} id="directions">
                    <div className={styles.sectionHeading}>
                        <div>
                            <p className={styles.label}>02 / 02</p>
                            <h2>Four directions to explore</h2>
                        </div>
                        <span className={styles.directionCount}>
                            {directions.length} concepts
                        </span>
                    </div>
                    <div className={styles.directionsGrid}>
                        {directions.map((direction) => (
                            <ConceptCard
                                key={direction.id}
                                concept={direction}
                                brand={brand}
                                palette={palette}
                                typeStyle={typeStyle}
                                layout={
                                    direction.id === selectedDirectionId
                                        ? layout
                                        : undefined
                                }
                                isSelected={selectedDirectionId === direction.id}
                                onSelect={() => selectDirection(direction)}
                            />
                        ))}
                    </div>
                    <ConceptEditor
                        concept={selectedDirection}
                        brand={brand}
                        palette={palette}
                        paletteOptions={paletteOptions}
                        typeStyle={typeStyle}
                        layout={layout}
                        isSaved={currentDirectionIsSaved}
                        status={editorStatus}
                        onPaletteChange={setPaletteId}
                        onTypeStyleChange={setTypeStyle}
                        onLayoutChange={setLayout}
                        onSave={saveDirection}
                        onCopy={copySvg}
                        onDownload={downloadSvg}
                    />
                </section>
                <section className={styles.section} id="saved">
                    <div className={styles.sectionHeading}>
                        <div>
                            <p className={styles.label}>On this device</p>
                            <h2>Saved concepts</h2>
                        </div>
                        <span className={styles.directionCount}>
                            {savedItems.length} saved
                        </span>
                    </div>
                    {savedItems.length === 0 ? (
                        <p className={styles.emptySaved}>
                            Save a direction you like and it will be waiting here.
                        </p>
                    ) : (
                        <div className={styles.savedList}>
                            {savedItems.map((item) => {
                                const concept = getConceptById(item.conceptId);
                                const itemPalette = getPaletteById(item.paletteId);

                                return (
                                    <article className={styles.savedItem} key={item.key}>
                                        <div>
                                            <strong>{item.brand.name}</strong>
                                            <span>{concept.name} · {concept.style}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => applySavedDirection(item)}
                                        >
                                            Apply
                                        </button>
                                        <span
                                            className={styles.savedSwatch}
                                            style={{ backgroundColor: itemPalette.accent }}
                                            aria-label={`${itemPalette.name} palette`}
                                        />
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>
                <section className={styles.section} id="guide">
                    <div className={styles.sectionHeading}>
                        <div>
                            <p className={styles.label}>A simple workflow</p>
                            <h2>How to use the board</h2>
                        </div>
                    </div>
                    <ol className={styles.guideSteps}>
                        <li><strong>01</strong><span>Enter the brand name, tagline, and industry.</span></li>
                        <li><strong>02</strong><span>Compare four different logo directions and choose one to refine.</span></li>
                        <li><strong>03</strong><span>Adjust color, type, or lockup, then save or export the SVG.</span></li>
                    </ol>
                </section>
            </main>
        </div>
    );
};

export default App;
