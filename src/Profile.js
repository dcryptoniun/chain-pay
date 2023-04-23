import React, { useState } from "react";
import confi from "./config/Config.json";
import Abi from "./config/Abi.json";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { Web3Button } from "@web3modal/react";

export default function Profile() {
  const inputProps = useInput();
  const { address, isConnected } = useAccount();
  const contractAddress = confi.CONTRACT_ADDRESS;
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

  const { data: userName } = useContractRead({
    address: contractAddress,
    abi: Abi,
    functionName: "getMyName",
    watch: true,
    args: [address],
  });
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold pb-8 text-teal-400">PROFILE SETTING</h1>
      {isConnected ? (
        <div className="flex flex-col w-md justify-center items-center gap-4">
          <h1 className="text-xl">{userName}</h1>
          <input
            variant="static"
            label="username"
            className="text-slate-500 border-2 border-teal-600 p-2"
            {...inputProps}
            placeholder=" new username"
          />
          <span className=" text-xs opacity-60">
            hint:empty value will remove the username
          </span>
          <button
            className="font-bold w-md h-auto p-2 rounded outline hover:text-teal-400 hover:bg-teal-400/10 shadow-md  shadow-black dark:shadow-white hover:shadow-emerald-500 "
            disabled={!write || isLoading}
            onClick={() => write?.()}
          >
            {isLoading ? "please wait....." : "Set new User Name ⟩⟩"}
          </button>
          {isLoading && (
            <div> Setting new User Name... please Check your Wallet</div>
          )}
          {isSuccess && (
            <div className="gap-4 flex flex-col justify-center items-center">
              <h1>Successfully minted your NFT</h1>
              <div>
                <a
                  href={`https://mumbai.polygonscan.com//tx/${data?.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 p-2 rounded-2xl text-center"
                >
                  view on Polygon scan
                </a>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col  items-center gap-4">
          <h1> Please Connect Your wallet </h1>
          <Web3Button icon="hide" />
        </div>
      )}
    </div>
  );
}
