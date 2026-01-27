// import { cards } from "../lib/data";
// import Card from "../ui/dashboard/card/card";
// import Chart from "../ui/dashboard/chart/chart";
// import styles from "../ui/dashboard/dashboard.module.css";
// import Rightbar from "../ui/dashboard/rightbar/rightbar";
// import Transactions from "../ui/dashboard/transactions/transactions";
import { MdSupervisedUserCircle } from "react-icons/md";

const Cards = ({ item }) => {
  return (
    <div className=" p-3 rounded-lg flex gap-5 cursor-pointer w-full bg-blue-400 hover:bg-blue-700  transition-transform">
    <MdSupervisedUserCircle size={24} />
    <div className="flex flex-col gap-3">
      <span className="">Amount</span>
      <span className="text-2xl font-medium">{item.number}</span>
      <span className="text-sm font-light">
        <span className={item.change > 0 ? "text-lime-500" : "text-red-500, text-bold"} > 
          {item.change}%
        </span>{" "}
        {item.change > 0 ? "more" : "less"} than previous week
      </span>
    </div>
  </div>
  );
};

export default Cards;