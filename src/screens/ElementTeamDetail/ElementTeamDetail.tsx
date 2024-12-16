import React from "react";
import { useWindowWidth } from "../../breakpoints";
import { ActionButton } from "../../components/ActionButton";
import { FixtureDataCell } from "../../components/FixtureDataCell";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation"; // Unified component
import { NewsArticle } from "../../components/NewsArticle";
import { StatCell } from "../../components/StatCell";
import { TeamDetailSquad } from "../../components/TeamDetailSquad";
import "./style.css";

export const ElementTeamDetail = (): JSX.Element => {
    const screenWidth = useWindowWidth();

    return (
        <div
            className="element-team-detail"
            style={{
                minWidth: screenWidth < 1200 ? "390px" : "1200px",
                overflow: screenWidth < 1200 ? "hidden" : undefined,
            }}
        >
            {/* Unified Navigation Component */}
            <Navigation />

            {/* Page Content */}
            <div className="team-detail-top">
                <div className="team-detail">
                    <div className="team-detail-header">
                        <img
                            className="team-logo"
                            alt="FC Bayern München"
                            src="/img/image-9.png"
                        />
                        <div>
                            <h1>FC Bayern München</h1>
                            <p>Allianz Arena</p>
                        </div>
                    </div>
                    <div className="team-detail-nav">
                        <button>SQUAD</button>
                        <button>TABLE</button>
                        <button>FIXTURES & RESULTS</button>
                        <button>STATS</button>
                        <button>NEWS & VIDEOS</button>
                    </div>
                </div>
            </div>

            <div className="page-content">
                {/* Squad Section */}
                <section>
                    <h2>FC BAYERN MÜNCHEN SQUAD</h2>
                    <div className="team-squad">
                        <TeamDetailSquad property1="image" />
                        <TeamDetailSquad property1="no-image" />
                    </div>
                </section>

                {/* Stats Section */}
                <section>
                    <h2>FC BAYERN MÜNCHEN STATS</h2>
                    <div className="stats-grid">
                        <StatCell />
                        <StatCell />
                        <StatCell />
                    </div>
                </section>

                {/* Fixtures Section */}
                <section>
                    <h2>FIXTURES & RESULTS</h2>
                    <FixtureDataCell state="mobile" />
                </section>

                {/* News Section */}
                <section>
                    <h2>NEWS & SPIELBERICHTE</h2>
                    <div className="news-grid">
                        <NewsArticle />
                        <NewsArticle />
                    </div>
                </section>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};
