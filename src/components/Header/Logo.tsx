import { Anchor } from "lucide-react";

export default function Logo() {
  return (
    <a href="/" className="flex items-center justify-center gap-4">
      <Anchor size={24} />
      <p className="text-2xl text-white antialiased">
        Job<span className="font-bold">Dev</span>
      </p>
    </a>
  );
}
