import React from "react";
import { LegalDocumentPage } from "../LegalDocumentPage/LegalDocumentPage";

export const ElementBund = (): JSX.Element => {
    return (
        <LegalDocumentPage
            documentType="bund"
            title="Unser Bund"
            intro="Erfahre mehr über unseren Bund und die Vision des Österreichischen Kleinfeld Fußball Bundes (ÖKFB)."
        />
    );
};
