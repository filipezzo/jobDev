import { jobItemsProps } from "@/types/data";
import Loading from "../Loading";
import JobItem from "./JobItem";
import { useHashId } from "@/lib/hooks";

type JobListProps = {
  loading: boolean;
  jobItems: jobItemsProps[];
};

export default function JobList({ jobItems, loading }: JobListProps) {
  const { activeId } = useHashId();

  return (
    <>
      {loading && <Loading />}
      <ul>
        {!loading &&
          jobItems.map((item) => (
            <JobItem
              key={item.id}
              data={item}
              isActive={item.id === activeId}
            />
          ))}
      </ul>
    </>
  );
}
