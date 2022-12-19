import { ReactComponent as WelcomeAnimation } from "../assets/Welcome.svg";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export default function Welcome() {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token) {
      navigate("/panel");
    }
  }, [cookies.token]);

  return (
    <div className="flex flex-col bg-gray-200 h-screen">
      <div className="flex-1 flex justify-center items-center">
        <WelcomeAnimation className="w-5/6 h-auto text-primary" />
      </div>
      <div className="bg-white">
        <div className="px-8 pt-12 pb-3 text-3xl text-gray-800 mukta font-bold">
          Selamat Datang!
        </div>
        <div className="px-8">
          Kelola tabungan sekolahmu lebih gampang. Kirim dan tarik uang dengan
          cepat melalui aplikasi.
        </div>
        <div className="px-8 py-12 flex">
          <Link
            to="/login"
            className="px-16 py-4 bg-primary rounded-sm w-full text-white mukta text-center"
          >
            Mulai
          </Link>
        </div>
      </div>
    </div>
  );
}
