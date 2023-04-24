import React, { useState } from "react";
import confi from "../contract/Config.json";
import Abi from "../contract/Abi.json";

import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

function SendMatic() {
  const { address, isConnected } = useAccount();
  const contractAddress = confi.CONTRACT_ADDRESS;
  const [amount, setAmount] = useState(0);
  const [sendAddress, setsendAddress] = useState("");

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: Abi,
    functionName: "sendEth",
    args: [sendAddress, amount],
    overrides: {
      value: String(Number(amount * 1e18)),
    },
  });
  const { data, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (address.toLowerCase() === sendAddress.toLowerCase()) {
      alert("You cannot use your own address as the user parameter.");
      return;
    }
    await write();
  };
  return (
    <>
      <div>
        <h1>Send Matic without Request</h1>
        {isConnected ? (
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center gap-2"
            >
              <label className="relative flex items-center gap-1">
                Address:
                <input
                  type="text"
                  className="border-2 border-teal-300 rounded-xl text-slate-500"
                  placeholder="wallet add...."
                  value={sendAddress}
                  onChange={(e) => setsendAddress(e.target.value)}
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
                  placeholder="1"
                  className="border-2 border-teal-300 rounded-xl text-slate-500"
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
                    enter amount in Matic (currently supported in sum of 1)
                  </span>
                </span>
              </label>
              <button
                className="h-auto p-2 font-bold rounded shadow-md w-md outline hover:text-teal-400 hover:bg-teal-400/10 shadow-black dark:shadow-white hover:shadow-emerald-500"
                disabled={!write || isLoading}
                type="submit"
              >
                {isLoading ? "Sending Matic..." : "Send Matic"}
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
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default SendMatic;
