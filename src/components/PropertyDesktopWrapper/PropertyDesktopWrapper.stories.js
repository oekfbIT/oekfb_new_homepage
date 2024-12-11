import { PropertyDesktopWrapper } from ".";

export default {
  title: "Components/PropertyDesktopWrapper",
  component: PropertyDesktopWrapper,
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
    icnArrowRight: "/img/icn-arrow-right-15.svg",
    img: "/img/icn-arrow-right-14.svg",
  },
};
