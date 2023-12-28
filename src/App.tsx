import { useState } from "react";
import Background from "./components/Background";
import Container, { ContainerDiv } from "./components/Container";
import Header from "./components/Header/Header";
import "./global.css";
import Form from "./components/Header/Form";
import Logo from "./components/Header/Logo";
import Aside from "./components/Aside/Aside";
import JobDetails from "./components/JobDetails/JobDetails";
import AHeader from "./components/Aside/Header";
import JobList from "./components/Aside/JobList";
import Pagination from "./components/Pagination";
import Separator from "./components/Separator";
import { useDataItem, useDebounce, useHashId, useJobItems } from "./lib/hooks";
import { Toaster } from "react-hot-toast";

function App() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("relevant");
  const { activeId } = useHashId();
  const { jobItem, isLoading } = useDataItem(activeId);
  const debouncedValue = useDebounce(searchText, 200);
  const { jobItems, loading, handleSettingText } = useJobItems({
    debouncedValue,
    setSearchText,
  });
  const jobItemsResults = jobItems?.length;
  const jobItemsSorted = [...(jobItems || [])].sort((a, b) => {
    if (sortBy === "relevant") {
      return (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0);
    } else if (sortBy === "recent") {
      return (a.daysAgo || 0) - (b.daysAgo || 0);
    }
    return 0;
  });
  const jobItemsSliced = jobItemsSorted.slice(
    currentPage * 7 - 7,
    currentPage * 7,
  );
  const totalPages = jobItemsResults / 7;

  const handleChangePage = (direction: "next" | "prev") => {
    if (direction === "next") {
      currentPage > 0 && setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev") {
      currentPage > 1 && setCurrentPage((prev) => prev - 1);
    }
  };
  const handleSortBy = (newSortBy: string) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  };

  return (
    <div>
      <Background />
      <Header>
        <Logo />
        <Form searchText={searchText} onSettingText={handleSettingText} />
      </Header>
      <Container>
        <ContainerDiv>
          <Aside>
            <AHeader
              jobItemsResults={jobItemsResults}
              sortBy={sortBy}
              onSort={handleSortBy}
            />
            <Separator />
            <JobList jobItems={jobItemsSliced} loading={loading} />
            <Pagination
              onClick={handleChangePage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </Aside>
          <JobDetails dataItem={jobItem!} isLoading={isLoading} />
        </ContainerDiv>
      </Container>

      <Toaster position={"top-right"} />
    </div>
  );
}

export default App;
