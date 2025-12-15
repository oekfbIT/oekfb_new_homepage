import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWindowWidth } from "../../breakpoints";
import { Dropdown } from "../../components/Dropdown";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { PageHeader } from "../../components/PageHeader";
import { PropertyDesktopWrapper } from "../../components/PropertyDesktopWrapper";
import { DesktopNav } from "../../components/ViewDefaultWrapper";
import AuthService from "../../network/AuthService";
import ClientController from "../../network/ClientController";
import "./style.css";

type Transfer = Record<string, any>;

const getTransferDate = (t: Transfer): Date | null => {
  // pick the first existing date-like field you have
  const raw =
    t.created ??
    t.created_at ??
    t.date ??
    t.transfer_date ??
    t.updated_at ??
    null;

  if (!raw) return null;

  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
};

export const ElementTransfersDesktop = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < 900;

  const navigate = useNavigate();
  const { id } = useParams();

  const clientController = new ClientController();
  const authService = new AuthService();

  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [yearFilter, setYearFilter] = useState<string>("__all__");
  const [teamFilter, setTeamFilter] = useState<string>("__all__");

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const list = await clientController.fetchTransferList();
        setTransfers(Array.isArray(list) ? list : []);
      } catch (error) {
        console.error("Error fetching transfer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  // Build dropdown options from data
  const yearOptions = useMemo(() => {
    const years = new Set<number>();

    for (const t of transfers) {
      const d = getTransferDate(t);
      if (d) years.add(d.getFullYear());
    }

    const sortedYears = Array.from(years).sort((a, b) => b - a);

    return [
      { id: "__all__", value: "__all__", label: "Alle Jahre" },
      ...sortedYears.map((y) => ({ id: String(y), value: String(y), label: String(y) })),
    ];
  }, [transfers]);

  const teamOptions = useMemo(() => {
    const teams = new Set<string>();

    for (const t of transfers) {
      const name = (t.team_name ?? "").toString().trim(); // destination team
      if (name) teams.add(name);
    }

    const sortedTeams = Array.from(teams).sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );

    return [
      { id: "__all__", value: "__all__", label: "All Mannschaften" },
      ...sortedTeams.map((name) => ({ id: name, value: name, label: name })),
    ];
  }, [transfers]);

  // Apply filters + sort newest first
  const visibleTransfers = useMemo(() => {
    const filtered = transfers.filter((t) => {
      // year
      if (yearFilter !== "__all__") {
        const d = getTransferDate(t);
        if (!d) return false;
        if (String(d.getFullYear()) !== yearFilter) return false;
      }

      // team
      if (teamFilter !== "__all__") {
        const name = (t.team_name ?? "").toString().trim();
        if (name !== teamFilter) return false;
      }

      return true;
    });

    // newest first
    filtered.sort((a, b) => {
      const da = getTransferDate(a)?.getTime() ?? 0;
      const db = getTransferDate(b)?.getTime() ?? 0;
      return db - da;
    });

    return filtered;
  }, [transfers, yearFilter, teamFilter]);

  return (
    <div
      className="transfers-page"
      style={{ minWidth: isMobile ? "390px" : "1200px" }}
    >
      {isMobile ? <Navigation /> : <DesktopNav />}

      <div className="transfers-page__main">
        <PageHeader className="transfers-page__header" text="Transfers" />

        {/* Filters */}
        <div className="transfers-page__filters">
          <Dropdown
            className="transfers-page__filter"
            placeholder="Jahr"
            options={yearOptions}
            displayKey="label"
            valueKey="value"
            value={yearFilter}
            onChange={(v) => setYearFilter(v)}
            width={isMobile ? "100%" : 240}
          />

          <Dropdown
            className="transfers-page__filter"
            placeholder="Mannschaft"
            options={teamOptions}
            displayKey="label"
            valueKey="value"
            value={teamFilter}
            onChange={(v) => setTeamFilter(v)}
            width={isMobile ? "100%" : 320}
          />
        </div>

        <section className="transfers-page__list" aria-label="Transferliste">
          {loading ? (
            <p className="transfers-page__status">Lade Transfers…</p>
          ) : visibleTransfers.length === 0 ? (
            <p className="transfers-page__empty">
              In dieser Liga gibt es aktuell keine Transfers
            </p>
          ) : (
            visibleTransfers.map((transfer: any) => (
              <PropertyDesktopWrapper
                key={transfer.id}
                className="transfers-page__item"
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
