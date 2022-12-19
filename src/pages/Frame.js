import Heading from "../components/Heading";
import { useLocation } from "react-router-dom";

export default function Frame() {
  const { state } = useLocation();
  return (
    <div className="h-screen flex flex-col">
      <Heading back={true} />
      <iframe className="w-full flex-1" src={state.src} />
    </div>
  );
}
