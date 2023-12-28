import { ItemProps } from "@/types/data";
import { Button } from "../ui/button";
import Details from "./Details";
import Loading from "../Loading";

type Props = {
  dataItem: ItemProps;
  isLoading: boolean;
};
export default function JobDetails({ dataItem, isLoading }: Props) {
  if (!dataItem && !isLoading) return <EmptyDetails />;
  return (
    <>
      {isLoading && <Loading />}
      {dataItem && (
        <section className=" overflow-x-auto  border ">
          <img
            src="https://images.unsplash.com/photo-1554232456-8727aae0cfa4?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="bg image"
            className=" -z-10 h-40 w-full object-cover object-center saturate-50 filter"
          />
          <section>
            <div className="container relative z-50 -mt-10 flex items-start ">
              <div className="flex h-16 w-10 items-center justify-center rounded-md bg-blue-500 p-2 font-bold">
                {dataItem.badgeLetters}
              </div>
              <div className="ml-4 text-white">
                <h2 className="text-3xl text-white">{dataItem.title}</h2>
                <p>{dataItem.company}</p>
                <h3>{dataItem.description}</h3>
              </div>
            </div>
            <Details
              qualifications={dataItem.qualifications}
              variant
              title="Qualifications"
            />
            <Details title="Company Reviews" reviews={dataItem.reviews} />
          </section>
          <div className="container  ">
            <Button className="bg-blue-500">
              <a target="_blank" href={dataItem.companyURL}>
                Apply
              </a>
            </Button>
          </div>
        </section>
      )}
    </>
  );
}

function EmptyDetails() {
  return (
    <div className=" hidden  md:flex md:h-full md:flex-col md:items-center md:justify-center">
      <h2 className="-mt-20 text-center text-sm text-gray-500 md:text-2xl">
        What are you looking for?
      </h2>
      <p className="text-center text-sm text-gray-500 md:text-xl">
        Start by searching for any techs your ideal job is working with
      </p>
    </div>
  );
}
