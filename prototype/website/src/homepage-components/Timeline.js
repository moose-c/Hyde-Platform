import { useEffect, useRef, useState } from "react";
import "../styles/Timeline.css";
import useDraggableScroll from "use-draggable-scroll";

const TIMELINEBLOCKWIDTH = 300;

const timelineObjects = [
  {
    periodTag: "10000 b.C. - 3000 b.C.",
    startYear: 0,
    endYear: 7000,
    title: "New Stone Age",
    color: "#15588d",
    periodText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
  },
  {
    periodTag: "3000 b.C. - 1300 b.C.",
    startYear: 7000,
    endYear: 8700,
    title: "The Bronze Age",
    color: "#487386",
    periodText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
  },

  {
    periodTag: "1300 b.C. - 600 b.C.",
    startYear: 8700,
    endYear: 9400,
    color: "#2a8983",
    title: "The Iron Age",
    periodText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
  },
  {
    periodTag: "600 b.C. - 476 A.D.",
    startYear: 9400,
    endYear: 10476,
    color: "#719c33",
    title: "The Classical Era",
    periodText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
  },
  {
    periodTag: "476 A.D. - 1450 A.D.",
    startYear: 10476,
    endYear: 11450,
    title: "The Middle Ages",
    color: "#f9c232",
    periodText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
  },
  {
    periodTag: "1450 A.D. - 1750 A.D.",
    startYear: 11450,
    endYear: 11750,
    color: "#f7941d",
    title: "The Early Modern Era",
    periodText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
  },
  {
    periodTag: "1750 A.D. - 1950 A.D.",
    startYear: 11750,
    endYear: 11950,
    color: "#f36523",
    title: "Classical Modernity",
    periodText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
  },
  {
    periodTag: "1950 A.D. - 2017 A.D.",
    startYear: 11950,
    endYear: 12017,
    color: "#ca4c57",
    title: "Late Modernity",
    periodText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
  },
];

const yearIndexToYear = (yearIndex) => {
  if (yearIndex < 10000) {
    return `${Math.round(10000 - yearIndex)} b.C.`;
  } else {
    return `${Math.round(yearIndex - 10000)} A.D.`;
  }
};

const calculateScrollOffsetBasedOnYearIndex = (yearIndex) => {
  if (yearIndex <= 7000) {
    return (yearIndex / 7000) * TIMELINEBLOCKWIDTH;
  } else if (yearIndex <= 8700) {
    return (
      TIMELINEBLOCKWIDTH + ((yearIndex - 7000) / 1700) * TIMELINEBLOCKWIDTH
    );
  } else if (yearIndex <= 9400) {
    return (
      2 * TIMELINEBLOCKWIDTH + ((yearIndex - 8700) / 700) * TIMELINEBLOCKWIDTH
    );
  } else if (yearIndex <= 10476) {
    return (
      3 * TIMELINEBLOCKWIDTH + ((yearIndex - 9400) / 1076) * TIMELINEBLOCKWIDTH
    );
  } else if (yearIndex <= 11450) {
    return (
      4 * TIMELINEBLOCKWIDTH + ((yearIndex - 10476) / 974) * TIMELINEBLOCKWIDTH
    );
  } else if (yearIndex <= 11750) {
    return (
      5 * TIMELINEBLOCKWIDTH + ((yearIndex - 11450) / 300) * TIMELINEBLOCKWIDTH
    );
  } else if (yearIndex <= 11950) {
    return (
      6 * TIMELINEBLOCKWIDTH + ((yearIndex - 11750) / 200) * TIMELINEBLOCKWIDTH
    );
  } else if (yearIndex <= 12017) {
    console.log("less than 12017");
    console.log(
      7 * TIMELINEBLOCKWIDTH + ((yearIndex - 11950) / 67) * TIMELINEBLOCKWIDTH
    );
    return (
      7 * TIMELINEBLOCKWIDTH + ((yearIndex - 11950) / 67) * TIMELINEBLOCKWIDTH
    );
  } else {
    // Adjust the formula for year indices larger than 12017
    return (
      7 * TIMELINEBLOCKWIDTH + TIMELINEBLOCKWIDTH * ((yearIndex - 12017) / 1000)
    );
  }
};

const calculateCurrentYearBasedOnScroll = (scrollLeft) => {
  // If scrollLeft is inside the FIRST timeblock, then every pixel is 10000/600 years
  if (scrollLeft <= TIMELINEBLOCKWIDTH) {
    return (scrollLeft / TIMELINEBLOCKWIDTH) * 7000;
  }
  // If ScrollLeft is inside the SECOND timeblock, then every pixel is 3200/600 years
  if (scrollLeft <= TIMELINEBLOCKWIDTH * 2) {
    return (
      7000 + ((scrollLeft - TIMELINEBLOCKWIDTH * 1) / TIMELINEBLOCKWIDTH) * 1700
    );
  }
  // If ScrollLeft is inside the THIRD timeblock, then every pixel is 700/600 years
  if (scrollLeft <= TIMELINEBLOCKWIDTH * 3) {
    return (
      8700 + ((scrollLeft - TIMELINEBLOCKWIDTH * 2) / TIMELINEBLOCKWIDTH) * 700
    );
  }
  // if ScrollLet is inside the FOURTH timeblock, then every pixel is 350/600
  if (scrollLeft <= TIMELINEBLOCKWIDTH * 4) {
    return (
      9400 + ((scrollLeft - TIMELINEBLOCKWIDTH * 3) / TIMELINEBLOCKWIDTH) * 1076
    );
  }
  // if ScrollLet is inside the FIFTH timeblock, then every pixel is 200/600
  if (scrollLeft <= TIMELINEBLOCKWIDTH * 5) {
    return (
      10476 + ((scrollLeft - TIMELINEBLOCKWIDTH * 4) / TIMELINEBLOCKWIDTH) * 974
    );
  }
  // if ScrollLet is inside the SIXTH timeblock, then every pixel is 67/600
  if (scrollLeft <= TIMELINEBLOCKWIDTH * 6) {
    return (
      11450 + ((scrollLeft - TIMELINEBLOCKWIDTH * 5) / TIMELINEBLOCKWIDTH) * 300
    );
  }
  if (scrollLeft <= TIMELINEBLOCKWIDTH * 7) {
    return (
      11750 + ((scrollLeft - TIMELINEBLOCKWIDTH * 6) / TIMELINEBLOCKWIDTH) * 200
    );
  }
  if (scrollLeft <= TIMELINEBLOCKWIDTH * 8) {
    return (
      11950 + ((scrollLeft - TIMELINEBLOCKWIDTH * 7) / TIMELINEBLOCKWIDTH) * 67
    );
  }

  return 12017;
};

export default function Timeline() {
  const ref = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref);

  const [currentYear, setCurrentYear] = useState(11500);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    ref.current.scrollLeft = calculateScrollOffsetBasedOnYearIndex(currentYear);
  }, [ref, ref.current]);

  return (
    <>
      {/* This year: {yearIndexToYear(currentYear)} */}
      <div
        className="timeline"
        ref={ref}
        onMouseDown={onMouseDown}
        onScroll={(e) =>
          setCurrentYear(calculateCurrentYearBasedOnScroll(e.target.scrollLeft))
        }
      >
        <div
          className="timelineObject"
          style={{ width: screenWidth / 2 }}
        ></div>
        {timelineObjects.map((timelineObject, i) => {
          return (
            <TimelineObject
              title={timelineObject.title}
              backgroundColor={timelineObject.color}
              periodTag={timelineObject.periodTag}
              periodText={timelineObject.periodText}
            />
          );
        })}
        <div
          className="timelineObject"
          style={{ width: screenWidth / 2 }}
        ></div>
        <div id="pin" />
      </div>
    </>
  );
}

const TimelineObject = ({ backgroundColor, periodTag, title }) => {
  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className={`timelineObject`}
    >
      <div style={{ fontWeight: "bold", fontSize: 16 }}>{title}</div>
      <div style={{ fontWeight: 300, fontSize: 12 }}>{periodTag}</div>
    </div>
  );
};
