import { useEffect, useRef, useState } from "react";
import "../styles/Timeline.css";
import useDraggableScroll from "use-draggable-scroll";

const timelineObjects = [
  {
    periodTitle: "Stone Age",
    periodTag: "10000 b.C. - 2500 b.C.",
    startYear: 0,
    endYear: 7500,
    periodText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
  },
  {
    periodTitle: "Bronze Age",
    periodTag: "2500 b.C. - 700 a.C.",
    startYear: 7500,
    endYear: 10700,
    periodText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
  },
  {
    periodTitle: "",
    periodTag: "700 a.C. - 1400 a.C.",
    startYear: 10700,
    endYear: 11400,
    periodText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
  },
  {
    periodTag: "1400 a.C. - 1750 a.C.",
    startYear: 11400,
    endYear: 11750,
    periodText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
  },
  {
    periodTag: "1750 a.C. - 1950 a.C.",
    startYear: 11750,
    endYear: 11950,
    periodText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
  },
  {
    periodTag: "1950 a.C. - 2017 a.C.",
    startYear: 11950,
    endYear: 12017,
    periodText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed ante ac metus fringilla rutrum. Cras egestas felis non nisi consequat vulputate. Nam nec odio sagittis lacus interdum tempor. Phasellus venenatis arcu ut consequat ornare. Sed viverra tellus sit amet enim malesuada, et molestie elit viverra. Duis eleifend mi sit amet metus pellentesque vestibulum. Praesent in turpis neque. Vestibulum non eleifend nisl. Cras finibus vehicula odio, id vulputate velit mattis tempor.\nInteger ac enim elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean ac tortor neque. Integer pellentesque est dui, a posuere sapien elementum et. In hac habitasse platea dictumst. Aliquam gravida maximus nibh ac ornare. Proin vitae egestas lectus. Mauris fermentum ipsum id ex porta dignissim. Duis volutpat, dui quis fringilla elementum, dui ante commodo ex, sollicitudin sollicitudin urna lectus vitae dolor. Etiam lacinia ipsum leo, at pharetra purus blandit eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed id volutpat libero, ut finibus turpis.\nMorbi lacinia ipsum in magna ullamcorper dignissim. Quisque placerat tortor a lacus eleifend, sed egestas diam blandit. Cras non tellus vitae felis dictum ullamcorper et a ante. Curabitur faucibus urna id nibh facilisis aliquet. Vivamus sit amet elementum turpis. Ut ut ipsum vitae arcu aliquam finibus. Nullam sit amet mi malesuada, ullamcorper tortor nec, pharetra ex. Sed pulvinar mi tellus, quis cursus sem dictum id. Duis accumsan magna eu leo pellentesque dapibus. Maecenas ac sem lorem. Proin dictum risus non mollis cursus. Duis feugiat ipsum purus.",
  },
];

const yearIndexToYear = (yearIndex) => {
  if (yearIndex < 10000) {
    return `${Math.round(10000 - yearIndex)} b.C.`;
  } else {
    return `${Math.round(yearIndex - 10000)} a.C.`;
  }
};

const calculateCurrentYearBasedOnScroll = (scrollLeft) => {
  const TIMELINEBLOCKWIDTH = 600;
  const TIMELINEBLOCKS = timelineObjects.length;
  // If scrollLeft is inside the FIRST timeblock, then every pixel is 10000/600 years
  if (scrollLeft <= TIMELINEBLOCKWIDTH) {
    return (scrollLeft / TIMELINEBLOCKWIDTH) * 7500;
  }
  // If ScrollLeft is inside the SECOND timeblock, then every pixel is 3200/600 years
  if (scrollLeft <= TIMELINEBLOCKWIDTH * 2) {
    return 7500 + ((scrollLeft - 600 * 1) / TIMELINEBLOCKWIDTH) * 3200;
  }
  // If ScrollLeft is inside the THIRD timeblock, then every pixel is 700/600 years
  if (scrollLeft <= TIMELINEBLOCKWIDTH * 3) {
    return 10700 + ((scrollLeft - 600 * 2) / TIMELINEBLOCKWIDTH) * 700;
  }
  // if ScrollLet is inside the FOURTH timeblock, then every pixel is 350/600
  if (scrollLeft <= TIMELINEBLOCKWIDTH * 4) {
    return 11400 + ((scrollLeft - 600 * 3) / TIMELINEBLOCKWIDTH) * 350;
  }
  // if ScrollLet is inside the FIFTH timeblock, then every pixel is 200/600
  if (scrollLeft <= TIMELINEBLOCKWIDTH * 5) {
    return 11750 + ((scrollLeft - 600 * 4) / TIMELINEBLOCKWIDTH) * 200;
  }
  // if ScrollLet is inside the SIXTH timeblock, then every pixel is 67/600
  if (scrollLeft <= TIMELINEBLOCKWIDTH * 6) {
    return 11950 + ((scrollLeft - 600 * 5) / TIMELINEBLOCKWIDTH) * 67;
  }

  return 12017;
};

export default function Timeline({currentYear, setCurrentYear}) {
  const ref = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref);

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  return (
    <>
      This year: {yearIndexToYear(currentYear)}
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
          style={{ width: screenWidth / 2, backgroundColor: "black" }}
        ></div>
        {timelineObjects.map((timelineObject) => {
          return (
            <TimelineObject
              periodTag={timelineObject.periodTag}
              periodText={timelineObject.periodText}
            />
          );
        })}
        <div
          className="timelineObject"
          style={{ width: screenWidth / 2, backgroundColor: "black" }}
        ></div>
        <div id="pin" />
      </div>
    </>
  );
}

const TimelineObject = ({ periodTag, periodText }) => {
  return <div className="timelineObject">{periodTag}</div>;
};
