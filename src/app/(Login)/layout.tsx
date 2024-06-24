import Header from "@/components/Header";

export const metadata = {
  title: {
    template: "%s | AightNow",
    default: "AightNow",
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`font-pretendard w-[100vw] h-[100vh] flex flex-col`}>
      <Header />
      <section className="bg-background w-full h-full flex justify-center items-center flex-col relative">
        <div className=" rounded-3xl w-[590px] min-h-[544px]  px-[102px] py-[80px] bg-white flex flex-col justify-start items-center">
          {children}
        </div>
      </section>
    </div>
  );
}