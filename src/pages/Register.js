import { Fragment, useEffect, useState } from "react";
import Heading from "../components/Heading";
import TextInput from "../components/TextInput";
import { FaUser, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-simple-toasts";
import Loader from "../components/Loader";
import { service } from "../service";
import { useCookies } from "react-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Register() {
  const { register, handleSubmit, watch } = useForm();
  const [loading, setLoading] = useState();
  const setCookie = useCookies(["token"])[1];
  const navigate = useNavigate();
  const { state } = useLocation();

  const login = ({ username, password, name }) => {
    navigate("/pin", {
      replace: true,
      state: {
        dataKey: "data",
        serviceProps: {
          method: "POST",
          url: "/user",
        },
        values: {
          username,
          password,
          name,
        },
        navigate: {
          notForwardId: true,
          to: "/register",
          props: {
            replace: true,
          },
        },
      },
    });
  };

  useEffect(() => {
    if (state?.token) {
      setCookie("token", state.token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
      service.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${state.token}`;
      navigate("/panel");
    }
    console.log(state);
  }, [state]);

  return (
    <Fragment>
      <Heading back={true} />
      <div className="p-6">
        <div className="mb-3 text-gray-800 mukta text-3xl font-bold mt-5">
          Buat Akun Baru
        </div>
        Buat akun e-Wallet baru untuk memulai
      </div>
      <form onSubmit={handleSubmit(login)} className="p-6">
        <TextInput
          label="Username"
          containerClassName="mb-4"
          type="text"
          {...register("username", { required: true })}
        />
        <TextInput
          type="password"
          label="Password"
          containerClassName="mb-4"
          {...register("password", { required: true })}
        />
        <TextInput
          type="password"
          label="Ulangi Password"
          containerClassName="mb-4"
          {...register("password2", {
            required: true,
            validate: (value) => watch("password") === value,
          })}
        />
        <TextInput
          type="text"
          label="Nama Lengkap"
          containerClassName="mb-8"
          {...register("name", { required: true })}
        />
        <Button disabled={loading} type="submit">
          {loading ? <Loader className="w-6 h-6" /> : "Daftar"}
        </Button>
      </form>
    </Fragment>
  );
}
