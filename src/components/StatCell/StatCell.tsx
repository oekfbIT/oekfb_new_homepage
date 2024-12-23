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
    wins = "Siege",
    yellow_red_crd = "Gelb-Rote Karten",
    goals_scored = "Erzielte Tore",
    red_cards = "Rote Karten",
    matches_played = "Spiele",
    yellow_cards = "Gelbe Karten",
}

// Helper function to format stat keys
const formatStatKey = (key: string): string => {
    return StatKeyMap[key as keyof typeof StatKeyMap] ?? key.replace(/_/g, " ");
};

export const StatCell = ({ className, statKey, statValue }: Props): JSX.Element => {
    const formattedKey = formatStatKey(statKey);

    return (
        <div className={`stat-cell ${className}`}>
            <div className="stat-cell-key">
                <div className="stat-cell-key-text">{formattedKey}</div>
            </div>

            <div className="stat-cell-value">
                <div className="stat-cell-value-text">{statValue}</div>
            </div>
        </div>
    );
};
