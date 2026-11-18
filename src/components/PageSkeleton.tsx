import { TopBar } from "@/components/TopBar";

/** Placeholder shown while a page's data loads. */
export function PageSkeleton() {
  return (
    <>
      <TopBar title="Hospital Portal" />
      <main
        role="status"
        aria-label="Loading"
        className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6"
      >
        <div className="h-10 w-64 animate-pulse rounded-lg bg-line" />
        <div className="mt-6 h-80 animate-pulse rounded-[20px] bg-line" />
      </main>
    </>
  );
}
