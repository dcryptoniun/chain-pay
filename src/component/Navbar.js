import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { Link } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import config from "../contract/Config.json";
import ScanLogo from "../Image/matic_logo.svg";
import GithubLogo from "../Image/github.svg";

function Navebar() {
  const scanLink = config.SCAN_LINK;
  const github = config.github;
  return (
    <nav className="flex flex-col justify-center w-full shadow-xl h-fit md:flex-row md:justify-between rounded-xl">
      <div className="flex items-center justify-center p-2 mx-2 md:justify-start">
        <Link to="/">
          <span className="px-2 mx-2 text-2xl text-transparent bg-clip-text bg-gradient-to-t from-teal-300 to-fuchsia-300 hover:bg-gradient-to-b">
            {" "}
            CHAIN🔗PAY
          </span>
        </Link>
        <div className="block md:hidden">
          <ThemeSwitch />
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex items-center justify-around p-2 px-4">
          <Link
            to="/"
            className="p-1 px-2 mx-2 border-teal-500 hover:text-teal-400 hover:border-b-4 rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
          </Link>
          <Link
            to={github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 px-2 mx-2 border-teal-500 hover:border-b-4 rounded-xl"
          >
            <img src={GithubLogo} alt="githublink" width={30} height={10} />
          </Link>

          <Link
            to={scanLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 px-2 mx-2 border-teal-500 hover:border-b-4 rounded-xl"
          >
            <img src={ScanLogo} alt="scanlink" width={30} height={10} />
          </Link>
          <div className="relative flex justify-around p-2">
            <div className="hidden px-1 mx-1 md:block">
              <Web3NetworkSwitch />
            </div>
            <div className="px-1 mx-1 ">
              <Web3Button icon="hide" />
            </div>
            {/* <div className="px-1 mx-1 ">
              <button onClick={() => disconnect()}>Disconnect</button>
            </div> */}

            <div className="hidden border-teal-500 md:block hover:border-b-4 rounded-xl">
              <ThemeSwitch />
            </div>
            <div className="flex items-center justify-center">
              <Link
                to="/settings"
                className="p-1 px-2 mx-2 hover:animate-spin rounded-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navebar;
