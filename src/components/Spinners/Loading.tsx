import Loader from "react-loader-spinner";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col lg:mt-24  mt-12 justify-center items-center">
      <Loader type="Oval" color="black" height={60} width={60} />
      <ul className=" bg-gray-300 w-2/3 lg:w-1/3 mt-4 rounded-md shadow-md p-4 ">
        <li>
          The backend is deployed in heroku using the free service because I
          made this app to test my Java and React skills.
        </li>
        <li className="mt-3">
          Free apps sleep automatically after 30 mins of inactivity.{" "}
        </li>
        <li className="mt-3">
          So please wait if the app takes a long time to load, thanks for your
          understanding.🖤
        </li>
      </ul>
    </div>
  );
};

export default Loading;
