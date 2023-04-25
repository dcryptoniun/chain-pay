import { Web3Button } from "@web3modal/react";
import SendMatic from "./component/SendMatic";
import NewReq from "./component/NewReq";
import Request from "./component/Reqest";
import History from "./component/FetchTx";

import React from "react";
import Profile from "./component/Profile";

function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col items-center justify-center h-full gap-4 md:flex-row">
          <div className="flex flex-col w-auto h-auto gap-4 p-5 rounded-xl bg-black/5 dark:bg-white/5">
            <h1 className="text-3xl font-bold text-center text-transparent md:text-start bg-clip-text bg-gradient-to-t from-teal-300 to-fuchsia-300 hover:bg-gradient-to-b">
              CHAIN🔗PAY
            </h1>
            <p className="text-xl ">
              {" "}
              Send Crypto <br />
              Across The world{" "}
            </p>
            <Profile />
            <div className="rounded-lg bg-black/20 dark:bg-white/5">
              <Web3Button balance="show" />
            </div>

            <div className="flex flex-col w-auto h-auto p-5 rounded-xl bg-black/5 dark:bg-white/5">
              <Request />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center justify-center w-auto h-auto p-5 rounded-xl bg-black/5 dark:bg-white/5">
              <NewReq />
            </div>

            <div className="flex flex-col w-auto h-auto p-5 rounded-xl bg-black/5 dark:bg-white/5">
              <SendMatic />
            </div>
          </div>
        </div>
        <div>
          <History />
        </div>
      </div>
    </div>
  );
}

export default Home;
