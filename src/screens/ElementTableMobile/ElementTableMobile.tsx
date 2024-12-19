import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { PageHeader } from "../../components/PageHeader";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import "./style.css";
import { Navigation } from "../../components/Navigation";
import ClientController from "../../network/ClientController";
import AuthService from "../../network/AuthService";

export const ElementTableMobile = (): JSX.Element => {
    const screenWidth = useWindowWidth();
    const isMobile = screenWidth < 900;
    const authService = new AuthService();
    const clientController = new ClientController();
    const [table, setTable] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTable = async () => {
            const leagueCode = authService.getLeagueCode();
            if (!leagueCode) {
                console.error("No league code found in cookies.");
                setLoading(false);
                return;
            }

            try {
                const tableData = await clientController.fetchTable(leagueCode);
                setTable(tableData);
            } catch (error) {
                console.error("Error fetching table data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTable();
    }, []);

    return (
        <div
            className="element-table-mobile"
            style={{ minWidth: isMobile ? "390px" : "900px" }}
        >
            {isMobile ? (
                <>
                    <Navigation />
                    <div className="league-table">
                        <div className="league-table-wrapper" style={{paddingTop: "30px", paddingBottom: "30px"}}>
                            <div className="league-table-2">
                                <PageHeader className="instance-node-5" text="Tabelle" />
                                <div className="container-2">
                                    <div className="div-wrapper-2">
                                        <div className="table">
                                            <header className="row-wrapper">
                                                <div className="row">
                                                    <div className="filler" style={{minWidth: "140px"}}>
                                                        <div className="text-wrapper-25"></div>
                                                    </div>
                                                    <div className="cell">
                                                        <div className="text-wrapper-25">M</div>
                                                    </div>
                                                    <div className="cell-2">
                                                        <div className="text-wrapper-26">W</div>
                                                    </div>
                                                    <div className="cell-3">
                                                        <div className="text-wrapper-27">D</div>
                                                    </div>
                                                    <div className="cell-4">
                                                        <div className="text-wrapper-28">L</div>
                                                    </div>
                                                    <div className="cell-5">
                                                        <div className="text-wrapper-29">G</div>
                                                    </div>
                                                    <div className="cell-6">
                                                        <div className="text-wrapper-30">P</div>
                                                    </div>
                                                </div>
                                            </header>

                                            <div className="body">
                                                {loading ? (
                                                    <div>Loading...</div>
                                                ) : (
                                                    table.map((team) => (
                                                        <div className="row-2" key={team.id}>
                                                            <div className="data" />
                                                            <div className="data-2">
                                                                <div className="text-wrapper-31">
                                                                    {team.ranking}
                                                                </div>
                                                            </div>
                                                            <img
                                                                className="data-3"
                                                                alt={team.name}
                                                                src={team.image}
                                                            />
                                                            <div className="container-wrapper">
                                                                <div className="container-3">
                                                                    <div className="text-wrapper-32">
                                                                        {team.shortName || team.name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="data-4">
                                                                <div className="text-wrapper-33">
                                                                    {team.wins + team.draws + team.losses}
                                                                </div>
                                                            </div>
                                                            <div className="data-5">
                                                                <div className="text-wrapper-34">{team.wins}</div>
                                                            </div>
                                                            <div className="data-6">
                                                                <div className="text-wrapper-34">{team.draws}</div>
                                                            </div>
                                                            <div className="data-7">
                                                                <div className="text-wrapper-34">{team.losses}</div>
                                                            </div>
                                                            <div className="data-8">
                                                                <div className="text-wrapper-35">
                                                                    {team.scored}:{team.against}
                                                                </div>
                                                            </div>
                                                            <div className="data-9">
                                                                <div className="text-wrapper-36">{team.points}</div>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-legend">
                                        <div className="list-2">
                                            <div className="legend-wrapper">
                                                <div className="legend">LEGEND</div>
                                            </div>

                                            <div className="overlap">
                                                <div className="item-4">
                                                    <p className="m-matches">
                                                        <span className="text-wrapper-49">M </span>
                                                        <span className="text-wrapper-50">Matches</span>
                                                    </p>
                                                </div>

                                                <div className="item-5">
                                                    <p className="goal-difference">
                                                        <span className="text-wrapper-49">+/- </span>
                                                        <span className="text-wrapper-50">Goal Difference</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="overlap-group">
                                                <div className="item-4">
                                                    <p className="w-won">
                                                        <span className="text-wrapper-49">W </span>
                                                        <span className="text-wrapper-50">Won</span>
                                                    </p>
                                                </div>

                                                <div className="item-5">
                                                    <p className="p-points">
                                                        <span className="text-wrapper-49">P </span>
                                                        <span className="text-wrapper-50">Points</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="overlap-group-2">
                                                <div className="item-4">
                                                    <p className="d-draw">
                                                        <span className="text-wrapper-49">D </span>
                                                        <span className="text-wrapper-50">Draw</span>
                                                    </p>
                                                </div>

                                                <div className="item-5">
                                                    <p className="g-goals">
                                                        <span className="text-wrapper-49">G </span>
                                                        <span className="text-wrapper-50">Goals</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="l-lost-wrapper">
                                                <p className="l-lost">
                                                    <span className="text-wrapper-49">L </span>
                                                    <span className="text-wrapper-50">Lost</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Footer
                        className="footer-7"
                        footerContent="/img/footer-content-wrapper-left-logo-13.png"
                        footerContentClassNameOverride="footer-8"
                        href="https://www.facebook.com/kleinfeldliga/"
                        href1="https://www.youtube.com/@OEKFB"
                        href2="https://www.instagram.com/oekfb/?hl=en"
                        img="/img/link-54.svg"
                        link="/img/link-52.svg"
                        link1="/img/link-55.svg"
                        link2="/img/link-56.svg"
                    />
                </>
            ) : (
                <>
                    <DesktopNav />
                    <div className="content-frame">
                        <div className="page-content-wrapper">
                            <div className="page-content-5">
                                <PageHeader className="instance-node-5" text="Tabelle" />
                                <div className="div-wrapper-2">
                                    <div className="league-table-content">
                                        <div className="row-wrapper">
                                            <div className="row-4">
                                                <div className="cell-7">
                                                    <div className="text-wrapper-51">Matches</div>
                                                </div>
                                                <div className="cell-8">
                                                    <div className="text-wrapper-26">W</div>
                                                </div>
                                                <div className="cell-9">
                                                    <div className="text-wrapper-27">D</div>
                                                </div>
                                                <div className="cell-10">
                                                    <div className="text-wrapper-28">L</div>
                                                </div>
                                                <div className="cell-11">
                                                    <div className="text-wrapper-52">Tore</div>
                                                </div>
                                                <div className="cell-12">
                                                    <div className="text-wrapper-53">+/-</div>
                                                </div>
                                                <div className="cell-13">
                                                    <div className="text-wrapper-54">Punkte</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="league-table-cells">
                                            {loading ? (
                                                <div>Loading...</div>
                                            ) : (
                                                table.map((team) => (
                                                    <div className="row-5" key={team.id}>
                                                        <div className="data-20">
                                                            <div className="text-wrapper-55">
                                                                {team.ranking}
                                                            </div>
                                                        </div>
                                                        <div className="data-30">
                                                            <img
                                                                className="mask-group"
                                                                alt={team.name}
                                                                src={team.image}
                                                            />
                                                        </div>
                                                        <div className="data-22">
                                                            <div className="container-4">
                                                                <div className="text-wrapper-56">
                                                                    {team.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="data-23">
                                                            <div className="text-wrapper-57">
                                                                {team.wins + team.draws + team.losses}
                                                            </div>
                                                        </div>
                                                        <div className="data-24">
                                                            <div className="text-wrapper-58">
                                                                {team.wins}
                                                            </div>
                                                        </div>
                                                        <div className="data-25">
                                                            <div className="text-wrapper-58">
                                                                {team.draws}
                                                            </div>
                                                        </div>
                                                        <div className="data-26">
                                                            <div className="text-wrapper-59">
                                                                {team.losses}
                                                            </div>
                                                        </div>
                                                        <div className="data-27">
                                                            <div className="text-wrapper-60">
                                                                {team.scored}:{team.against}
                                                            </div>
                                                        </div>
                                                        <div className="data-28">
                                                            <div className="text-wrapper-61">
                                                                {team.difference > 0
                                                                    ? `+${team.difference}`
                                                                    : team.difference}
                                                            </div>
                                                        </div>
                                                        <div className="data-29">
                                                            <div className="text-wrapper-62">
                                                                {team.points}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <Footer />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
