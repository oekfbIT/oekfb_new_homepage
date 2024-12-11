import { LeaderboardStat } from ".";

export default {
  title: "Components/LeaderboardStat",
  component: LeaderboardStat,
  argTypes: {
    property1: {
      options: ["desktop", "mobile"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "desktop",
    className: {},
  },
};
