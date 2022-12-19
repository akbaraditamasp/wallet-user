import { NumericFormat } from "react-number-format";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { useForm, Controller } from "react-hook-form";
import Loading from "../components/Loading";
import { useState } from "react";
import { service } from "../service";
import toast from "react-simple-toasts";
import { useNavigate } from "react-router-dom";

export default function TopUp() {
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const process = ({ amount }) => {
    setLoading(true);
    service
      .post("/transaction/topup", { amount })
      .then((response) => {
        setLoading(false);
        navigate("/panel/frame", {
          state: { src: response.data.link },
          replace: true,
        });
      })
      .catch(() => {
        setLoading(false);
        toast("Terjadi kesalahan");
      });
  };

  return (
    <form
      onSubmit={handleSubmit(process)}
      className="min-h-screen flex flex-col"
    >
      <Heading back={true}>Tambah Saldo</Heading>
      <div className="flex-1">
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
                validate: (value) => parseInt(value) > 10000,
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
        </div>
      </div>
      <div className="p-6">
        <Button type="submit">Lanjutkan</Button>
      </div>
      {loading && <Loading />}
    </form>
  );
}
