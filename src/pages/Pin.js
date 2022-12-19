import Heading from "../components/Heading";
import { FaBackspace } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { service } from "../service";
import toast from "react-simple-toasts";

const BasicBtn = ({ children, ...props }) => (
  <div className="flex justify-center">
    <button
      {...props}
      type="button"
      className="w-20 h-20 rounded-full border flex justify-center items-center active:bg-gray-100"
    >
      {children}
    </button>
  </div>
);

export default function Pin() {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  const add = (char) => {
    setPin((pin) => pin + char);
  };

  const check = (num) => {
    if (pin.length >= num) {
      return true;
    }

    return false;
  };

  const del = () => {
    if (pin.length >= 1) {
      setPin((pin) => pin.slice(0, -1));
    }
  };

  const process = () => {
    setLoading(true);
    const key = state?.dataKey;

    state.serviceProps[key] = {
      pin,
      ...state.values,
    };

    service(state?.serviceProps)
      .then((response) => {
        setLoading(false);
        navigate(
          state?.navigate.notForwardId
            ? state?.navigate.to
            : state?.navigate.to + response.data.id,
          { ...state?.navigate.props, state: response.data }
        );
      })
      .catch((e) => {
        setLoading(false);
        setPin("");
        if (e.response?.status === 403) {
          toast("PIN salah!");
        } else {
          toast("Terjadi kesalahan");
        }
      });
  };

  useEffect(() => {
    if (pin.length >= 6) {
      process();
    }
  }, [pin]);

  return (
    <div className="flex flex-col h-screen">
      <Heading back={true}>Masukkan PIN</Heading>
      <div className="h-40 flex justify-center items-center">
        <div
          className={
            "w-5 h-5 rounded-full border border-gray-400 mx-2 " +
            (check(1) ? "bg-gray-400" : "")
          }
        ></div>
        <div
          className={
            "w-5 h-5 rounded-full border border-gray-400 mx-2 " +
            (check(2) ? "bg-gray-400" : "")
          }
        ></div>
        <div
          className={
            "w-5 h-5 rounded-full border border-gray-400 mx-2 " +
            (check(3) ? "bg-gray-400" : "")
          }
        ></div>
        <div
          className={
            "w-5 h-5 rounded-full border border-gray-400 mx-2 " +
            (check(4) ? "bg-gray-400" : "")
          }
        ></div>
        <div
          className={
            "w-5 h-5 rounded-full border border-gray-400 mx-2 " +
            (check(5) ? "bg-gray-400" : "")
          }
        ></div>
        <div
          className={
            "w-5 h-5 rounded-full border border-gray-400 mx-2 " +
            (check(6) ? "bg-gray-400" : "")
          }
        ></div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="grid grid-cols-3 grid-flow-row gap-5">
          <BasicBtn onClick={() => add(1)}>1</BasicBtn>
          <BasicBtn onClick={() => add(2)}>2</BasicBtn>
          <BasicBtn onClick={() => add(3)}>3</BasicBtn>
          <BasicBtn onClick={() => add(4)}>4</BasicBtn>
          <BasicBtn onClick={() => add(5)}>5</BasicBtn>
          <BasicBtn onClick={() => add(6)}>6</BasicBtn>
          <BasicBtn onClick={() => add(7)}>7</BasicBtn>
          <BasicBtn onClick={() => add(8)}>8</BasicBtn>
          <BasicBtn onClick={() => add(9)}>9</BasicBtn>
          <BasicBtn onClick={() => del()}>
            <FaBackspace />
          </BasicBtn>
          <BasicBtn onClick={() => add(0)}>0</BasicBtn>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
}
