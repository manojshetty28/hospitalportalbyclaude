type HospitalLogoProps = {
  size: number;
  /** Use on dark backgrounds: white shield with a teal cross. */
  onDark: boolean;
};

export function HospitalLogo({ size, onDark }: HospitalLogoProps) {
  const shield = onDark ? "#ffffff" : "#2f8996";
  const cross = onDark ? "#2f8996" : "#ffffff";

  return (
    <svg
      role="img"
      aria-label="Hospital logo"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
    >
      <path
        d="M24 4l16 6v12c0 10-6.8 18.2-16 22C14.8 40.2 8 32 8 22V10l16-6z"
        fill={shield}
      />
      <path
        d="M24 15v16M16 23h16"
        stroke={cross}
        strokeWidth={5}
        strokeLinecap="round"
      />
    </svg>
  );
}
