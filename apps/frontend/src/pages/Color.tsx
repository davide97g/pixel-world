import { IColor } from "@pixel-world/types";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useColorGetColorByHer } from "../hooks/database/color/useColorGetColorByHex";

export default function Color() {
  const { color } = useParams<{ color: string }>();
  const getColor = useColorGetColorByHer(color);
  if (getColor.isFetching) return <Loader />;
  if (getColor.isError) return <div>Error</div>;
  if (!getColor.data) return <div>Not found</div>;

  const { value, name, rgb, hsl, density, isLight } = getColor.data as IColor;

  return (
    <div className="w-full sm:w-6/12 flex flex-col justify-center items-center gap-4 px-10">
      <div className="pt-28 md:pt-20 flex flex-row items-center">
        <h1 className="text-2xl">{name}</h1>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: value }}
            />
            <div className="flex flex-col gap-1">
              <div className="text-xs">HEX: {value}</div>
              <div className="text-xs">RGB: {rgb.join(", ")}</div>
              <div className="text-xs">HSL: {hsl?.join(", ")}</div>
            </div>
          </div>
          <div className="text-xs">Density: {density}</div>
          <div className="text-xs">Is light: {isLight ? "Yes" : "No"}</div>
        </div>
      </div>
    </div>
  );
}
