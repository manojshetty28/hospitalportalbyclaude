import type { Metadata } from "next";
import { Suspense } from "react";
import { InpatientsContent } from "@/components/InpatientsContent";
import { PageSkeleton } from "@/components/PageSkeleton";

export const metadata: Metadata = {
  title: "In-patients",
};

export default function InpatientsPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <InpatientsContent />
    </Suspense>
  );
}
