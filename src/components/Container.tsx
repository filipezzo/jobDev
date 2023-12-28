export default function Container({ children }: { children: React.ReactNode }) {
  return <main className="-mt-2 px-2">{children}</main>;
}

export function ContainerDiv({ children }: { children: React.ReactNode }) {
  return (
    <div className=" container gap-8 rounded-lg bg-gray-300 p-4 sm:flex  sm:flex-col md:grid md:h-[700px] md:grid-cols-[500px_1fr] md:gap-0 ">
      {children}
    </div>
  );
}
