import React, { useState } from "react";
import confi from "./config/Config.json";
import Abi from "./config/Abi.json";
import User from "./Image/user.svg";

import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { Web3Button } from "@web3modal/react";
import Reqest from "./component/Reqest";
import History from "./component/FetchTx";

function Home() {
  const inputProps = useInput();
  const { address, isConnected } = useAccount();
  const contractAddress = confi.CONTRACT_ADDRESS;

  const { data: userName } = useContractRead({
    address: contractAddress,
    abi: Abi,
    functionName: "getMyName",
    // watch: true,
    args: [address],
    // onSuccess(data) {
    //   console.log("Success", data);
    // },
    // onError(error) {
    //   console.log("Error", error);
    // },
    // onSettled(data, error) {
    //   console.log("Settled", { data, error });
    // },
  });

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: Abi,
    functionName: "addName",
    args: [inputProps.value],
  });
  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  function useInput(defaultValue) {
    const [value, setValue] = useState(defaultValue);
    function onChange(e) {
      setValue(e.target.value);
    }
    return {
      value,
      onChange,
    };
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-5 ">
      <div>
        <h1 className="font-mono text-3xl font-bold dark:text-teal-300 ">
          CHAIN🔗PAY
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-auto max-w-sm p-5 bg-black/5 dark:bg-white/5 md:max-w-3xl md:justify-between rounded-3xl">
        <div className="flex-col items-center justify-center flex-grow w-full h-auto max-w-md p-5 m-1 text-center rounded-2xl">
          {isConnected ? (
            <div>
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex flex-col items-center justify-center h-auto gap-2 p-5 m-1 leading-5 tracking-tight text-center bg-gradient-to-b from-teal-600 to-fuchsia-800 rounded-2xl w-28 md:tracking-wide">
                  <img src={User} alt="userlogo" className="w-8 " />

                  <h1>{userName}</h1>
                </div>
                <Reqest />

                <button
                  className="w-1/2 h-auto p-2 font-bold rounded shadow-md outline hover:text-teal-400 hover:bg-teal-400/10 shadow-black dark:shadow-white hover:shadow-emerald-500 "
                  disabled={!write || isLoading}
                  onClick={() => write?.()}
                >
                  {isLoading ? "fetching..." : "fetch ⟩⟩"}
                </button>
                {isLoading && <div> fetching... please Check your Wallet</div>}
                {isSuccess && (
                  <div>
                    <h1>Successfully fetched</h1>
                    <div>
                      <a
                        href={`https://mumbai.polygonscan.com//tx/${data?.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 bg-red-500"
                      >
                        view on Polygon scan
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <History />
            </div>
          ) : (
            <div>
              <Web3Button icon="hide" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
