import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { PageHeader } from "../../components/PageHeader";
import { PropertyDesktopWrapper } from "../../components/PropertyDesktopWrapper";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import ClientController from "../../network/ClientController";
import AuthService from "../../network/AuthService";

export const ElementTransfersDesktop = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;
  const navigate = useNavigate();
  const { id } = useParams();

  const clientController = new ClientController();
  const authService = new AuthService();

  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch clubs on component mount
  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const clubData = await clientController.fetchTransferList();
        setTransfers(clubData);
      } catch (error) {
        console.error("Error fetching club data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  return (
      <div
          className="element-transfers-desktop"
          style={{
            minWidth: screenWidth < 1200 ? "390px" : "1200px",
          }}
      >
        {isMobile ? <Navigation /> : <DesktopNav />}

        <div className="page-control-3">
          <PageHeader className="instance-node-9" text="Transfers" />

          <div className="single-transfer-2">
            {/* Display a message if there are no transfers */}
            {transfers.length === 0 ? (
                <p>In dieser Liga gibt es aktuell keine Transfers</p>
            ) : (
                transfers.map((transfer) => (
                    <PropertyDesktopWrapper
                        key={transfer.id}
                        className="instance-node-9"
                        icnArrowRight={
                          screenWidth < 900 ? "/img/icn-arrow-right-22.svg" : undefined
                        }
                        img={screenWidth >= 900 ? "/img/icn-arrow-right-16.svg" : undefined}
                        property1={
                          screenWidth < 900
                              ? "mobile"
                              : screenWidth >= 900
                                  ? "desktop"
                                  : undefined
                        }
                        data={{
                          origin_name: transfer.origin_name,
                          player_name: transfer.player_name,
                          origin_image: transfer.origin_image,
                          player_image: transfer.player_image,
                          team_name: transfer.team_name,
                          team_image: transfer.team_image,
                        }}
                    />
                ))
            )}
          </div>
        </div>

        <Footer />
      </div>
  );
};
