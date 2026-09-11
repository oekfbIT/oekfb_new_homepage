type TeamName = {
  name?: string | null;
  shortName?: string | null;
  short_name?: string | null;
};

/** Prefer the optional admin-entered short name, ignoring blank values. */
export const getTeamDisplayName = (team?: TeamName | null): string =>
  team?.shortName?.trim() || team?.short_name?.trim() || team?.name || "";
