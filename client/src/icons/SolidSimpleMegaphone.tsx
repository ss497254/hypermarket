import * as React from "react";

function SvgSolidSimpleMegaphone(
  props: React.SVGProps<SVGSVGElement> & { size?: number },
) {
  return (
    <svg
      width={props.size || 16}
      height={props.size || 16}
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M4.56369 12.8417C4.74667 13.2878 5.10933 13.6316 5.56144 13.7847L8.91241 14.9174C9.28726 15.0414 9.69345 15.0254 10.0577 14.8723C10.4219 14.7192 10.7203 14.4392 10.8989 14.0826L11.968 11.9138L16 13.1081V0L4.92308 3.5371V9.36291L5.53682 9.58512L4.6121 11.461C4.50678 11.6742 4.44794 11.9078 4.43959 12.146C4.43124 12.3843 4.47356 12.6216 4.56369 12.8417ZM7.09415 10.1494L10.4107 11.3512L9.43098 13.3386L6.08 12.2059L7.09415 10.1494ZM1.64103 9.36291H3.28205V3.5371H1.64103C0.736 3.5371 0 4.28363 0 5.20162V7.69839C0 8.61637 0.736 9.36291 1.64103 9.36291Z" />
    </svg>
  );
}

export default SvgSolidSimpleMegaphone;