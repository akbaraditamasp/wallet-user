import { Fragment, useState } from "react";
import Heading from "../components/Heading";
import TextInput from "../components/TextInput";
import { FaUser, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-simple-toasts";
import Loader from "../components/Loader";
import { service } from "../service";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState();
  const setCookie = useCookies(["token"])[1];
  const navigate = useNavigate();

  const login = ({ username, password }) => {
    setLoading(true);
    service
      .get("/user/login", {
        params: {
          username,
          password,
        },
      })
      .then((response) => {
        setCookie("token", response.data.token, {
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
        });
        service.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        navigate("/panel");
      })
      .catch(() => {
        setLoading(false);
        toast("Username atau password salah");
      });
  };

  return (
    <Fragment>
      <Heading back={true} />
      <div className="p-6">
        <div className="mb-3 text-gray-800 mukta text-3xl font-bold mt-5">
          Login
        </div>
        Silahkan masuk ke akun anda untuk lanjut menggunakan e-Wallet SMK PGRI 1
        Palembang.
      </div>
      <form onSubmit={handleSubmit(login)} className="p-6">
        <TextInput
          left={FaUser}
          placeholder="Username"
          containerClassName="mb-4"
          type="text"
          {...register("username", { required: true })}
        />
        <TextInput
          type="password"
          left={FaLock}
          placeholder="Password"
          containerClassName="mb-8"
          {...register("password", { required: true })}
        />
        <Button disabled={loading} type="submit">
          {loading ? <Loader className="w-6 h-6" /> : "Masuk"}
        </Button>
      </form>
      <div className="text-center">
        Belum punya akun?{" "}
        <Link to="/register" className="text-primary">
          Buat Akun
        </Link>
      </div>
    </Fragment>
  );
}
