import React from "react";

function Youtube({ light }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.330811"
        y="0.330811"
        width="39.3384"
        height="39.3384"
        rx="19.6692"
        stroke="url(#paint0_linear_239_173937)"
        stroke-width="0.661622"
      />
      <path
        d="M30.4829 15.1311C30.3615 14.6801 30.1238 14.2689 29.7935 13.9387C29.4633 13.6084 29.0521 13.3707 28.6011 13.2493C26.9402 12.7998 20.2663 12.7998 20.2663 12.7998C20.2663 12.7998 13.5923 12.7998 11.9315 13.2493C11.4805 13.3707 11.0693 13.6084 10.739 13.9387C10.4088 14.2689 10.1711 14.6801 10.0497 15.1311C9.73956 16.8249 9.58907 18.5441 9.60018 20.2661C9.58907 21.988 9.73956 23.7072 10.0497 25.401C10.1711 25.852 10.4088 26.2632 10.739 26.5935C11.0693 26.9237 11.4805 27.1614 11.9315 27.2828C13.5923 27.7323 20.2663 27.7323 20.2663 27.7323C20.2663 27.7323 26.9402 27.7323 28.6011 27.2828C29.0521 27.1614 29.4633 26.9237 29.7935 26.5935C30.1238 26.2632 30.3615 25.852 30.4829 25.401C30.793 23.7072 30.9435 21.988 30.9324 20.2661C30.9435 18.5441 30.793 16.8249 30.4829 15.1311ZM18.1331 23.4659V17.0662L23.6718 20.2661L18.1331 23.4659Z"
        fill="url(#paint1_linear_239_173937)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_239_173937"
          x1="20"
          y1="0"
          x2="20"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color={light ? "#CBD5E1" : "#3A57EC"} />
          <stop offset="1" stop-color={light ? "#CBD5E1" : "#7F6AFF"} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_239_173937"
          x1="20.2663"
          y1="12.7998"
          x2="20.2663"
          y2="27.7323"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color={light ? "#CBD5E1" : "#3A57EC"} />
          <stop offset="1" stop-color={light ? "#CBD5E1" : "#7F6AFF"} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Youtube;
