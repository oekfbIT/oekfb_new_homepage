import { FixtureDataCell } from ".";

export default {
  title: "Components/FixtureDataCell",
  component: FixtureDataCell,
  argTypes: {
    state: {
      options: ["desktop", "mobile"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    state: "desktop",
    className: {},
    fixtureDataClassName: {},
    homeTeamClassName: {},
    gamedayLivescoreClassName: {},
    awayTeamClassName: {},
    gamedayLivescoreClassNameOverride: {},
    stadiumImage: "/img/stadium-image-1.svg",
    img: "/img/stadium-image.svg",
  },
};
