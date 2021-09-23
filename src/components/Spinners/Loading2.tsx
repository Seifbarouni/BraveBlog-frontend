import Loader from "react-loader-spinner";

const Loading2: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Loader type="Oval" color="black" height={60} width={60} />
    </div>
  );
};

export default Loading2;
