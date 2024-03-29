import { useEffect, useRef, useState } from "react";
import "../styles/Timeline.css";
import useDraggableScroll from "use-draggable-scroll";
import {
  CURR_YEAR_IN_YEARINDEX,
  YEARS_FROM_1950_TO_NOW,
  timelineObjects,
} from "../util/timelineObjects";
import { yearIndexToYear } from "../util/yearIndexToYear";

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
  } else if (yearIndex <= 10500) {
    return (
      3 * TIMELINEBLOCKWIDTH + ((yearIndex - 9400) / 1100) * TIMELINEBLOCKWIDTH
    );
  } else if (yearIndex <= 11450) {
    return (
      4 * TIMELINEBLOCKWIDTH + ((yearIndex - 10500) / 950) * TIMELINEBLOCKWIDTH
    );
  } else if (yearIndex <= 11750) {
    return (
      5 * TIMELINEBLOCKWIDTH + ((yearIndex - 11450) / 300) * TIMELINEBLOCKWIDTH
    );
  } else if (yearIndex <= 11950) {
    return (
      6 * TIMELINEBLOCKWIDTH + ((yearIndex - 11750) / 200) * TIMELINEBLOCKWIDTH
    );
  } else if (yearIndex <= CURR_YEAR_IN_YEARINDEX) {
    return (
      7 * TIMELINEBLOCKWIDTH +
      ((yearIndex - 11950) / YEARS_FROM_1950_TO_NOW) * TIMELINEBLOCKWIDTH
    );
  } else {
    // Adjust the formula for year indices larger than CURR_YEAR_IN_YEARINDEX
    return (
      7 * TIMELINEBLOCKWIDTH +
      TIMELINEBLOCKWIDTH * ((yearIndex - CURR_YEAR_IN_YEARINDEX) / 1000)
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
      9400 + ((scrollLeft - TIMELINEBLOCKWIDTH * 3) / TIMELINEBLOCKWIDTH) * 1100
    );
  }
  // if ScrollLet is inside the FIFTH timeblock, then every pixel is 200/600
  if (scrollLeft <= TIMELINEBLOCKWIDTH * 5) {
    return (
      10500 + ((scrollLeft - TIMELINEBLOCKWIDTH * 4) / TIMELINEBLOCKWIDTH) * 950
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
      11950 +
      ((scrollLeft - TIMELINEBLOCKWIDTH * 7) / TIMELINEBLOCKWIDTH) *
      YEARS_FROM_1950_TO_NOW
    );
  }

  return CURR_YEAR_IN_YEARINDEX;
};

export default function Timeline({ currentYear, setCurrentYear }) {
  /* The code is creating a reference (`ref`) using the `useRef` hook and initializing it with `null`. It
  then uses the `useDraggableScroll` hook to destructure the `onMouseDown` function from the returned
  object, passing in the `ref` as an argument. This allows the component to make use of the
  `onMouseDown` function for handling mouse down events on the timeline element. */
  const ref = useRef(null);
  const { onMouseDown } = useDraggableScroll(ref);

  const [screenWidth, setScreenWidth] = useState(0);
  const [notDragged, setNotDragged] = useState(true)

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  const handleMouseDown = (e) => {
    if (notDragged) {
      setNotDragged(false);
    }
    onMouseDown(e);
  };

  useEffect(() => {
    ref.current.scrollLeft = calculateScrollOffsetBasedOnYearIndex(currentYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ref.current]);

  return (
    <>
      <div
        className="timeline"
        ref={ref}
        onMouseDown={handleMouseDown}
        onScroll={(e) => {
          setCurrentYear(calculateCurrentYearBasedOnScroll(e.target.scrollLeft))
        }
        }
      >
        <div
          className="timelineObject"
          style={{ width: screenWidth / 2, backgroundColor: "#cbd5e1" }}
        >
          <div style={{ marginLeft: "auto" }}>
            <div style={{ fontWeight: "bold", fontSize: 16 }}>
              No data available
            </div>
            <div style={{ fontWeight: 300, fontSize: 12 }}>
              Before 10.000 B.C.E.
            </div>
          </div>
        </div>
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
          style={{
            width: screenWidth / 2,
            backgroundColor: "#cbd5e1",
          }}
          className="timelineObject"
        >
          <div className="">
            <div style={{ fontWeight: "bold", fontSize: 16 }}>
              No data available
            </div>
            <div style={{ fontWeight: 300, fontSize: 12 }}>
              From {yearIndexToYear(CURR_YEAR_IN_YEARINDEX)}
            </div>
          </div>
        </div>
        <img src="/pointer.png" id="pin" alt="pointer" pointerEvents="none" draggable="false"/>
        {notDragged && (
          <div className='bg-primary' style={{ position: "absolute", left: 'calc(50% + 20px)', top: -20, borderRadius: '10px', padding: '10px', color: 'white', fontWeight: 'bold', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
            Drag the Timeline to explore different years and eras!
          </div>
        )}

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
      <img className="icon" src={iconLink} draggable={false} alt="icon" />
    </div>
  );
};
