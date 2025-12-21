import React from "react";

const HamburgerMenu = ({ isOpen, toggleMenu }) => (
  <button
    className="focus:outline-none md:hidden text-textSecondary-light dark:text-textSecondary-dark"
    onClick={toggleMenu}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
      />
    </svg>
  </button>
);

export default HamburgerMenu;
