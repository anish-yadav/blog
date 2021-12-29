import { ChevronRight, MessageSquare } from "react-feather";
import { RightArrow } from "../icons";

interface Props {
  title: string;
  author: string;
  description: string;
  imgUrl?: string;
}

export const HorizontalCard = ({
  title,
  author,
  description,
  imgUrl,
}: Props) => {
  return (
    <div className="my-10 grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-14">
      <img className="col-span-2 h-64 w-full" src={imgUrl} />
      <div className="">
        <h2 className="text-3xl">{title}</h2>
        <p className="text-xs">
          published by - <strong>{author}</strong> - 4 days ago
        </p>
        <p className="text-sm h-20 mt-4 text-ellipsis overflow-hidden">
          {description}
        </p>

        <button className="mt-6 bg-black shadow-lg py-2 px-4 flex hover:cursor-pointer">
          <h6 className="text-white uppercase mr-6">Conitnue </h6>
          <RightArrow color={"white"} width="20px" />
        </button>

        <p className="text-xs flex mt-4 items-center">
          <MessageSquare className="mr-2 w-4" /> 26 comments
        </p>
      </div>
    </div>
  );
};
