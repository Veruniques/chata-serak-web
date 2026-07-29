/**
 * Podpisový prvek webu: předěl mezi sekcemi ve tvaru hřebene Jeseníků.
 * `from` = barva sekce nad předělem (pozadí), `to` = barva sekce pod ním
 * (výplň hor). Použití: <RidgeDivider from="var(--snow-50)" to="var(--spruce-950)" />
 */
export default function RidgeDivider({
  from,
  to,
  flip = false,
}: {
  from: string;
  to: string;
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      style={{ background: from }}
      className="leading-[0]"
    >
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        className={`w-full h-[44px] md:h-[72px] block ${flip ? "scale-x-[-1]" : ""}`}
      >
        <path
          d="M0,72 L0,52 L140,26 L300,48 L460,10 L620,42 L800,6 L980,38 L1150,18 L1300,44 L1440,24 L1440,72 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}
