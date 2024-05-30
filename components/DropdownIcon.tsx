export default function DropDownIcon({
  className = '',
}: {
  className?: string;
}) {
  return (
    <svg
      className={'box-dropdown-icon ' + className}
      style={{ display: 'inline' }}
      width="12px"
      height="12px"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#000000"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}