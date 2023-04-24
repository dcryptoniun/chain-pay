import React from "react";
import confi from "../config/Config.json";
import Abi from "../config/Abi.json";

import { useAccount, useContractRead } from "wagmi";

function FetchTx() {
  const { address, isConnected } = useAccount();
  const contractAddress = confi.CONTRACT_ADDRESS;

  const { data: FetchTx, loading } = useContractRead({
    address: contractAddress,
    abi: Abi,
    functionName: "getMyHistory",
    args: [address],
    select: (data) => data.map((arr) => arr.map(String)),
  });

  const [sendtx, receivetx] = FetchTx || [];
  const hasData = FetchTx?.length > 0;

  return (
    <>
      <h1>Transaction History:</h1>
      {isConnected ? (
        <div className="flex flex-col justify-between gap-2 overflow-scroll-y ">
          {loading && <span>Loading data...</span>}
          {!loading && hasData && (
            <>
              <div className="flex flex-col max-w-max-w-md">
                <span>SentTx: {sendtx}</span>
                <span> ReceiveTx: {receivetx}</span>
              </div>
            </>
          )}
          {!loading && !hasData && <span>No Transaction available</span>}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default FetchTx;

// import React from "react";
// import confi from "../config/Config.json";
// import Abi from "../config/Abi.json";

// import { useAccount, useContractRead } from "wagmi";

// function TransactionHistory({ transaction }) {
//   const { action, amount, message, otherPartyAddress, otherPartyName } =
//     transaction;

//   return (
//     <div className="flex flex-col max-w-max-w-md">
//       <span>Action: {action}</span>
//       <span>Amount: {amount} Matic</span>
//       <span>Message: {message}</span>
//       <span>Other Party Address: {otherPartyAddress}</span>
//       <span>Other Party Name: {otherPartyName}</span>
//     </div>
//   );
// }

// function FetchTx() {
//   const { address, isConnected } = useAccount();
//   const contractAddress = confi.CONTRACT_ADDRESS;

//   const { data: FetchTx, loading } = useContractRead({
//     address: contractAddress,
//     abi: Abi,
//     functionName: "getMyHistory",
//     args: [address],
//   });

//   const hasData = FetchTx?.length > 0;

//   return (
//     <>
//       <h1>Transaction History:</h1>
//       {isConnected ? (
//         <div className="flex flex-col justify-between gap-2 overflow-scroll ">
//           {loading && <span>Loading data...</span>}
//           {!loading && hasData && (
//             <>
//               {FetchTx.map((transaction, index) => (
//                 <TransactionHistory
//                   key={index}
//                   transaction={transaction}
//                 />
//               ))}
//             </>
//           )}
//           {!loading && !hasData && <span>No Transaction available</span>}
//         </div>
//       ) : (
//         <div></div>
//       )}
//     </>
//   );
// }

// export default FetchTx;
