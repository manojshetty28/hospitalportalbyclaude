import { Suspense } from "react";
import { HomeContent } from "@/components/HomeContent";
import { PageSkeleton } from "@/components/PageSkeleton";

export default function HomePage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}
