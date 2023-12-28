import { Button } from "./ui/button";

type Props = {
  onClick: (direction: "next" | "prev") => void;
  currentPage: number;
  totalPages: number;
};

export default function Pagination({
  onClick,
  currentPage,
  totalPages,
}: Props) {
  return (
    <div className="mr-4 flex justify-between ">
      {currentPage >= 2 && (
        <Button
          onClick={(e) => {
            onClick("prev");
            e.currentTarget.blur();
          }}
          variant={"ghost"}
          className=" w-20  border"
        >
          Page {currentPage > 1 ? currentPage - 1 : currentPage}
        </Button>
      )}

      {currentPage < totalPages && (
        <Button
          onClick={(e) => {
            onClick("next");
            e.currentTarget.blur();
          }}
          variant={"ghost"}
          className=" ml-auto w-20  border"
        >
          Page {currentPage}
        </Button>
      )}
    </div>
  );
}
