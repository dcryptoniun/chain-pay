import React, { useState } from "react";
import confi from "../config/Config.json";
import Abi from "../config/Abi.json";

import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

function NewReq() {
  const { address, isConnected } = useAccount();
  const contractAddress = confi.CONTRACT_ADDRESS;

  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [reqAddress, setReqAddress] = useState("");

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: Abi,
    functionName: "createRequest",
    args: [reqAddress, amount, message],
  });

  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate reqAddress
    if (address.toLowerCase() === reqAddress.toLowerCase()) {
      alert("You cannot use your own address as the user parameter.");
      return;
    }
    await write();
  };
  const [showData, setShowData] = useState(false);
  const toggleShowData = () => {
    setShowData(!showData);
  };

  return (
    <div>
      {isConnected ? (
        <>
          {showData && (
            <>
              <div className="flex flex-col gap-2 p-2 text-slate-500">
                <h1>Create Request</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <label>
                    User Address:
                    <input
                      type="text"
                      value={reqAddress}
                      onChange={(e) => setReqAddress(e.target.value)}
                    />
                  </label>
                  <label>
                    Amount:
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </label>
                  <label>
                    Message:
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </label>
                  <button
                    className="h-auto p-2 font-bold rounded shadow-md w-md outline hover:text-teal-400 hover:bg-teal-400/10 shadow-black dark:shadow-white hover:shadow-emerald-500 "
                    disabled={!write || isLoading}
                    type="submit"
                  >
                    {isLoading ? "Creating Request..." : "Create Request"}
                  </button>
                  {isSuccess && <span>Request created successfully!</span>}
                </form>
                {isSuccess && (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <h1>Reqest Sent Successfully</h1>
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
            </>
          )}
          <button
            className="h-auto p-2 font-bold text-center rounded shadow-md w-fit outline hover:text-teal-400 hover:bg-teal-400/10 shadow-black dark:shadow-green-500 hover:shadow-emerald-500"
            onClick={toggleShowData}
          >
            {showData ? "X" : "Create New Request"}
          </button>
        </>
      ) : (
        <div>Please connect to a wallet to create a request.</div>
      )}
    </div>
  );
}

export default NewReq;
