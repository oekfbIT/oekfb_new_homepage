import type { Meta, StoryObj } from "@storybook/react";
import { ButtonSecondary } from ".";

const meta: Meta<typeof ButtonSecondary> = {
  title: "Components/ButtonSecondary",
  component: ButtonSecondary,
};

export default meta;

type Story = StoryObj<typeof ButtonSecondary>;

export const Default: Story = {
  args: {
    className: {},
    text: "FORGOT PASSWORD",
  },
};
