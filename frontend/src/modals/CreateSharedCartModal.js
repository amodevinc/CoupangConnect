import React, { useState } from 'react';
import styles from '../css/CreateSharedCartModal.module.css';

const CreateSharedCartModal = ({ onClose, onCreateCart }) => {
  const [name, setName] = useState('');
  const [theme, setTheme] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateCart(name, theme);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Create Shared Cart</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="theme" className={styles.label}>Theme</label>
            <input
              type="text"
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.createButton}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSharedCartModal;