import * as React from "react";

export default function SolidCloseIcon(
  props: React.SVGProps<SVGSVGElement> & { size?: number },
) {
  return (
    <svg
      width={props.size || 16}
      height={props.size || 16}
      viewBox="0 0 48 48"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2Zm8.3,27.5a2.1,2.1,0,0,1,.4,2.7,2,2,0,0,1-3.1.2L24,26.8l-5.6,5.6a2,2,0,0,1-3.1-.2,2.1,2.1,0,0,1,.4-2.7L21.2,24l-5.5-5.5a2.2,2.2,0,0,1-.4-2.7,2,2,0,0,1,3.1-.2L24,21.2l5.6-5.6a2,2,0,0,1,3.1.2,2.2,2.2,0,0,1-.4,2.7L26.8,24Z"></path>
    </svg>
  );
}
