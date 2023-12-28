import { BookmarkPlus } from "lucide-react";
import Separator from "../Separator";
import { jobItemsProps } from "@/types/data";

type IProps = {
  data: jobItemsProps;
  isActive: boolean;
};

export default function JobItem({ data, isActive }: IProps) {
  return (
    <li
      className={`cursor-pointer transition-all hover:opacity-70 ${
        isActive && "font-bold text-blue-700 "
      }`}
    >
      <a href={`#${data.id}`}>
        <div className="flex items-center justify-between">
          <div className=" rounded-md bg-blue-500 p-2">
            <strong>{data.badgeLetters}</strong>
          </div>
          <div className="mx-4 flex-1">
            <h3>{data.title}</h3>
            <h4>{data.company}</h4>
          </div>
          <div className="mr-4 flex flex-col items-center">
            <BookmarkPlus className="text-blue-900 " />
            <span>{data.daysAgo}d</span>
          </div>
        </div>
        <Separator />
      </a>
    </li>
  );
}
