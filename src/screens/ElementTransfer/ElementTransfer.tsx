import React, { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Transfer } from "../../components/Transfer";
import { Navigation } from "../../components/Navigation";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import ClientController from "../../network/ClientController";
import AuthService from "../../network/AuthService";
import { useWindowWidth } from "../../breakpoints";
import { useNavigate, useParams } from "react-router-dom";

import "./style.css";

export const ElementTransfer = (): JSX.Element => {
    const screenWidth = useWindowWidth();
    const isMobile = screenWidth < 900;
    const { id } = useParams();

    const [transfer, setTransfer] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const authService = new AuthService();
    const clientController = new ClientController();

    useEffect(() => {
        const fetchTransfer = async () => {
            try {
                const response = await clientController.fetchTransfer(id);
                setTransfer(response);
            } catch (error) {
                console.error("Error fetching transfer detail:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransfer();
    }, [id]);

    const handleAccept = () => {
        console.log("Accepted transfer request");
        // Add logic for accepting the transfer request here
    };

    const handleReject = () => {
        console.log("Rejected transfer request");
        // Add logic for rejecting the transfer request here
    };

    return (
        <div className="element-transfer">
            {isMobile ? <Navigation /> : <DesktopNav />}

            {!loading && transfer ? (
                <Transfer
                    className="transfer-confirmation"
                    playerName={transfer.player_name}
                    playerImage={transfer.player_image}
                    teamName={transfer.team_name}
                    teamID={transfer.team}
                    transferID={transfer.id}
                    playerID={transfer.player}
                    status={transfer.status}
                    message="hat dir eine Anfrage geschickt, ihrer Mannschaft beizutreten und deine derzeitige zu verlassen. Willst du diese Anfrage annehmen?"
                    onAccept={handleAccept}
                    onReject={handleReject}
                />
            ) : (
                <p>Loading...</p>
            )}

            <Footer />
        </div>
    );
};
