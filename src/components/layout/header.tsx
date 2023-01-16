import { Menu } from "@components/layout/menu";
import { ThemeToggle } from "@components/layout/theme-toggle";
import React from "react";

type Props = {
  twitterHandle?: string;
};

export function Header({ twitterHandle }: Props) {
  return (
    <div className="navbar mb-6 shadow-lg bg-neutral text-neutral-content rounded-box">
      <div className="navbar-start">
        <div className="px-2 mx-2">
          <span className="text-sm md:text-lg font-bold">
            NextJS Solana Starter Kit
          </span>
        </div>
      </div>

      <div className="navbar-end">
        <div className="hidden lg:block">
          <Menu
            twitterHandle={twitterHandle}
            className="menu-horizontal px-1"
          />
        </div>
        <ThemeToggle />
        <div className="lg:hidden">
          <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
}
