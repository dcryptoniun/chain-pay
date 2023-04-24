import React from "react";
import confi from "./config/Config.json";
import Abi from "./config/Abi.json";
import User from "./Image/user.svg";

import { useAccount, useContractRead } from "wagmi";
import { Web3Button } from "@web3modal/react";
// import Reqest from "./component/Reqest";
import History from "./component/FetchTx";

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
    <div className="flex flex-col items-center justify-center p-5 space-y-5 ">
      <div>
        <h1 className="font-mono text-3xl font-bold dark:text-teal-300 ">
          CHAIN🔗PAY
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-auto">
        <div className="flex-col items-center justify-center flex-grow w-full h-auto max-w-md p-5 m-1 text-center rounded-2xl">
          {isConnected ? (
            <div className="flex flex-col max-w-sm p-5 bg-black/5 dark:bg-white/5 md:max-w-3xl md:justify-between rounded-3xl">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex flex-col items-center justify-center h-auto gap-2 p-5 m-1 leading-5 tracking-tight text-center bg-gradient-to-b from-teal-600 to-fuchsia-800 rounded-2xl w-28 md:tracking-wide">
                  <img src={User} alt="userlogo" className="w-8 " />

                  <h1>{userName}</h1>
                </div>
                {/* <Reqest /> */}
              </div>
            </div>
          ) : (
            <div>
              <Web3Button icon="hide" />
            </div>
          )}
        </div>
      </div>
      <div className="p-5 max-w-screen">
        <History />
      </div>
    </div>
  );
}

export default Home;
