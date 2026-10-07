import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { LuArrowUpRight, LuMenu, LuSparkles, LuX } from "react-icons/lu";
import styles from "./styles.module.css";

const navigation = [
    { label: "Brief", href: "#brief" },
    { label: "Directions", href: "#directions" },
    { label: "Saved", href: "#saved" },
    { label: "Guide", href: "#guide" },
];

const SiteHeader = ({ savedCount = 0 }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        const closeOnOutsideClick = (event) => {
            if (!headerRef.current?.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        const closeOnEscape = (event) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);

        return () => {
            document.removeEventListener("pointerdown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={styles.siteHeader} ref={headerRef}>
            <div className={styles.headerInner}>
                <a className={styles.brand} href="#studio" onClick={closeMenu}>
                    <span className={styles.brandMark}>
                        <LuSparkles aria-hidden="true" />
                    </span>
                    <span className={styles.brandName}>
                        <strong>Markboard</strong>
                        <small>Logo concept studio</small>
                    </span>
                </a>

                <nav
                    className={menuOpen ? styles.navigationOpen : styles.navigation}
                    id="header-navigation"
                    aria-label="Main navigation"
                >
                    {navigation.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={closeMenu}
                        >
                            {item.label}
                            {item.label === "Saved" && savedCount > 0 && (
                                <span className={styles.savedCount}>
                                    {savedCount}
                                </span>
                            )}
                        </a>
                    ))}
                </nav>

                <a
                    className={styles.repositoryLink}
                    href="https://github.com/a2rp/logo-concept-board"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaGithub aria-hidden="true" />
                    <span>Repository</span>
                    <LuArrowUpRight aria-hidden="true" />
                </a>

                <button
                    className={styles.menuButton}
                    type="button"
                    aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                    aria-expanded={menuOpen}
                    aria-controls="header-navigation"
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    {menuOpen ? (
                        <LuX aria-hidden="true" />
                    ) : (
                        <LuMenu aria-hidden="true" />
                    )}
                </button>
            </div>
        </header>
    );
};

export default SiteHeader;
