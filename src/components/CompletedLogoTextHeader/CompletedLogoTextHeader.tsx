import Image from 'next/image';
import React from 'react';

import Logo from '@/images/login-logo.svg';

import styles from './CompletedLogoTextHeader.module.scss';
import { CompletedLogoTextHeaderProps } from './type';
// 해당 페이지가 사라짐
// 안쓰는 중임
export const CompletedLogoTextHeader = ({ title, description }: CompletedLogoTextHeaderProps) => (
  <header className={styles.header}>
    <Image className={styles.headerLogo} src={Logo} alt="logo" />
    <h2 className={styles.headerTitle}>{title}</h2>
    <p className={styles.headerDescription}>{description}</p>
  </header>
);
