import React, { useEffect, useState } from "react";
import scrollTo from "gatsby-plugin-smoothscroll";
import speakers from "../content/speakers";

import Image from "./Image";
import scrollIntoView from "scroll-into-view-if-needed";

function NavPanels({
  isActive,
  speaker,
  setSpeaker,
  spySpeaker,
  width,
  setWidth,
  scroll,
  setScroll,
}) {
  // handles smooth scroll function and sets speaker on click
  const handleNavClick = (e) => {
    scrollIntoView(document.querySelector(`#scroll-${speaker.id}`), {
      behavior: "smooth",
    });
    // setSpeaker(parseInt(speaker.id));
  };

  // changes focus when div scrolled into view
  useEffect(() => {
    let speakerWidth = width / speakers.length;
    let speakerPos = scroll / speakerWidth;

    if (scroll != 0) {
      setSpeaker(parseInt(speakerPos) + 1);
    }

    // if at end, spy last speaker (addresses bug at final scrollPos)
    if (scroll === width && scroll != 0) {
      setSpeaker(speakers.length);
    }
  }, [scroll, width]);

  return (
    <button
      onClick={(e) => handleNavClick(e)}
      className={
        isActive
          ? `h-full w-full mx-1 ${
              spySpeaker === speaker.id ? "panel-active" : "panel-notactive"
            }`
          : `h-full w-full mx-1 opacity-50 ${
              spySpeaker === speaker.id ? "panel-active" : "panel-notactive"
            }`
      }
    >
      <Image src={speaker.img} className="h-full object-cover" />
    </button>
  );
}

export default NavPanels;
