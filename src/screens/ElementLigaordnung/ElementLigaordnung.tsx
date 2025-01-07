import React, { useRef } from "react";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import { ParagraphWrapper } from "../../components/ParagraphWrapper";
import "./style.css";
import { useWindowWidth } from "../../breakpoints";
import data from "../../data/ligaordnung.json";

export const ElementLigaordnung = (): JSX.Element => {
    const screenWidth = useWindowWidth();
    const isMobile = screenWidth < 900;

    const refs = data.reduce((acc, value, index) => {
        acc[index] = React.createRef<HTMLDivElement>();
        return acc;
    }, {} as { [key: number]: React.RefObject<HTMLDivElement> });

    const handleScroll = (index: number) => {
        refs[index].current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="element-ligaordnung">
            {isMobile ? <Navigation /> : <DesktopNav />}

            <div className="content-frame">
                <div className="page-content">
                    <div className="terms">
                        <div className="terms-header-wrapper">
                            <p className="title-3">Unsere Ligaordnung</p>
                            <div className="div-wrapper-2">
                                <p className="text-wrapper-13">
                                    Das sind unsere Ligaordnung und regeln zu einem positiven
                                    spielverhältnis.
                                </p>
                            </div>
                        </div>

                        {/* Table of Contents */}
                        <div className="table-of-contents">
                            <ul className="toc-list">
                                {data.map((item, index) => (
                                    <li key={index}>
                                        <button
                                            className="toc-link"
                                            onClick={() => handleScroll(index)}
                                        >
                                            {item.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Content with Section Anchors */}
                        {data.map((item, index) => (
                            <div key={index} ref={refs[index]} className="paragraph-section">
                                <ParagraphWrapper
                                    className="custom-class"
                                    title={item.title}
                                    content={item.content}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
