import { TeamDetailSquad } from ".";

export default {
  title: "Components/TeamDetailSquad",
  component: TeamDetailSquad,
  argTypes: {
    property1: {
      options: ["image", "no-image"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "image",
    className: {},
  },
};
