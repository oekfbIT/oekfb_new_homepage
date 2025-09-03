import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { PageHeader } from "../../components/PageHeader";
import { PropertyDesktopWrapper } from "../../components/PropertyDesktopWrapper";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import "./style.css";

/**
 * Transfers Page (Desktop/Mobile shell)
 * - Fetches transfer list
 * - Renders each transfer using PropertyDesktopWrapper
 * - Responsive: shows Navigation on mobile, DesktopNav otherwise
 */
export const ElementTransfersDesktop = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;

  const navigate = useNavigate();
  const { id } = useParams();

  const clientController = new ClientController();
  const authService = new AuthService();

  const [transfers, setTransfers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const list = await clientController.fetchTransferList();

        // TEMPORARY filter until backend fix (kept but disabled by default)
        // const filtered = list.filter((t: any) => new Date(t.created).getFullYear() === 2025);
        // setTransfers(filtered);

        // Use full list (uncommented when backend fix is done)
        setTransfers(list);
      } catch (error) {
        console.error("Error fetching transfer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  return (
    <div
      className="transfers-page"
      style={{ minWidth: isMobile ? "390px" : "1200px" }}
    >
      {/* Top navigation */}
      {isMobile ? <Navigation /> : <DesktopNav />}

      <div className="transfers-page__main">
        <PageHeader className="transfers-page__header" text="Transfers" />

        <section className="transfers-page__list" aria-label="Transferliste">
          {loading ? (
            <p className="transfers-page__status">Lade Transfers…</p>
          ) : transfers.length === 0 ? (
            <p className="transfers-page__empty">
              In dieser Liga gibt es aktuell keine Transfers
            </p>
          ) : (
            transfers.map((transfer: any) => (
              <PropertyDesktopWrapper
                key={transfer.id}
                className="transfers-page__item"
                /* On mobile, pass right-arrow icon; on desktop, SVG URL */
                icnArrowRight={isMobile ? "/img/icn-arrow-right-22.svg" : undefined}
                img={
                  !isMobile
                    ? "https://firebasestorage.googleapis.com/v0/b/oekfbbucket.appspot.com/o/adminfiles%2Fhomepage%2Ficn-arrow-right-16.svg?alt=media&token=80ecc6b4-b418-45ee-80b0-6f45197089e1"
                    : undefined
                }
                property1={isMobile ? "mobile" : "desktop"}
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
        </section>
      </div>

      <Footer />
    </div>
  );
};
