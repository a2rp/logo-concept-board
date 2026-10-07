import { useState } from "react";
import BrandBrief from "./components/brandBrief/index.jsx";
import ConceptCard from "./components/conceptCard/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import { createConceptSet } from "./data/concepts.js";
import { paletteOptions } from "./data/palettes.js";
import styles from "./App.module.css";

const initialBrand = {
    name: "Wildroot",
    tagline: "Room to grow.",
    industry: "Outdoor",
};

const App = () => {
    const [brand, setBrand] = useState(initialBrand);
    const [buildCount, setBuildCount] = useState(0);
    const [directions, setDirections] = useState(
        createConceptSet(initialBrand.industry),
    );
    const [selectedDirectionId, setSelectedDirectionId] = useState("compass");

    const buildDirections = () => {
        const nextBuildCount = buildCount + 1;
        const nextDirections = createConceptSet(brand.industry, nextBuildCount);
        setDirections(nextDirections);
        setSelectedDirectionId(nextDirections[0].id);
        setBuildCount(nextBuildCount);
    };

    return (
        <div className={styles.appShell}>
            <SiteHeader />
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
                                palette={paletteOptions[0]}
                                typeStyle="modern"
                                isSelected={selectedDirectionId === direction.id}
                                onSelect={() => setSelectedDirectionId(direction.id)}
                            />
                        ))}
                    </div>
                </section>
                <section className={styles.section} id="saved">
                    <h2>Saved concepts</h2>
                </section>
                <section className={styles.section} id="guide">
                    <h2>How to use the board</h2>
                </section>
            </main>
        </div>
    );
};

export default App;
