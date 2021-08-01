import { Link } from "react-router-dom";
import { useAnimation } from "../Hooks/useAnimation";

export const DropDown: React.FC<any> = ({ dropdownRef, logout }) => {
  const { props, a } = useAnimation();
  return (
    <a.div
      style={props}
      className="absolute right-2  mt-1 bg-white rounded-md shadow-2xl flex flex-col w-36"
      ref={dropdownRef}
    >
      <Link
        to="/profile"
        className=" hover:bg-gray-200 rounded-t-md flex justify-start items-center px-2 py-2 border-b border-gray-300"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </span>
        <span className="ml-1">Profile</span>
      </Link>
      <div
        className=" hover:bg-gray-200 cursor-pointer rounded-b-sm flex justify-start items-center px-2 py-2"
        onClick={logout}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span className="ml-1">Logout</span>
      </div>
    </a.div>
  );
};
