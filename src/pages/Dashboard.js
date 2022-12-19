import { Fragment, useEffect, useState } from "react";
import { FiLogIn, FiPlusSquare, FiDownload, FiMenu } from "react-icons/fi";
import { service } from "../service";
import { NumericFormat } from "react-number-format";
import TransactionList from "../components/TransactionList";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useCookies } from "react-cookie";
import { FaSignOutAlt, FaTimes } from "react-icons/fa";

export default function Dashboard() {
  const [data, setData] = useState({});
  const removeCookies = useCookies(["token"])[2];
  const [transaction, setTransaction] = useState([]);
  const [transactionLast, setTransactionLast] = useState([]);
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  const logout = () => {
    service
      .delete("/user/logout")
      .then((response) => {
        removeCookies("token", {
          maxAge: 0,
          path: "/",
        });
        service.defaults.headers.common["Authorization"] = undefined;
        navigate("/");
      })
      .catch(() => {});
  };

  const getGreeting = () => {
    const currentHour = parseInt(moment().format("HH"));

    if (currentHour >= 0 && currentHour < 12) {
      return "Selamat Pagi!";
    } else if (currentHour >= 12 && currentHour < 15) {
      return "Selamat Siang!";
    } else if (currentHour >= 15 && currentHour < 18) {
      return "Selamat Sore!";
    } else if (currentHour >= 18) {
      return "Selamat Malam!";
    } else {
      return "Halo";
    }
  };

  const getData = () => {
    service
      .get("/user/my")
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        if (e.response?.status === 401) {
          removeCookies("token", {
            maxAge: 0,
            path: "/",
          });
          service.defaults.headers.common["Authorization"] = undefined;
          navigate("/");
        }
      });

    service
      .get("/transaction/")
      .then((response) => {
        setTransactionLast(response.data.data);
      })
      .catch(() => {});

    service
      .get("/transaction?status=pending")
      .then((response) => {
        setTransaction(response.data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Fragment>
      <div className="bg-primary pb-8">
        <div className="h-20 px-5 mb-5 border-b border-primary-shade flex justify-between items-center font-bold text-white mukta text-2xl">
          {getGreeting()}
          <button
            type="button"
            className="px-6 py-3 -mr-6 text-base"
            onClick={() => setMenu(true)}
          >
            <FiMenu size={24} />
          </button>
        </div>
        {menu && (
          <div className="fixed top-0 left-0 w-full h-screen bg-opacity-50 bg-black z-20" />
        )}
        <div
          className={
            "w-full h-screen fixed top-0 right-0 flex justify-end z-20 overflow-hidden transform transition-all " +
            (menu ? "translate-x-0" : "translate-x-full")
          }
        >
          <div className={"w-5/6 bg-white h-screen p-5 flex flex-col"}>
            <button
              onClick={() => setMenu(false)}
              type="button"
              className="px-3 h-6 w-auto flex justify-center items-center self-start mb-5 -ml-3"
            >
              <FaTimes />
            </button>
            <button
              type="button"
              onClick={() => logout()}
              className="py-3 px-2 rounded border-b flex items-center text-sm"
            >
              <FaSignOutAlt className="mr-2 text-primary text-base" /> KELUAR
            </button>
          </div>
        </div>
        <div className="bg-white rounded-sm mx-5">
          <div className="border-b p-5">
            <div className="mukta text-gray-800 font-bold">{data.name}</div>
            <div className="text-sm">@{data.username}</div>
          </div>
          <div className="p-5 flex flex-col">
            <span className="text-xs">Saldo</span>
            <span className="mukta font-bold text-2xl">
              <NumericFormat
                value={data.balance}
                thousandSeparator={true}
                prefix="Rp"
                displayType="text"
              />
            </span>
          </div>
          <div className="grid grid-cols-3 grid-flow-row gap-1 px-5 rounded-b-sm border-t py-4 bg-gray-100">
            <Link
              to="/panel/topup"
              className="p-3 flex justify-center items-center rounded-sm border bg-white"
            >
              <span className="flex mr-2 justify-center items-center">
                <FiPlusSquare size={18} />
              </span>
              <span className="text-xs">Tambah</span>
            </Link>
            <Link
              to="/panel/withdraw"
              className="p-3 flex justify-center items-center rounded-sm border bg-white"
            >
              <span className="flex mr-2 justify-center items-center">
                <FiDownload size={18} />
              </span>
              <span className="text-xs">Tarik</span>
            </Link>
            <Link
              to="/panel/send"
              className="p-3 flex justify-center items-center rounded-sm border bg-white"
            >
              <span className="flex mr-2 justify-center items-center">
                <FiLogIn size={18} />
              </span>
              <span className="text-xs">Kirim</span>
            </Link>
          </div>
        </div>
      </div>
      {transaction.length ? (
        <Fragment>
          <div className="px-6 py-5 flex justify-between items-center">
            <div className="mukta font-bold text-lg text-gray-800">
              Transaksi Berlangsung
            </div>
            <div className="text-xs">Lihat Semua</div>
          </div>
          {transaction.map((value, index) => (
            <TransactionList
              to="/panel/frame"
              state={{ src: value.link }}
              data={value}
              key={`${index}`}
            />
          ))}
        </Fragment>
      ) : (
        <div className="-mt-5"></div>
      )}
      <div className="px-6 py-5 flex justify-between items-center mt-5">
        <div className="mukta font-bold text-lg text-gray-800">
          Transaksi Terakhir
        </div>
        <div className="text-xs">Lihat Semua</div>
      </div>
      {transactionLast.length ? (
        transactionLast.map((value, index) => (
          <TransactionList
            data={value}
            key={`${index}`}
            to={"/panel/detail/" + value.id}
          />
        ))
      ) : (
        <div className="p-5 text-center border mx-6 bg-gray-100">
          Belum ada transaksi
        </div>
      )}
    </Fragment>
  );
}
