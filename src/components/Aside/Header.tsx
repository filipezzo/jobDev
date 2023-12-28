import { Button } from "../ui/button";
type Props = {
  jobItemsResults: number;
  onSort: (newSortBy: string) => void;
  sortBy: string;
};
export default function AHeader({ jobItemsResults, onSort, sortBy }: Props) {
  return (
    <header className="flex  items-center justify-between overflow-hidden ">
      <p>
        <strong>{jobItemsResults}</strong> results
      </p>
      <div>
        <Button
          onClick={() => onSort("relevant")}
          className={`"mr-4 h-8" ${
            sortBy === "relevant" && "border-2 border-blue-500"
          }`}
        >
          RELEVANT
        </Button>
        <Button
          onClick={() => onSort("recent")}
          className={`" h-8" mx-4 ${
            sortBy === "recent" && "border-2 border-blue-500"
          }`}
          variant={"secondary"}
        >
          RECENT
        </Button>
      </div>
    </header>
  );
}
