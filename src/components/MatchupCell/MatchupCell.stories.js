import { MatchupCell } from ".";

export default {
  title: "Components/MatchupCell",
  component: MatchupCell,
  argTypes: {
    state: {
      options: ["fixture-w-top", "fixture-no-top", "live-top", "live-w-top"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    state: "fixture-w-top",
    className: {},
  },
};
