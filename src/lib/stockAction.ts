export const stockAction = async () => {
  const res = await fetch("https://api.stock.naver.com/stock/AAPL.O/integration");
  const data = await res.json();
  const { corporateOverview } = data;
  return corporateOverview;
};

export const stockAction2 = async () => {
  const res = await fetch("https://api.stock.naver.com/stock/AAPL.O/basic");
  const data = await res.json();
  const {
    stockName,
    compareToPreviousPrice,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
    reutersCode,
  } = data;
  return {
    stockName,
    compareToPreviousPrice,
    closePrice,
    compareToPreviousClosePrice,
    fluctuationsRatio,
    reutersCode,
  };
};