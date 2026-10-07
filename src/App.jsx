import styles from "./App.module.css";
import SiteHeader from "./components/siteHeader/index.jsx";

const App = () => (
    <div className={styles.appShell}>
        <SiteHeader />
        <main className={styles.pageContent}>
            <section id="studio">
                <p className={styles.label}>Logo Concept Board</p>
                <h1>Give this brand a shape.</h1>
                <p className={styles.description}>
                    Explore logo directions, refine a favorite, and export a clean SVG.
                </p>
            </section>
            <section className={styles.section} id="brief">
                <h2>Your brief</h2>
            </section>
            <section className={styles.section} id="directions">
                <h2>Logo directions</h2>
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

export default App;
