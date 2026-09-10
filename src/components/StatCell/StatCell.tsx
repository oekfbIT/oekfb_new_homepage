import React from "react";
import "./style.css";

interface Props {
    className?: string;
    statKey: string;
    statValue: string | number;
}

// Define an enum for properly formatted German stat keys
enum StatKeyMap {
    total_against = "Gegentore",
    total_yellow_cards = "Gelbe Karten",
    total_scored = "Erzielte Tore",
    goal_difference = "Tordifferenz",
    total_points = "Punkte",
    losses = "Niederlagen",
    draws = "Unentschieden",
    total_red_cards = "Rote Karten",
    total_yellow_red_cards = "Gelb-Rote Karten",
    avg_goals = "Tore pro Spiel",
    goals_average = "Tore pro Spiel",
    wins = "Siege",
    yellow_red_crd = "Gelb-Rote Karten",
    goals_scored = "Erzielte Tore",
    red_cards = "Rote Karten",
    matches_played = "Gespielte Spiele",
    yellow_cards = "Gelbe Karten",
}

// Helper function to format stat keys
const formatStatKey = (key: string): string => {
    return StatKeyMap[key as keyof typeof StatKeyMap] ?? key.replace(/_/g, " ");
};

export const StatCell = ({ className, statKey, statValue }: Props): JSX.Element => {
    const formattedKey = formatStatKey(statKey);
    const formattedValue = typeof statValue === "number" && Number.isFinite(statValue)
        ? new Intl.NumberFormat("de-AT", { maximumFractionDigits: 2 }).format(statValue)
        : statValue;

    return (
        <div className={`stat-cell ${className}`}>
            <div className="stat-cell-key">
                <div className="stat-cell-key-text">{formattedKey}</div>
            </div>

            <div className="stat-cell-value">
                <div className="stat-cell-value-text">{formattedValue}</div>
            </div>
        </div>
    );
};
