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
    eventCardTypeImg: "/img/event-card-type-img-12.svg",
    img: "/img/event-card-type-img-13.svg",
    eventCardPlayerClassNameOverride: {},
    eventCardTeamImgClassNameOverride: {},
    eventCardLastNameClassNameOverride: {},
    eventCardTypeImg1: "/img/event-card-type-img.svg",
    eventCardTypeImg2: "/img/event-card-type-img-1.svg",
    eventCardNameClassName: {},
    eventCardNameClassNameOverride: {},
    eventCardTypeImg3: "/img/event-card-type-img-8.svg",
    eventCardTypeImg4: "/img/event-card-type-img-9.svg",
    eventCardTypeImg5: "/img/event-card-type-img-4.svg",
  },
};
