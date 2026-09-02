import React from "react";
import { LegalDocumentPage } from "../LegalDocumentPage/LegalDocumentPage";

export const ElementLigaordnung = (): JSX.Element => {
  return (
    <LegalDocumentPage
      documentType="ligaordnung"
      title="Unsere Ligaordnung"
      intro="Unsere Ligaordnung schafft klare und faire Rahmenbedingungen für einen positiven Spielbetrieb."
    />
  );
};
