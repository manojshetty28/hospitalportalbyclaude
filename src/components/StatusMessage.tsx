import type { ReactNode } from "react";
import { TopBar } from "@/components/TopBar";

type StatusMessageProps = {
  message: string;
  children: ReactNode;
};

/** Full-page message with actions, used for error and not-found states. */
export function StatusMessage({ message, children }: StatusMessageProps) {
  return (
    <>
      <TopBar title="Hospital Portal" />
      <main className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-brand-navy">{message}</h1>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {children}
        </div>
      </main>
    </>
  );
}
