import { useRef } from "react";
import { LeftArrow, RightArrow } from "../icons/index";

interface GalleryProps {
  children?: React.ReactNode;
}

const OFFSET = 70;

function Gallery(props: GalleryProps) {
  const scrollviewRef = useRef(null);

  const onArrowClick = (offset: number) => {
    if (scrollviewRef === null) return;
    //@ts-ignore
    scrollviewRef.current.scrollLeft += offset;
  };

  if (!props.children) return <></>;

  return (
    <div className="relative w-[100vw] sm:w-[85vw] grid grid-flow-col h-[calc(50vh-1rem)] place-items-center rounded-[20px] ">
      <button
        onClick={() => onArrowClick(-1 * OFFSET)}
        className=" w-[80px] h-[50px]"
      >
        <LeftArrow className="hover:animate-bounce w-[50px] h-[50px]" />
      </button>
      <div
        ref={scrollviewRef}
        className="w-[calc(60vw-1rem)] grid grid-flow-col grid-rows-1 place-items-center gap-x-2 overflow-y-hidden overflow-x-auto scrollbar-none rounded-[20px]"
      >
        {props?.children}
      </div>
      <button
        onClick={() => onArrowClick(OFFSET)}
        className=" w-[80px] h-[50px]"
      >
        <RightArrow className="hover:animate-bounce w-[50px] h-[50px]" />
      </button>
    </div>
  );
}

export default Gallery;
