import { Triangle } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="h-dvh w-full flex justify-center items-center">
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#ff6600"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
