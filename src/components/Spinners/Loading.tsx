import Loader from "react-loader-spinner";

 const Loading:React.FC = () => {
    return (
        <div className="flex mt-36 justify-center items-center">
         <Loader
        type="Oval"
        color="black"
        height={60}
        width={60}
      />
    </div>
    )
}

export default Loading;
