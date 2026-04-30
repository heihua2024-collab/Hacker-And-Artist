type BrandLogoProps = {
  size?: number;
  className?: string;
  title?: string;
};

export function BrandLogo({
  size = 36,
  className,
  title = "印刻万物 TOP3DGS",
}: BrandLogoProps) {
  return (
    <svg
      role="img"
      aria-label={title}
      width={size}
      height={size}
      viewBox="0 0 120 96"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>{title}</title>
      <ellipse
        cx="39"
        cy="47"
        rx="24"
        ry="38"
        transform="rotate(10 39 47)"
        fill="#1F82D6"
        fillOpacity="0.94"
      />
      <ellipse
        cx="72"
        cy="39"
        rx="35"
        ry="33"
        transform="rotate(-10 72 39)"
        fill="#FF4D5A"
        fillOpacity="0.92"
      />
      <ellipse
        cx="64"
        cy="62"
        rx="45"
        ry="25"
        transform="rotate(8 64 62)"
        fill="#FFC247"
        fillOpacity="0.88"
      />
    </svg>
  );
}
