import { NumericFormat } from "react-number-format";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { useForm, Controller } from "react-hook-form";
import Loading from "../components/Loading";
import { useState } from "react";
import { service } from "../service";
import toast from "react-simple-toasts";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import { GoPerson } from "react-icons/go";

export default function Send() {
  const { control, handleSubmit, setValue, watch, register, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const getUser = (user) => {
    setLoading(true);
    service
      .get(`/user/username/${user}`)
      .then((response) => {
        setValue("receiver_id", response.data.id);
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast("Pengguna tidak ditemukan");
      });
  };

  return (
    <form
      onSubmit={handleSubmit((data) =>
        navigate("/panel/pin", {
          replace: false,
          state: {
            dataKey: "data",
            serviceProps: {
              method: "POST",
              url: "/transaction/send",
            },
            values: data,
            navigate: {
              to: "/panel/detail/",
              props: {
                replace: true,
              },
            },
          },
        })
      )}
      className="min-h-screen flex flex-col"
    >
      <Heading back={true}>Kirim Saldo</Heading>
      <div className="flex-1">
        <div className="m-6 border rounded-sm">
          <div className="p-5 py-3 bg-gray-100 rounded-t-sm border-b">
            Tujuan
          </div>
          <div className="p-5">
            {watch("receiver_id") ? (
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full border mr-5 flex-shrink-0 flex justify-center items-center">
                  <GoPerson />
                </div>
                <div className="flex-1 mr-3">
                  <div className="mukta text-gray-800 font-bold">
                    {user.name}
                  </div>
                  <div className="text-sm">@{user.username}</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    reset({
                      receiver_id: "",
                      amount: "",
                      note: "",
                    });
                  }}
                  className="py-1 px-3 text-xs border border-primary-shade text-primary-shade rounded-sm"
                >
                  Ganti
                </button>
              </div>
            ) : (
              <TextInput
                left={GoPerson}
                type="text"
                placeholder="Username"
                onBlur={(e) => {
                  if (e.target.value) {
                    getUser(e.target.value);
                  }
                }}
              />
            )}
          </div>
        </div>
        {watch("receiver_id") ? (
          <div className="m-6 border rounded-sm">
            <div className="p-5 py-3 bg-gray-100 rounded-t-sm border-b">
              Nominal
            </div>
            <div className="p-5">
              <Controller
                control={control}
                name="amount"
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange } }) => (
                  <NumericFormat
                    allowNegative={false}
                    onValueChange={({ value }) => onChange(parseInt(value))}
                    thousandSeparator={true}
                    prefix="Rp"
                    className="w-full text-xl focus:outline-none"
                    placeholder="Rp0"
                    value={value}
                  />
                )}
              />
            </div>
            <div className="p-5 border-t">
              <TextInput
                type="text"
                placeholder="Catatan"
                className="text-sm"
                {...register("note")}
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className="p-6">
        <Button type="submit">Lanjutkan</Button>
      </div>
      {loading && <Loading />}
    </form>
  );
}
