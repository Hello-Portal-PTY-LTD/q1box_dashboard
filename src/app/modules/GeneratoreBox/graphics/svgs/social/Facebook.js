import React from "react";

const Facebook = ({ light }) => {
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
        stroke="url(#paint0_linear_953_77086)"
        stroke-width="0.661622"
      />
      <path
        d="M30.9329 20.3316C30.9329 14.4043 26.1575 9.59961 20.2676 9.59961C14.375 9.60094 9.59961 14.4043 9.59961 20.3329C9.59961 25.6883 13.5005 30.1277 18.5985 30.9329V23.4339H15.8922V20.3329H18.6012V17.9666C18.6012 15.2776 20.1943 13.7924 22.63 13.7924C23.7978 13.7924 25.0177 14.0017 25.0177 14.0017V16.6414H23.6725C22.3487 16.6414 21.9354 17.4693 21.9354 18.3185V20.3316H24.8924L24.4204 23.4325H21.9341V30.9316C27.0321 30.1264 30.9329 25.6869 30.9329 20.3316Z"
        fill="url(#paint1_linear_953_77086)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_953_77086"
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
          id="paint1_linear_953_77086"
          x1="20.2663"
          y1="9.59961"
          x2="20.2663"
          y2="30.9329"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color={light ? "#CBD5E1" : "#3A57EC"} />
          <stop offset="1" stop-color={light ? "#CBD5E1" : "#7F6AFF"} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Facebook;
