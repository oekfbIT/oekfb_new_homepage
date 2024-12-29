import type { Meta, StoryObj } from "@storybook/react";
import { Transfer } from ".";

const meta: Meta<typeof Transfer> = {
  title: "Components/Transfer",
  component: Transfer,
};

export default meta;

type Story = StoryObj<typeof Transfer>;

export const Default: Story = {
  args: {
    className: {},
  },
};
