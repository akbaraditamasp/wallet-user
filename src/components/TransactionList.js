import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import "moment/locale/id";
import { Link } from "react-router-dom";

moment.locale("id");

export default function TransactionList({ data, ...props }) {
  const Icon = data.type === "out" ? FiArrowUp : FiArrowDown;
  return (
    <div className="flex py-5 mx-6 border-b relative">
      <div className="flex-shrink-0 pr-5 flex-1">
        <div className="w-10 h-10 rounded-sm border flex justify-center items-center">
          <Icon
            size={18}
            className={data.type === "out" ? "text-red-500" : "text-blue-700"}
          />
        </div>
      </div>
      <div className="w-3/5">
        <div className="font-bold text-sm line-clamp-1">{data.title}</div>
        <div className="text-xs line-clamp-1">
          {moment(data.updated_at).format("DD MMMM YYYY H:m")}
        </div>
      </div>
      <div className="text-sm font-bold mukta w-2/5 text-right">
        <NumericFormat
          thousandSeparator={true}
          prefix="Rp"
          value={data.amount}
          displayType="text"
        />
      </div>
      <Link {...props} className="absolute top-0 left-0 w-full h-full"></Link>
    </div>
  );
}
