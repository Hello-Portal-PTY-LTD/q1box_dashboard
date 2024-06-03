import React from "react";

const Pinterest = ({ light }) => {
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
        stroke="url(#paint0_linear_984_77198)"
        stroke-width="0.661622"
      />
      <path
        d="M19.6723 9C17.1855 8.99843 14.7763 9.86588 12.8613 11.4524C10.9463 13.0389 9.64588 15.2446 9.18488 17.6883C8.72388 20.132 9.13129 22.66 10.3367 24.8352C11.542 27.0103 13.4696 28.6959 15.786 29.6004C15.6927 28.7565 15.6074 27.4593 15.822 26.5381C16.0167 25.7048 17.0726 21.236 17.0726 21.236C17.0726 21.236 16.7539 20.5974 16.7539 19.6535C16.7539 18.1697 17.6138 17.0631 18.6844 17.0631C19.5936 17.0631 20.0336 17.7457 20.0336 18.5656C20.0336 19.4802 19.451 20.848 19.1497 22.1159C18.899 23.1771 19.683 24.0437 20.7295 24.0437C22.6253 24.0437 24.0825 22.0439 24.0825 19.1589C24.0825 16.6058 22.2467 14.8207 19.627 14.8207C16.5926 14.8207 14.8115 17.0965 14.8115 19.4482C14.8115 20.3654 15.1648 21.348 15.6047 21.8826C15.6426 21.9229 15.6694 21.9723 15.6825 22.0261C15.6956 22.0798 15.6945 22.136 15.6794 22.1892C15.5981 22.5252 15.4181 23.2504 15.3834 23.3984C15.3368 23.5931 15.2288 23.6344 15.0261 23.5411C13.6929 22.9211 12.861 20.9734 12.861 19.4082C12.861 16.0446 15.3061 12.9556 19.9083 12.9556C23.6079 12.9556 26.4835 15.5913 26.4835 19.1149C26.4835 22.7905 24.1651 25.7488 20.9495 25.7488C19.8683 25.7488 18.8524 25.1876 18.5044 24.5236L17.8405 27.0594C17.5992 27.9859 16.9486 29.1471 16.514 29.8551C17.9804 30.3085 19.5275 30.44 21.0495 30.2407C22.5714 30.0414 24.0325 29.5159 25.3327 28.7001C26.633 27.8844 27.7418 26.7976 28.5835 25.5139C29.4252 24.2303 29.9799 22.7802 30.2098 21.2625C30.4396 19.7448 30.3391 18.1954 29.9152 16.7202C29.4914 15.2449 28.754 13.8785 27.7536 12.7143C26.7532 11.5501 25.5133 10.6156 24.1186 9.97458C22.7239 9.33355 21.2073 9.00112 19.6723 9Z"
        fill="url(#paint1_linear_984_77198)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_984_77198"
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
          id="paint1_linear_984_77198"
          x1="19.665"
          y1="9"
          x2="19.665"
          y2="30.331"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color={light ? "#CBD5E1" : "#3A57EC"} />
          <stop offset="1" stop-color={light ? "#CBD5E1" : "#7F6AFF"} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Pinterest;
