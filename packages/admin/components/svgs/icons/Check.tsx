import Props from "./iconType";

function IconCheck({ title, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      {...props}
    >
      <title>{title || "Check"}</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.8973 4.30374L7.07032 13.2314L2.16797 8.87372L2.83233 8.12631L6.92998 11.7687L13.103 3.69629L13.8973 4.30374Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default IconCheck;
