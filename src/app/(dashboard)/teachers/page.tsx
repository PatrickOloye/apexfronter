import FooterS from "@/components/ui/Footer-single";
import Card from "../../../components/ui/Card-Teacher";
import Chart from "../../../components/ui/chart";
import Rightbar from "../../../components/ui/RightBar-Teacher";
import Transactions from "../../../components/ui/Transactions";
import { cards } from "./teacherCards";


const Teacher = () => {
  return (
    <div className="flex gap-5 mt-5">
      <div className="flex-4 flex flex-col gap-5">
      {/* <div className="flex-3 flex flex-col gap-5"> */}
        <div className="flex gap-5 justify-between">
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <Transactions />
        <Chart />
        <FooterS/>
      </div>
      {/* <div className="flex-1">
        <Rightbar />
      </div> */}
    </div>
  );
};

export default Teacher;
