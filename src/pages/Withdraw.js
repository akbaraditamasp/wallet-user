import { Fragment, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Countdown from "../components/Countdown";
import Heading from "../components/Heading";
import { FiRotateCw } from "react-icons/fi";

export default function Withdraw() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { state } = useLocation();
  const _cdRef = useRef();

  const get = () =>
    navigate("/panel/pin", {
      replace: true,
      state: {
        dataKey: "params",
        serviceProps: {
          method: "GET",
          url: "/transaction/withdraw",
        },
        values: {},
        navigate: {
          notForwardId: true,
          to: "/panel/withdraw",
          props: {
            replace: true,
          },
        },
      },
    });

  useEffect(() => {
    if (!state) {
      get();
    }
  }, []);

  useEffect(() => {
    setData(state);
  }, [state]);

  useEffect(() => {
    if (data) {
      _cdRef.current.start(data.valid_before);
    }
  }, [data]);

  return (
    <Fragment>
      <Heading back={true}>Tarik Saldo</Heading>
      <div className="m-6 border rounded-sm">
        <div className="p-5 py-3 text-center bg-gray-100 rounded-t-sm border-b">
          Kode Penarikan
        </div>
        {data ? (
          <div className="flex flex-col items-center justify-center">
            <div className="p-5 grid grid-cols-6 grid-flow-row w-3/4">
              {[...(data?.code || "")].map((char, index) => (
                <div
                  className="text-3xl font-bold mukta text-center"
                  key={`${index}`}
                >
                  {char}
                </div>
              ))}
            </div>
            <div className="text-center mx-6 text-sm border-t w-full pt-3 pb-3">
              Kadaluarsa dalam{" "}
              <Countdown
                time={data?.valid_before}
                ref={_cdRef}
                onFinish={() => {
                  setData(null);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="p-5 flex justify-center items-center">
            <button
              type="button"
              onClick={() => get()}
              className="w-12 h-12 rounded-full bg-gray-500 flex justify-center items-center text-white"
            >
              <FiRotateCw size={24} />
            </button>
          </div>
        )}
      </div>
      <div className="m-6 border rounded-sm">
        <div className="p-5 py-3 text-center bg-gray-100 rounded-t-sm border-b">
          Cara Penarikan
        </div>
        <ol style={{ listStyleType: "decimal", listStylePosition: "inside" }}>
          <li className="px-5 py-3 text-sm border-b">
            Bawa smartphone anda ke koperasi sekolah
          </li>
          <li className="px-5 py-3 text-sm border-b">
            Sampaikan ke penjaga bahwa anda ingin melakukan penarikan saldo
            e-Walllet
          </li>
          <li className="px-5 py-3 text-sm border-b">
            Berikan username dan kode penarikan beserta jumlah yang ingin anda
            tarik
          </li>
          <li className="px-5 py-3 text-sm">
            Tunggu hingga koperasi memproses penarikan anda
          </li>
        </ol>
      </div>
    </Fragment>
  );
}
