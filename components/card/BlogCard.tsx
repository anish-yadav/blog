import { RightArrow } from "../icons";

interface Props {
  title: string;
  author: string;
  description: string;
  imgUrl: string;
}

export const BlogCard = ({ title, author, imgUrl, description }: Props) => {
  return (
    <div className="bg-white shadow-lg">
      <img className="w-full h-48" src={imgUrl} />
      <div className="p-4">
        <p className="text-xs">
          published by - <strong className="mr-4">{author}</strong> 2 days ago
        </p>
        <h2 className="mt-4 text-xl">{title}</h2>
        <p className="text-sm h-14 text-ellipsis overflow-hidden">
          {description}
        </p>
        <button className="flex items-center justify-between mt-4">
          <p className="mr-4">Continue</p>
          <RightArrow color="black" width="20px" />
        </button>
      </div>
    </div>
  );
};
