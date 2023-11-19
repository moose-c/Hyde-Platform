import { useEffect, useRef, useState } from "react";
import "../styles/Timeline.css";
import useDraggableScroll from "use-draggable-scroll";
import { timelineObjects } from "../data/timelineObjects";

const TIMELINEBLOCKWIDTH = 300;

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

export default function Timeline({ currentYear, setCurrentYear }) {
  const ref = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref);

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
              iconLink={timelineObject.iconLink}
            />
          );
        })}
        <div
          className="timelineObject"
          style={{ width: screenWidth / 2 }}
        ></div>
        <img src="/pointer.png" id="pin" />
      </div>
    </>
  );
}

const TimelineObject = ({ backgroundColor, periodTag, title, iconLink }) => {
  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className={`timelineObject`}
    >
      <div className="">
        <div style={{ fontWeight: "bold", fontSize: 16 }}>{title}</div>
        <div style={{ fontWeight: 300, fontSize: 12 }}>{periodTag}</div>
      </div>
      <img className="icon" src={iconLink} />
    </div>
  );
};
