import React from "react";
import confi from "./contract/Config.json";
import Abi from "./contract/Abi.json";
import User from "./Image/user.svg";

import { useAccount, useContractRead } from "wagmi";
import { Web3Button } from "@web3modal/react";
import History from "./component/FetchTx";
import NewReq from "./component/NewReq";
import Request from "./component/Reqest";
import SendMatic from "./component/SendMatic";

function Home() {
  const { address, isConnected } = useAccount();
  const contractAddress = confi.CONTRACT_ADDRESS;

  const { data: userName } = useContractRead({
    address: contractAddress,
    abi: Abi,
    functionName: "getMyName",
    args: [address],
  });

  return (
    <div className="flex flex-col items-center justify-center   text-black h-screen dark:text-white bg-[#ECF2FF] dark:bg-[#0f172a] ">
      <div>
        <h1 className="font-mono text-4xl font-bold dark:text-teal-300 ">
          CHAIN🔗PAY
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center lg:flex-row">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex-col items-center justify-center w-full h-auto max-w-md p-5 m-1 text-center rounded-2xl">
            {isConnected ? (
              <div className="flex flex-col max-w-sm p-5 bg-black/5 dark:bg-white/5 md:max-w-3xl md:justify-between rounded-3xl">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="flex flex-col items-center justify-center h-auto gap-2 p-5 m-1 text-center bg-gradient-to-b from-teal-600 to-fuchsia-800 rounded-2xl w-28 md:tracking-wide">
                    <img src={User} alt="userlogo" className="w-8 " />
                    <h1>{userName}</h1>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <NewReq />
                    </div>
                    <div>
                      <Request />
                    </div>
                    <div>
                      <SendMatic />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Web3Button icon="hide" />
              </div>
            )}
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
