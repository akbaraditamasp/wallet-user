import Heading from "../components/Heading";
import {
  AiFillCheckCircle,
  AiFillCalendar,
  AiFillCreditCard,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import { service } from "../service";
import { useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import moment from "moment";

export default function Detail() {
  const [data, setData] = useState({});
  const { id } = useParams();

  const getData = () => {
    service
      .get("/transaction/" + id)
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      <Heading back={true} transparent className="text-white border-b-0" />
      <div className="p-6 flex-1">
        <div className="bg-white rounded-lg mt-16">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 -mt-10 border-white flex justify-center items-center rounded-full border-4 bg-gray-700">
              <AiFillCheckCircle size={50} className="text-white" />
            </div>
          </div>
          <div className="py-2 pb-8 px-5 border-b text-center">
            <div className="mukta text-lg font-bold text-gray-800">
              {data.title}
            </div>
            {moment(data.updated_at).format("DD MMM YYYY HH:mm")}
          </div>
          <div className="text-center flex flex-col items-center py-8 px-5 border-b">
            <div className="text-sm">Nominal</div>
            <div className="text-3xl font-bold mukta">
              <NumericFormat
                value={data.amount}
                prefix="Rp"
                thousandSeparator={true}
                displayType="text"
              />
            </div>
            {data.note && (
              <div className="text-sm mt-2 py-1 px-3 bg-gray-300 rounded-full">
                {data.note}
              </div>
            )}
          </div>
          <div className="p-5 text-center text-sm flex flex-col items-center bg-gray-100 rounded-b-md">
            <span className="text-xs">Invoice ID</span>
            <span>{data.invoice_id?.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
