import Image from "next/image";
import { type ImageData } from "../index";

export function ChatImage({ data }: { data: ImageData }) {
  return (
      <div>
          {data.map((imageUrl ,i) => (
              <div key={i} className="rounded-lg max-w-[512px] shadow-md m-1">
                  <Image
                      className="rounded-lg"
                      src={imageUrl}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{width: "100%", height: "auto"}}
                      alt=""
                  />
              </div>
          ))}
      </div>
  );
}
