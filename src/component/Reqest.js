import React, { useState } from "react";
import confi from "../config/Config.json";
import Abi from "../config/Abi.json";

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
        <div className="flex flex-col items-center justify-center gap-2">
          {loading && <span>Loading data...</span>}
          {!loading && hasData && (
            <>
              {showData && (
                <>
                  <div className="flex flex-row gap-2">
                    <span>
                      Requested by {strings2}: {addresses}
                    </span>
                  </div>
                  <span>Amount: {uints} Matic</span>
                  <span>Message: {strings1}</span>
                </>
              )}
              <button
                className="h-auto p-2 font-bold text-center rounded shadow-md w-fit outline hover:text-teal-400 hover:bg-teal-400/10 shadow-black dark:shadow-white hover:shadow-emerald-500"
                onClick={toggleShowData}
              >
                {showData ? "Hide Request" : "New Request"}
              </button>
            </>
          )}
          {!loading && !hasData && <span>No Request available</span>}
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
