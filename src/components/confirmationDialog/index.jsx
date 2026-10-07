import { useEffect, useRef } from "react";
import { LuX } from "react-icons/lu";
import styles from "./styles.module.css";

const ConfirmationDialog = ({
    title,
    description,
    confirmLabel = "Remove direction",
    onConfirm,
    onCancel,
}) => {
    const dialogRef = useRef(null);
    const cancelRef = useRef(null);

    useEffect(() => {
        cancelRef.current?.focus();

        const closeOnEscape = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onCancel();
            }
        };

        document.addEventListener("keydown", closeOnEscape);
        return () => document.removeEventListener("keydown", closeOnEscape);
    }, [onCancel]);

    const keepFocusInside = (event) => {
        if (event.key !== "Tab") {
            return;
        }

        const focusable = dialogRef.current?.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

        if (!focusable?.length) {
            return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    };

    return (
        <div
            className={styles.backdrop}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onCancel();
                }
            }}
        >
            <div
                className={styles.dialog}
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-title"
                aria-describedby="confirm-description"
                onKeyDown={keepFocusInside}
            >
                <button
                    className={styles.closeButton}
                    type="button"
                    aria-label="Cancel and close dialog"
                    onClick={onCancel}
                >
                    <LuX aria-hidden="true" />
                </button>
                <h2 id="confirm-title">{title}</h2>
                <p id="confirm-description">{description}</p>
                <div className={styles.actions}>
                    <button
                        className={styles.cancelButton}
                        type="button"
                        ref={cancelRef}
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className={styles.confirmButton}
                        type="button"
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
