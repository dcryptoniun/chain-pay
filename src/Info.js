import React from "react";

function Info() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-600 ">
      <h1 className="mb-8 text-4xl font-bold">Chain🔗Pay</h1>
      <div className="w-full max-w-md">
        <div className="p-8 rounded-lg shadow-lg dark:bg-white/5 bg-black/5">
          <h2 className="mb-4 text-2xl font-bold text-center">Features</h2>
          <ul className="pl-8 list-disc">
            <li>Request payment</li>
            <li>Send payment to request</li>
            <li>Send payment without request</li>
            <li>Set on-chain username</li>
            <li>
              Track transaction history of tx done with Chain Pay smart contract
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Info;
