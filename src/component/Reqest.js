import React, { useState } from "react";
import confi from "../contract/Config.json";
import Abi from "../contract/Abi.json";

import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

function Request() {
  const { address, isConnected } = useAccount();
  const contractAddress = confi.CONTRACT_ADDRESS;

  const { data: fetchRequest, loading } = useContractRead({
    address: contractAddress,
    abi: Abi,
    functionName: "getMyRequests",
    watch: true,
    args: [address],
    select: (data) => data.map((arr) => arr.map(String)),
  });
  const [addresses, uints, strings1, strings2] = fetchRequest || [];

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: Abi,
    functionName: "payRequest",
    args: [0],
    overrides: {
      value: String(Number(uints * 1e18)),
    },
  });
  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const [showData, setShowData] = useState(false);

  const hasData = addresses?.length > 0;

  const toggleShowData = () => {
    setShowData(!showData);
  };

  return (
    <>
      {isConnected ? (
        <div className="flex flex-col items-center justify-center w-full max-w-md gap-2 p-3 overflow-hidden ">
          {loading && <span>Loading data...</span>}
          {!loading && hasData && (
            <>
              {showData && (
                <>
                  <div>
                    <span>Requested by {strings2}</span>
                  </div>
                  <span className="text-xs">:{addresses}</span>
                  <span>Amount: {uints} Matic</span>
                  <span>Message: {strings1}</span>
                </>
              )}
              <button
                className="h-auto p-2 font-bold text-center rounded shadow-md w-fit outline hover:text-teal-400 shadow-black dark:shadow-green-500 hover:shadow-emerald-500"
                onClick={toggleShowData}
              >
                {showData ? "Hide Request" : "New Request Recieved"}
              </button>
            </>
          )}
          {!loading && !hasData && (
            <span className="text-xs">No New Request available</span>
          )}
          {showData && (
            <>
              <button
                className="h-auto p-2 font-bold rounded shadow-md w-md outline hover:text-teal-400 hover:bg-teal-400/10 shadow-black dark:shadow-white hover:shadow-emerald-500 "
                disabled={!write || isLoading}
                onClick={() => write?.()}
              >
                {isLoading ? "please wait....." : "Pay Request ⟩⟩"}
              </button>
            </>
          )}

          {isLoading && (
            <div> Paying..... please Check your Wallet for any pending tx</div>
          )}
          {isSuccess && (
            <div className="flex flex-col items-center justify-center gap-4">
              <h1>Payment Successfull</h1>
              <div>
                <a
                  href={`https://mumbai.polygonscan.com//tx/${data?.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-center bg-green-500 rounded-2xl"
                >
                  view on Polygon scan
                </a>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Request;
