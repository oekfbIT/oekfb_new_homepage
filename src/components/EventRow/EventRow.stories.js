import { EventRow } from ".";

export default {
  title: "Components/EventRow",
  component: EventRow,
  argTypes: {
    property1: {
      options: [
        "yellow-home",
        "goal-away",
        "red-away",
        "goal-home",
        "yellow-away",
        "yellowred-away",
        "red-home",
        "yellowred-home",
      ],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "yellow-home",
    className: {},
    eventCardPlayerClassName: {},
    eventCardTeamImgClassName: {},
    eventCardLastNameClassName: {},
    eventCardTypeImg: "/img/goal.svg",
    img: "/img/goal.svg",
    eventCardPlayerClassNameOverride: {},
    eventCardTeamImgClassNameOverride: {},
    eventCardLastNameClassNameOverride: {},
    eventCardTypeImg1: "/img/yellowCard.svg",
    eventCardTypeImg2: "/img/event-card-type-img-1.svg",
    eventCardNameClassName: {},
    eventCardNameClassNameOverride: {},
    eventCardTypeImg3: "/img/event-card-type-img-8.svg",
    eventCardTypeImg4: "/img/redCard.svg",
    eventCardTypeImg5: "/img/yellowRedCard.svg",
  },
};
