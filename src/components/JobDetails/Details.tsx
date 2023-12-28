import { Button } from "../ui/button";

type IDetails = {
  title: string;
  variant?: boolean;
  qualifications?: string[] | undefined;
  reviews?: string[];
  subtitle?: string;
};

type IDetailsItem = {
  qualifications?: string[] | undefined;
  reviews?: string[] | undefined;
};

export default function Details({
  title,
  subtitle,
  variant = false,
  qualifications,
  reviews,
}: IDetails) {
  return (
    <section className="container my-8 flex items-start">
      <div>
        <strong>{title}</strong>
        <p>{subtitle}</p>
      </div>
      <ul className="flex-1 ">
        {variant ? (
          <DetailsItem qualifications={qualifications?.slice(0, 4)} />
        ) : (
          <DetailsCompany reviews={reviews} />
        )}
      </ul>
    </section>
  );
}

function DetailsItem({ qualifications }: IDetailsItem) {
  return (
    <li className={`ml-4 flex gap-4`}>
      {qualifications!.map((item, index) => (
        <Button key={index} className="h-6" variant={"secondary"}>
          {item}
        </Button>
      ))}
    </li>
  );
}

function DetailsCompany({ reviews }: { reviews: string[] | undefined }) {
  return (
    <li className="ml-4 flex gap-8 italic opacity-85">
      {reviews!.map((review, index) => (
        <p key={index}>"{review}"</p>
      ))}
    </li>
  );
}
