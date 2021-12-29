import { ChevronRight } from "react-feather";
import { RightArrow } from "../icons";

interface Props {
  category: string;
  title: string;
  description: string;
  author: string;
  // TODO
  createdAt?: string;
  link?: string;
}

export const HeroCard = ({ category, title, description, author }: Props) => {
  return (
    <div className="bg-black h-96 w-96 text-white p-6 mb-1 hover:cursor-pointer shadow-lg">
      <p className="text-lg">{category}</p>
      <h2 className="text-5xl mt-3 h-24 text-ellipsis overflow-hidden">
        {title}
      </h2>
      <div className="text-xs flex justify-between gap-2">
        <p>
          published by <strong> - {author}</strong>
        </p>
        <i>1 days ago</i>
      </div>
      <p className="text-sm h-24 mt-4 text-ellipsis overflow-hidden">
        {description}
      </p>

      <h4 className="mt-6 text-lg flex hover:cursor-pointer">
        <p className="mr-6">Conitnue Reading</p>
        <RightArrow color="white" width="20px" />
      </h4>
    </div>
  );
};
