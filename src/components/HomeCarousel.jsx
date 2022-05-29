import React, { useState, useEffect, useReducer, useRef } from "react";
import styles from "../styles/Carousel.module.css";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import slides from "./slides.js";

const useProgress = (animate, time) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (animate) {
      let id = null;
      let start = null;
      const move = (timestamp) => {
        if (!start) start = timestamp;
        let elapsed = timestamp - start;
        if (elapsed < time) id = requestAnimationFrame(move);
        setProgress(Math.min(elapsed / time, 1));
      };

      id = requestAnimationFrame(move);
      return () => cancelAnimationFrame(id);
    }
  }, [animate, time]);

  return progress;
};
const ProgressBar = ({ animate, time }) => {
  let progress = useProgress(animate, time);

  return (
    <div className={styles.ProgressBar}>
      <div style={{ width: `${progress * 100}%` }} />
    </div>
  );
};
const Carousel = () => {
  const [show, setShow] = useState(false);
  const SLIDE_DURATION = 7000;
  let [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "NEXT":
        case "PROGRESS":
          return {
            ...state,
            isPlaying: true,
            currentIndex: (state.currentIndex + 1) % slides.length,
          };
        case "PAUSE":
          return {
            ...state,
            isPlaying: false,
          };
        case "PLAY":
          return {
            ...state,
            isPlaying: true,
          };
        case "PREV":
          return {
            ...state,
            currentIndex:
              (state.currentIndex - 1 + slides.length) % slides.length,
            isPlaying: true,
          };
        case "GOTO":
          return {
            ...state,
            takeFocus: true,
            currentIndex: action.index,
          };
        case "UNSET_FOCUS":
          return {
            ...state,
            takeFocus: false,
          };
        default:
          return state;
      }
    },
    {
      currentIndex: 0,
      isPlaying: true,
      takeFocus: false,
    }
  );

  useEffect(() => {
    if (state.isPlaying) {
      let timeout = setTimeout(() => {
        dispatch({ type: "PROGRESS" });
      }, SLIDE_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [state.currentIndex, state.isPlaying]);

  return (
    <section className={styles.carousel}>
      <ul
        className={styles.slides}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {slides.map((c, index) => (
          <li
            className={styles.slide}
            style={{ backgroundImage: `url(${c.img})` }}
            key={index}
            aria-hidden={index != state.currentIndex}
            tabIndex="-1"
          ></li>
        ))}
        <ul className={styles.SlideNav}>
          {slides.map((slide, index) => (
            <li className={styles.SlideNavItem} key={index}>
              <button
                aria-label={`Slide ${index + 1}`}
                onClick={() => {
                  dispatch({ type: "GOTO", index });
                }}
                aria-current={index === state.currentIndex}
              >
                <span />
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.controls}>
          <button
            className={styles.IconButton}
            aria-label="Previous Slide"
            onClick={() => {
              dispatch({ type: "PREV" });
            }}
          >
            <IoChevronBackOutline size="44" />
          </button>
        </div>
        <div className={styles.controls}>
          <button
            className={styles.IconButton}
            aria-label="Next Slide"
            onClick={() => {
              dispatch({ type: "NEXT" });
            }}
          >
            <IoChevronForwardOutline size="44" />
          </button>
        </div>
        {show && (
          <div className={styles.controls}>
            {state.isPlaying ? (
              <button
                className={styles.IconButton}
                aria-label="Pause"
                onClick={() => {
                  dispatch({ type: "PAUSE" });
                }}
              >
                <FaPause size="50" />
              </button>
            ) : (
              <button
                className={styles.IconButton}
                aria-label="Play"
                onClick={() => {
                  dispatch({ type: "PLAY" });
                }}
              >
                <FaPlay size="50" />
              </button>
            )}
          </div>
        )}
        <ProgressBar
          key={state.currentIndex + state.isPlaying}
          time={SLIDE_DURATION}
          animate={state.isPlaying}
        />
      </ul>
    </section>
  );
};

export default Carousel;
