import { SingleTransferCell } from ".";

export default {
  title: "Components/SingleTransferCell",
  component: SingleTransferCell,
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
