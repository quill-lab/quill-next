import React, { KeyboardEvent, useState } from 'react';

import styles from './Select.module.scss';
import { SelectProps } from './type';

export const Select = ({ selectedItem, options, handleSelectedItem }: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    handleSelectedItem(item);
    setIsOpen(false);
  };

  const handleIsOpenKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleIsOpen();
    }
  };

  const handleOptionKeyDown = (e: KeyboardEvent<HTMLDivElement>, item: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleItemClick(item);
    }
  };

  return (
    <div className={`${styles.selectContainer}`}>
      <div
        role="button"
        className={`${styles.selectItem} ${isOpen ? styles.active : ''}`}
        tabIndex={isOpen ? -1 : 0}
        onClick={handleIsOpen}
        onKeyDown={handleIsOpenKeyDown}
      >
        <span>{selectedItem || 'Select an option'}</span>
        <span>▼</span>
      </div>
      {isOpen && (
        <ul className={styles.selectDropdown}>
          {options.map((item: string) => (
            <li key={`select-${item}`} className={styles.selectDropdownItem}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleItemClick(item)}
                onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => handleOptionKeyDown(e, item)}
              >
                {item}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
