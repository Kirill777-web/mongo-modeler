import React from 'react';
import classes from './footer.pod.module.css';
import { useCanvasViewSettingsContext } from '@/core/providers';

export const FooterComponent: React.FC = () => {
  const { filename } = useCanvasViewSettingsContext();

  const isNewDocument = () =>
    filename ? `File name: ${filename}` : 'New document';

  const documentName = isNewDocument();

  return (
    <>
      <span className={classes.footerText}>{documentName}</span>
    </>
  );
};
