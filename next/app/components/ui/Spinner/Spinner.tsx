import spinnerIcon from "@/public/icons/another/spinner.svg";
import Image from "next/image";

const Spinner = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <Image src={spinnerIcon} alt="Loading" width={200} height={200} />
    </div>
  )
}

export default Spinner