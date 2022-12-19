import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import moment from "moment";

const Countdown = forwardRef(({ onFinish = () => {} }, ref) => {
  const [second, setSecond] = useState(0);
  const [text, setText] = useState(`0:0`);
  const _ref = useRef();

  const getCount = (second) => {
    const diffMin = Math.floor(second / 60);
    const diffSec = second - diffMin * 60;

    return `${diffMin}:${diffSec}`;
  };

  const start = (time) => {
    setSecond(moment(time).diff(moment(), "seconds"));
    _ref.current = setInterval(() => {
      setSecond((value) => value - 1);
    }, 1000);
  };

  useImperativeHandle(
    ref,
    () => ({
      start,
    }),
    []
  );

  useEffect(() => {
    return () => {
      if (_ref.current) {
        clearInterval(_ref.current);
        _ref.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!second && _ref.current) {
      clearInterval(_ref.current);
      _ref.current = null;
      onFinish();
    }

    setText(getCount(second));
  }, [second]);

  return <span>{text}</span>;
});

export default Countdown;
