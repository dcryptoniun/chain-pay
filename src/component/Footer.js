import React from "react";

function Footer() {
  return (
    <div className="flex  text-black dark:text-white bg-[#ECF2FF] dark:bg-[#0f172a]  justify-between w-full p-2 h-fit">
      <h1>2023©ChainPay</h1>
      <h1>
        made with ❤️ by{" "}
        <a href="https://mayank-meena.vercel.app/" target="blank">
          {" "}
          0xMM{" "}
        </a>
      </h1>
    </div>
  );
}

export default Footer;
