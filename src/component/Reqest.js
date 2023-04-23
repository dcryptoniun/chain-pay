// import React from "react";
// import confi from "../config/Config.json";
// import Abi from "../config/Abi.json";

// import { useAccount, useContractRead } from "wagmi";

// function Reqest() {
//   const { address } = useAccount();
//   const contractAddress = confi.CONTRACT_ADDRESS;

//   const { data: fetchreqest } = useContractRead({
//     address: contractAddress,
//     abi: Abi,
//     functionName: "getMyRequests",
//     // watch: true,
//     args: [address],
//     select: (data) => data.map((arr) => arr.map(String)),
//   });

//   const [addresses, uints, strings1, strings2] = fetchreqest;

//   return (
//     <div className="flex flex-col gap-2">
//       <div className="flex flex-row gap-2">
//         <span>
//           Requested by=
//           {strings2}:{addresses}
//         </span>
//       </div>

//       <span>amount:{uints} Matic</span>
//       <span>Message: {strings1}</span>
//     </div>
//   );
// }

// export default Reqest;

import React, { useState } from "react";
import confi from "../config/Config.json";
import Abi from "../config/Abi.json";

import { useAccount, useContractRead } from "wagmi";

function Request() {
  const { address } = useAccount();
  const contractAddress = confi.CONTRACT_ADDRESS;

  const { data: fetchRequest, loading } = useContractRead({
    address: contractAddress,
    abi: Abi,
    functionName: "getMyRequests",
    args: [address],
    select: (data) => data.map((arr) => arr.map(String)),
  });

  const [addresses, uints, strings1, strings2] = fetchRequest;

  const [showData, setShowData] = useState(false);

  const hasData = addresses?.length > 0;

  const toggleShowData = () => {
    setShowData(!showData);
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
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
            className="font-bold w-fit text-center h-auto p-2 rounded outline hover:text-teal-400 hover:bg-teal-400/10 shadow-md  shadow-black dark:shadow-white hover:shadow-emerald-500"
            onClick={toggleShowData}
          >
            {showData ? "Hide Request" : "Show Request"}
          </button>
        </>
      )}
      {!loading && !hasData && <span>No Request available</span>}
    </div>
  );
}

export default Request;
