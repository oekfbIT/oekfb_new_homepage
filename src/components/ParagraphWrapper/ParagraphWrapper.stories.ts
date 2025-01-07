import type { Meta, StoryObj } from "@storybook/react";
import { ParagraphWrapper } from ".";

const meta: Meta<typeof ParagraphWrapper> = {
  title: "Components/ParagraphWrapper",
  component: ParagraphWrapper,
};

export default meta;

type Story = StoryObj<typeof ParagraphWrapper>;

export const Default: Story = {
  args: {
    className: {},
  },
};
