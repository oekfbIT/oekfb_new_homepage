import React from "react";
import { LegalDocumentPage } from "../LegalDocumentPage/LegalDocumentPage";

export const ElementRegeln = (): JSX.Element => {
    return (
        <LegalDocumentPage
            documentType="regeln"
            title="Unsere Spielregeln"
            intro="Unsere Spielregeln bilden die Grundlage für einen fairen und sicheren Spielbetrieb."
        />
    );
};
