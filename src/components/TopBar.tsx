import { HospitalLogo } from "@/components/HospitalLogo";

type TopBarProps = {
  title: string;
};

export function TopBar({ title }: TopBarProps) {
  return (
    <header className="bg-brand-navy">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3.5 sm:px-6">
        <HospitalLogo size={36} onDark />
        <span className="text-lg font-semibold text-white">{title}</span>
      </div>
    </header>
  );
}
