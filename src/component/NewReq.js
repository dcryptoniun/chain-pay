import React, { useState } from "react";
import confi from "../contract/Config.json";
import Abi from "../contract/Abi.json";

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
              <div className="flex flex-col gap-2 p-2 ">
                <h1 className="">Create Request</h1>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  <label className="relative flex items-center gap-1">
                    Address:
                    <input
                      type="text"
                      className="border-2 border-teal-300 rounded-lg text-slate-500"
                      placeholder="wallet add...."
                      value={reqAddress}
                      onChange={(e) => setReqAddress(e.target.value)}
                    />
                    <span className=" group">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                      <span className="absolute hidden group-hover:flex -top-2 -right-3 translate-x-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm before:content-[''] before:absolute before:top-1/2  before:right-[100%] before:-translate-y-1/2 before:border-8 before:border-y-transparent before:border-l-transparent before:border-r-gray-700">
                        enter wallet address
                      </span>
                    </span>
                  </label>
                  <label className="relative flex items-center gap-1">
                    Amount:
                    <input
                      type="amount"
                      min="1"
                      step="1"
                      className="border-2 border-teal-300 rounded-lg text-slate-500"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <span className="relative group">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                      <span className="absolute hidden group-hover:flex -top-2 -right-3 translate-x-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm before:content-[''] before:absolute before:top-1/2  before:right-[100%] before:-translate-y-1/2 before:border-8 before:border-y-transparent before:border-l-transparent before:border-r-gray-700">
                        enter amount (currently supported in sum of 1)
                      </span>
                    </span>
                  </label>
                  <label className="relative flex items-center gap-1">
                    Message:
                    <input
                      type="text"
                      className="border-2 border-teal-300 rounded-lg text-slate-500"
                      placeholder="message...."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <span className="relative group">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-4 h-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                      <span className="absolute hidden group-hover:flex -top-2 -right-3 translate-x-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm before:content-[''] before:absolute before:top-1/2  before:right-[100%] before:-translate-y-1/2 before:border-8 before:border-y-transparent before:border-l-transparent before:border-r-gray-700">
                        enter message
                      </span>
                    </span>
                  </label>
                  <button
                    className="h-auto p-2 font-bold rounded shadow-md w-md outline hover:text-teal-400 hover:bg-teal-400/10 shadow-black dark:shadow-white hover:shadow-emerald-500"
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
            {showData ? "X" : "Send New Request"}
          </button>
        </>
      ) : (
        <div>Please connect to a wallet to create a request.</div>
      )}
    </div>
  );
}

export default NewReq;
