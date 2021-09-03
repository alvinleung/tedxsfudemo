import React, { useState, useEffect } from "react";
import parseSRT from "parse-srt";

const pushEntry = (arr, index, value) => {
  if (!arr[index]) {
    return (arr[index] = [value]);
  }
  arr[index] = value;
  return arr;
};

const Subtitle = ({ src, currentTime, duration }) => {
  // load subtitle from the same directory
  const [subtitle, setSubtitle] = useState();
  const [hashedLines, setHashedLines] = useState();
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    // attempt loading subtitle
    async function loadSubtitle() {
      // fetch subtitle here
      const subtitleData = await fetch(src);
      const subtitleStr = await subtitleData.text();

      // decode the subtitle
      const parsedSubtitle = parseSRT(subtitleStr);
      setSubtitle(parsedSubtitle);

      let keyframesInSeconds = [];
      parsedSubtitle.forEach((line, index) => {
        const beginSecond = Math.floor(line.start);
        const endSecond = Math.ceil(line.end);
        keyframesInSeconds = pushEntry(keyframesInSeconds, beginSecond, line);
        keyframesInSeconds = pushEntry(keyframesInSeconds, endSecond, line);
      });

      setHashedLines(keyframesInSeconds);
    }
    loadSubtitle();
  }, []);

  useEffect(() => {
    if (!hashedLines || !subtitle || !currentTime) return;

    function searchLine(currentTime) {
      return subtitle.findIndex(
        (line) => currentTime > line.start && currentTime < line.end
      );
    }

    const currentLine = searchLine(currentTime);
    if (currentLine === -1) {
      setCurrentLine(null);
      return;
    }
    setCurrentLine(currentLine);
  }, [currentTime, hashedLines, subtitle]);

  const isShowingSubtitle =
    subtitle && currentLine !== null && currentLine !== undefined
      ? true
      : false;

  // get the current line
  return (
    <div className="text-center w-full">
      {isShowingSubtitle && (
        <div
          className="inline-block text-2xl bg-black bg-opacity-50 font-medium rounded-sm ml-document mr-document px-2 py-1 backdrop-filter backdrop-blur-lg whitespace-pre-line"
          style={{ maxWidth: "50ch" }}
        >
          {subtitle[currentLine].text.replace("<br />", "\n")}
        </div>
      )}
    </div>
  );
};

export default Subtitle;
