import styles from "./App.module.css";

const App = () => (
    <div className={styles.appShell}>
        <main className={styles.pageContent}>
            <p className={styles.label}>Logo Concept Board</p>
            <h1>Give this brand a shape.</h1>
            <p className={styles.description}>
                Explore logo directions, refine a favorite, and export a clean SVG.
            </p>
        </main>
    </div>
);

export default App;
