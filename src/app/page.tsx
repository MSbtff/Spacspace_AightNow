import BasicIcon from "@/components/Icon/BasicIcons";
import UserHome from "@/features/Main/UserHome";
import Report from "@/features/report/components/Report";
import StockApi from "@/features/report/components/api/StockApi";
import SearchPage from "@/features/search/SearchPage";
export default function Home() {
  return (
    <>
      <div className=" h-full">
        <Report />
      </div>
    </>
  );
}
