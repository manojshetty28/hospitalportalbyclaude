import { Icon, type IconName } from "@/components/Icon";

const TONES = {
  navy: {
    tile: "bg-tint-navy",
    chip: "bg-brand-navy",
    label: "text-brand-navy",
  },
  teal: {
    tile: "bg-tint-teal",
    chip: "bg-brand-teal",
    label: "text-teal-dark",
  },
  steel: {
    tile: "bg-tint-steel",
    chip: "bg-brand-steel",
    label: "text-steel-dark",
  },
  slate: {
    tile: "bg-tint-slate",
    chip: "bg-brand-slate",
    label: "text-slate-dark",
  },
};

type InfoTileProps = {
  label: string;
  value: string;
  icon: IconName;
  tone: keyof typeof TONES;
  /** Show the value in a larger size, for a headline number. */
  emphasis: boolean;
};

export function InfoTile({
  label,
  value,
  icon,
  tone,
  emphasis,
}: InfoTileProps) {
  const classes = TONES[tone];

  return (
    <div className={`flex items-center gap-4 rounded-2xl p-5 ${classes.tile}`}>
      <span
        className={`flex size-13 shrink-0 items-center justify-center rounded-xl text-white ${classes.chip}`}
      >
        <Icon name={icon} className="size-6.5" />
      </span>
      <div className="min-w-0">
        <dt className={`text-[13px] font-semibold ${classes.label}`}>
          {label}
        </dt>
        <dd
          className={
            emphasis
              ? "text-3xl font-bold text-ink"
              : "text-[17px] font-semibold text-ink"
          }
        >
          {value}
        </dd>
      </div>
    </div>
  );
}
