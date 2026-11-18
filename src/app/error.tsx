"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { StatusMessage } from "@/components/StatusMessage";
import { LOAD_ERROR_MESSAGE } from "@/lib/messages";

type ErrorPageProps = {
  error: unknown;
  retry: () => void;
};

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusMessage message={LOAD_ERROR_MESSAGE}>
      <button
        type="button"
        onClick={() => retry()}
        className="rounded-[10px] bg-brand-steel px-6 py-3 font-semibold text-white hover:bg-steel-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
      >
        Try again
      </button>
    </StatusMessage>
  );
}
