import React from 'react';

export default function ArrowLeft() {
  return (
    <svg width="89" height="87" viewBox="0 0 89 87" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d)">
        <path
          d="M12.6566 12.7188H42.9841C58.4481 12.7188 70.9841 25.2548 70.9841 40.7188C70.9841 56.1827
                    58.4481 68.7188 42.9841 68.7188H12.6566V12.7188Z"
          fill="#F1F1F2"
        />
      </g>
      <path
        d="M48.8204 40.7188H34.8204M34.8204 40.7188L41.8204 47.7188M34.8204 40.7188L41.8204 33.7188"
        stroke="#333333"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <defs>
        <filter
          id="filter0_d"
          x="0.656616"
          y="0.71875"
          width="88.3275"
          height="86"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dx="3" dy="3" />
          <feGaussianBlur stdDeviation="7.5" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}
