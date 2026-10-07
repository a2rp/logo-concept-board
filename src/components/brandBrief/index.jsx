import { LuArrowRight, LuSparkles } from "react-icons/lu";
import { industryOptions } from "../../data/concepts.js";
import styles from "./styles.module.css";

const BrandBrief = ({ brand, onBrandChange, onGenerate, buildCount }) => {
    const updateField = (field) => (event) => {
        onBrandChange({ ...brand, [field]: event.target.value });
    };

    return (
        <section className={styles.brief} id="brief" aria-labelledby="brief-title">
            <div className={styles.briefHeading}>
                <div>
                    <h2 id="brief-title">Start with a short brief</h2>
                    <p>Set the name and feel. You can change these any time.</p>
                </div>
                <span className={styles.stepLabel}>01 / 02</span>
            </div>

            <div className={styles.fields}>
                <label className={styles.field} htmlFor="brand-name">
                    <span>Brand name</span>
                    <input
                        id="brand-name"
                        autoComplete="off"
                        maxLength={32}
                        value={brand.name}
                        onChange={updateField("name")}
                        placeholder="e.g. Northstar"
                    />
                </label>

                <label className={styles.field} htmlFor="brand-tagline">
                    <span>Tagline</span>
                    <input
                        id="brand-tagline"
                        autoComplete="off"
                        maxLength={56}
                        value={brand.tagline}
                        onChange={updateField("tagline")}
                        placeholder="A few words, if you have them"
                    />
                </label>

                <label className={styles.field} htmlFor="brand-industry">
                    <span>Industry</span>
                    <select
                        id="brand-industry"
                        value={brand.industry}
                        onChange={updateField("industry")}
                    >
                        {industryOptions.map((industry) => (
                            <option key={industry} value={industry}>
                                {industry}
                            </option>
                        ))}
                    </select>
                </label>

                <button
                    className={styles.generateButton}
                    type="button"
                    onClick={onGenerate}
                    disabled={!brand.name.trim()}
                >
                    <LuSparkles aria-hidden="true" />
                    <span>{buildCount === 0 ? "Build directions" : "Try another set"}</span>
                    <LuArrowRight aria-hidden="true" />
                </button>
            </div>
            <p className={styles.helperText} aria-live="polite">
                Four distinct directions, shaped around your industry.
            </p>
        </section>
    );
};

export default BrandBrief;
