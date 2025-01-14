import React from "react";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import { ParagraphWrapper } from "../../components/ParagraphWrapper";
import { useWindowWidth } from "../../breakpoints";
import "./style.css";

export const ElementBund = (): JSX.Element => {
    const screenWidth = useWindowWidth();
    const isMobile = screenWidth < 900;

    return (
        <div className="element-ligaordnung">
            {isMobile ? <Navigation /> : <DesktopNav />}

            <div className="content-frame">
                <div className="page-content">
                    <div className="terms">
                        <div className="terms-header-wrapper">
                            <p className="title-3">Unser Bund</p>
                            <div className="div-wrapper-2">
                                <p className="text-wrapper-13">
                                    Erfahre mehr über useren Bund und die Vision des
                                    österreichischen Kleinfeldfußballverbands (ÖKFB).
                                </p>
                            </div>
                        </div>

                        <ParagraphWrapper
                            className="custom-class"
                            title="Was ist Kleinfeldfußball?"
                            content={`Kleinfeldfußball ist eine Variante des klassischen Fußballs, die sich durch angepasste Spielfeldgrößen, kleinere Mannschaften und ein schnelleres Spieltempo auszeichnet. Die Kompaktheit des Spiels stellt die technischen, taktischen und konditionellen Fähigkeiten der Spieler in den Vordergrund.`}
                        />

                        <ParagraphWrapper
                            className="custom-class"
                            title="Charakteristika des Kleinfeldfußballs"
                            content={`1. Spielfeldgröße:\n   • rd. 45 x 25 Meter (variabel je Spielort).\n   • Markierungen für Strafraum, Mittelkreis und Spielfeldgrenzen angepasst an die Spielfeldgröße.\n\n2. Spieleranzahl:\n   • Üblicherweise 6 gegen 6 (5 Feldspieler + Torwart).\n   • Wechselspieler unbegrenzt erlaubt, mit fliegendem Wechsel.\n\n3. Spielzeit:\n   • 2 x 25 Minuten`}
                        />

                        <ParagraphWrapper
                            className="custom-class"
                            title="Der ÖKFB"
                            content={`1. Nationale Ligen und Turniere\n   • Organisation und Durchführung von regionalen Ligen in allen österreichischen Bundesländern.\n   • Meistercup: Jährliches Highlight, bei dem die besten Teams Österreichs um den Titel kämpfen.\n   • Förderung von Talent- und Breitenfußball auf Kleinfeldebene.\n\n2. Internationale Anbindung\n   • Mitglied der European Minifootball Federation (EMF) und der World Minifootball Federation (WMF).\n   • Teilnahme österreichischer Teams bzw. Spieler an internationalen Wettbewerben wie:\n     o EMF Champions League.\n     o Minifootball-Europameisterschaften.\n     o WMF-Weltmeisterschaften.\n\n3. Fokus auf Taktik und Technik\n   • Schnelle Spielzüge und enge Räume erfordern präzises Passspiel und geschicktes Stellungsspiel.\n   • Individuelle Technik wie Ballkontrolle, Dribbling und schnelle Abschlüsse wird stark gefordert.\n   • Taktisches Verständnis: Effektive Verteidigungsarbeit und koordinierte Angriffe sind entscheidend für den Erfolg.`}
                        />

                        <ParagraphWrapper
                            className="custom-class"
                            title="Warum Kleinfeldfußball?"
                            content={`• Attraktivität des Spiels: Durch den reduzierten Raum und die kleinere Spieleranzahl kommt jeder Spieler häufiger an den Ball und ist aktiver ins Spielgeschehen eingebunden.\n• Konditionelle Herausforderung: Der ständige Wechsel zwischen Offensive und Defensive sowie das hohe Spieltempo fördern die Ausdauer und Reaktionsschnelligkeit.\n• Teamorientiert: Erfolgreiches Spielen erfordert Kommunikation, Zusammenarbeit und eine klare taktische Ausrichtung.\n• Flexibilität: Perfekt für Hobbymannschaften und ambitionierte Spieler, die nicht regelmäßig auf Großfeld spielen möchten.`}
                        />

                        <ParagraphWrapper
                            className="custom-class"
                            title="Unsere Vision und Mission"
                            content={`Der ÖKFB setzt sich dafür ein, den Kleinfeldfußball in Österreich als eigenständige, anerkannte und beliebte Fußballvariante zu etablieren. Unser Ziel ist es, den Sport durch professionelle Organisation, hochklassige Wettbewerbe und die Förderung junger Talente weiterzuentwickeln.`}
                        />

                        <ParagraphWrapper
                            className="custom-class"
                            title="Werde Teil der Kleinfeldfußball-Community!"
                            content={`Ob Spieler, Trainer, Schiedsrichter oder Fan – der ÖKFB bietet dir die Möglichkeit, dich aktiv einzubringen und Teil einer stetig wachsenden Sportbewegung zu sein. Melde dich oder dein Team noch heute an.\n\nFür weitere Informationen:\nBesuche uns auf unserer Website www.oekfb.at oder folge uns auf unseren Social-Media-Kanälen für aktuelle News, Ergebnisse und Spieltermine.`}
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
