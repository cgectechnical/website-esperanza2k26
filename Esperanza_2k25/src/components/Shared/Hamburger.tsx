"use client";
const Hamburger = ({
  toggleMobileMenu,
  isMobileMenuOpen,
  closeMenu,
}: {
  toggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
  closeMenu?: () => void;
}) => {
  return (
    <div className="absolute top-0 right-0 h-[80px] z-[50] flex items-center justify-end px-4 md:px-10">
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={toggleMobileMenu}
        aria-label="Toggle Menu"
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              isMobileMenuOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M4 6h16M4 12h16M4 18h16"
            }
          />
        </svg>
      </button>
    </div>
  );
};

export default Hamburger;
