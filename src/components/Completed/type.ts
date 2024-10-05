import React from 'react';

export interface CompletedProps {
  children: React.ReactNode;
  leftButtonLabel: string;
  rightButtonLabel: string;
  leftButtonDescription?: string;
  rightButtonDescription?: string;
  handleLeftButton: () => void;
  handleRightButton: () => void;
}
