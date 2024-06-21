type TReportdata = { name: string; code: string; price: number; change: number; percent: number };

export default function Report({ data }: { data: TReportdata }) {
  return (
    <>
      <div className="justify-start items-start gap-5 inline-flex">
        <div className="p-8 bg-white rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
          <div className="self-stretch h-14 flex-col justify-start items-start flex">
            <div className="justify-start items-center gap-2 inline-flex">
              <div className="w-8 h-8 relative">
                {/* 기업 아이콘 */}
                {/* <div className="w-8 h-8 left-0 top-0 absolute bg-black rounded-full" /> */}
              </div>
              <div className="justify-start items-center gap-2 flex">
                <div className="text-neutral-900 text-2xl font-bold font-['Pretendard'] leading-loose">
                  {data.name}
                </div>
                <div className="text-zinc-600 text-lg font-normal font-['Pretendard'] leading-7">
                  {data.code}
                </div>
              </div>
            </div>
            <div className="justify-end items-center gap-2 inline-flex">
              <div className="justify-start items-center gap-2 flex">
                <div className="text-right text-neutral-900 text-base font-medium font-['Pretendard'] leading-normal">
                  {data.price}
                </div>
                <div className="text-right text-rose-500 text-base font-normal font-['Pretendard'] leading-normal">
                  ▲{data.change}
                </div>
                <div className="text-right text-rose-500 text-base font-normal font-['Pretendard'] leading-normal">
                  +{data.percent}%{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="justify-start items-start gap-2.5 inline-flex">
            <div className="justify-start items-center gap-6 flex">
              <div className="w-32 h-32 relative">
                <div className="w-32 h-32 left-0 top-0 absolute"></div>
              </div>
              <div className="px-6 py-4 bg-stone-50 rounded-3xl flex-col justify-start items-center gap-1 inline-flex">
                <div className="w-28 justify-between items-center inline-flex">
                  <div className="text-zinc-600 text-base font-medium font-['Pretendard'] leading-normal">
                    주가
                  </div>
                  <div className="text-right text-sky-500 text-sm font-medium font-['Pretendard'] leading-tight">
                    ▲0.0%
                  </div>
                </div>
                <div className="w-28 justify-between items-center inline-flex">
                  <div className="text-zinc-600 text-base font-medium font-['Pretendard'] leading-normal">
                    투자지수
                  </div>
                  <div className="text-right text-rose-500 text-sm font-medium font-['Pretendard'] leading-tight">
                    ▲0.0%
                  </div>
                </div>
                <div className="w-28 justify-between items-center inline-flex">
                  <div className="text-zinc-600 text-base font-medium font-['Pretendard'] leading-normal">
                    수익성
                  </div>
                  <div className="text-right text-rose-500 text-sm font-medium font-['Pretendard'] leading-tight">
                    ▲0.0%
                  </div>
                </div>
                <div className="w-28 justify-between items-center inline-flex">
                  <div className="text-zinc-600 text-base font-medium font-['Pretendard'] leading-normal">
                    성장성
                  </div>
                  <div className="text-right text-rose-500 text-sm font-medium font-['Pretendard'] leading-tight">
                    ▲0.0%
                  </div>
                </div>
                <div className="w-28 justify-between items-center inline-flex">
                  <div className="text-zinc-600 text-base font-medium font-['Pretendard'] leading-normal">
                    관심도
                  </div>
                  <div className="text-right text-rose-500 text-sm font-medium font-['Pretendard'] leading-tight">
                    ▲0.0%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
