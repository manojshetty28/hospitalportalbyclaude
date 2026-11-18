import Link from "next/link";
import { StatusMessage } from "@/components/StatusMessage";

export default function NotFoundPage() {
  return (
    <StatusMessage message="Page not found">
      <Link
        href="/"
        className="rounded-[10px] bg-brand-steel px-6 py-3 font-semibold text-white hover:bg-steel-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
      >
        Back to Home
      </Link>
    </StatusMessage>
  );
}
