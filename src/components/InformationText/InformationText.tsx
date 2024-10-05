import Image from 'next/image';
import React from 'react';

import InformationIcon from '@/images/information-icon.svg';

import styles from './InformationText.module.scss';
import { InformationTextProps, InformationTextType } from './type';

export const InformationText = ({ text, type }: InformationTextProps) => {
  const getInformationTextTypeClassName = () => {
    switch (type) {
      case InformationTextType.primary:
      default:
        return styles.primary;
    }
  };

  return (
    <div className={styles.information}>
      <div className={`${styles.informationIcon} ${getInformationTextTypeClassName()}`}>
        <Image src={InformationIcon} alt="" />
      </div>
      <span className={styles.informationText}>{text}</span>
    </div>
  );
};
