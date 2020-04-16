import React from 'react';

export default function MyLocation({ width = '50', height = '50', color = '' }) {
  // note: these height and width properties are weird on svgs so you might have to mess with the viewBox props too
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 86.666664 86.666664"
      height={height}
      width={width}
      id="svg2"
      version="1.1"
    >
      <defs id="defs6" />
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,86.666667)" id="g10">
        <g transform="scale(0.1)" id="g12">
          <path
            id="path14"
            style={{ fill: color, fillOpacity: 1, fillRule: 'nonzero', stroke: 'none' }}
            d="m 324.727,453.977 c -71.196,-0.122 -128.844,-57.981 -128.731,-129.223 0.152,-71.191 58.027,-128.836 129.234,-128.68 71.208,0.125 128.864,57.969 128.715,129.192 -0.097,71.222 -57.961,128.867 -129.218,128.711"
          />
          <path
            id="path16"
            style={{ fill: color, fillOpacity: 1, fillRule: 'nonzero', stroke: 'none' }}
            d="M 325.352,112.918 C 208.379,112.684 113.066,207.645 112.867,324.613 112.617,441.594 207.59,536.961 324.563,537.191 441.555,537.402 536.926,442.422 537.129,325.422 537.383,208.465 442.324,113.133 325.352,112.918 Z M 649.871,344.012 572.91,343.879 C 563.672,466.457 465.508,564.23 342.883,573.031 l -0.149,77.008 -36.773,-0.074 0.148,-77.024 C 183.57,563.676 85.7773,465.516 77.0078,342.93 L 0,342.762 0.0546875,306.043 77.0391,306.191 C 86.332,183.633 184.504,85.8672 307.094,77.0781 L 307.223,0 343.984,0.0585938 343.816,77.1289 C 466.387,86.3945 564.148,184.559 572.988,307.168 l 77.012,0.137 -0.129,36.707"
          />
        </g>
      </g>
    </svg>
  );
}
