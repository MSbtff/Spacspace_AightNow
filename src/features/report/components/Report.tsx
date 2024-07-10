import Icon from "@/components/Stock/Icon";
import TextButton from "@/components/btnUi/TextButton";
import Summary from "./Summary";
import Chart from "./Chart";

import Analysis from "./Analysis";
import FavoriteNews from "./FavoriteNews";
import { addDoc, collection, getDoc, deleteDoc } from "firebase/firestore";
import fireStore from "@/firebase/firestore";
import { exchangeRate, stockAction, stockAction2 } from "@/lib/stockAction";
import { stockRealTime } from "@/app/api/stock/route";
import { stockEvaluation } from "@/lib/stockEvluation";
import AIReport from "./AIReport";
import { stockAnalysis } from "@/lib/stockAnalysis";

type TParams = {
  id: string;
};

export default async function Report({ id }: TParams) {
  console.log(id);
  const appleStock = await stockAction(id);
  const appleStock2 = await stockAction2(id);
  const { stockName, reutersCode } = appleStock2;
  const stockCode = reutersCode.split(".")[0];
  const stockHistory = await stockRealTime(id);

  const exchange = await exchangeRate();

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="w-[1200px] h-16  flex justify-between items-center  ">
          <div className="w-[388px] h-16 flex items-center gap-2">
            <Icon name={id} size={50} />
            <span className="text-lg font-medium">
              {stockName} · {stockCode}
            </span>
          </div>
          <TextButton size="custom" width={"167px"} height={"56px"}>
            관심종목 추가
          </TextButton>
        </div>
        <div className="w-[1200px] flex gap-4">
          <Summary overview={appleStock} stockInfo={appleStock2} exchange={exchange} />
          <Chart stockData={stockHistory} />
        </div>
        <div className=" w-[1200px] flex gap-4 ">
          <AIReport />
          <Analysis stockName={stockName} stockInfo={appleStock2} id={id} />
        </div>
        <FavoriteNews />
      </div>
    </>
  );
}
