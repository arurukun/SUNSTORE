import React, { useState } from "react";


function DropdownMenu(props) {
    const [isOpen, setIsOpen] = useState(false);
    
    const logoutHandler=()=>{
      console.log("logout")
    }
  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center w-full text-sm font-medium text-white "
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        {/* Name */}
        {props.header}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 011.414 0l.707.707a1 1 0 010 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414l.707-.707z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div
        className={`origin-top-right absolute right-0 mt-2 w-20 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
          isOpen ? "block" : "hidden"
        }`}
        aria-labelledby="options-menu"
        role="menu"
        id="options-menu-dropdown"
      >
        <div className="py-1" role="none">
            {props.list && props.list.map(li=>{return(

            <button
                type="button"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={logoutHandler}
                // disabled={li.===0}
                >
            {li}
          </button>
              )})}
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;
