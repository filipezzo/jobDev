import { Search } from "lucide-react";
import { Input } from "../ui/input";

type ISearch = {
  searchText: string;
  onSettingText: (e: string) => void;
};

export default function Form({ searchText, onSettingText }: ISearch) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="container my-4 flex items-center rounded-md border bg-white p-2 text-black"
    >
      <Search size={18} className="cursor-pointer" />
      <Input
        value={searchText}
        onChange={(e) => onSettingText(e.target.value)}
        className="border-none bg-transparent  "
        placeholder="Search"
      />
    </form>
  );
}
