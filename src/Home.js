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
    <div className=" flex flex-col justify-center space-y-5  items-center  ">
      <div>
        <h1 className="text-3xl dark:text-teal-300 font-bold font-mono ">
          CHAIN🔗PAY
        </h1>
      </div>
      <div className="flex w-full   bg-black/5 dark:bg-white/5 max-w-sm md:max-w-3xl h-auto  flex-col justify-center md:justify-between p-5 items-center rounded-3xl">
        <div className=" flex-grow w-full items-center text-center justify-center max-w-md h-auto m-1 p-5 flex-col rounded-2xl ">
          {isConnected ? (
            <div>
              <div className="flex flex-col justify-center items-center gap-4">
                <div className=" flex flex-col justify-center  items-center bg-gradient-to-b from-teal-600 to-fuchsia-800  gap-2 text-center rounded-2xl m-1  w-28 h-auto  p-5 tracking-tight md:tracking-wide leading-5">
                  <img src={User} alt="userlogo" className="w-8  " />

                  <h1>{userName}</h1>
                </div>
                <Reqest />

                <button
                  className="font-bold w-1/2 h-auto p-2 rounded outline hover:text-teal-400 hover:bg-teal-400/10 shadow-md  shadow-black dark:shadow-white hover:shadow-emerald-500 "
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
                        className="bg-red-500 p-1"
                      >
                        view on Polygon scan
                      </a>
                    </div>
                  </div>
                )}
              </div>
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
