'use client';

import React from "react";
import { User, Button } from "@heroui/react";
import { MdLogout } from "react-icons/md"; 

export interface GlassIconsItem {
  icon: React.ReactElement;
  color: string;
  label: string;
  customClass?: string;
}

export interface GlassIconsProps {
  items: GlassIconsItem[];
  className?: string;
}

const gradientMapping: Record<string, string> = {
  blue: "linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))",
  purple: "linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))",
  red: "linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))",
};

const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
  const getBackgroundStyle = (color: string): React.CSSProperties => {
    return gradientMapping[color] ? { background: gradientMapping[color] } : { background: color };
  };

  return (
    <div className={`flex flex-col items-center gap-1 mx-auto py-8 ${className || ""}`}>
      {/* User and Logout Button Section */}
      <div className="flex w-full max-w-md items-center justify-between">
        <User
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
          description="Conta"
          name="Jane Doe"
        />
        <Button color="danger" onClick={() => console.log("Logout")} className="flex items-center">
          <MdLogout className="mr-1" /> Sair
        </Button>
      </div>
      
      {/* Menu Section */}
      <div className="flex flex-col items-center gap-12 w-full max-w-md">
        {items.map((item, index) => (
          <button
            key={index}
            type="button"
            aria-label={item.label}
            className={`relative bg-transparent outline-none w-[4.5em] h-[4.5em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group`}
          >
            {/* Back layer */}
            <span
              className="absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"
              style={{
                ...getBackgroundStyle(item.color),
                boxShadow: "0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)",
              }}
            ></span>

            {/* Front layer */}
            <span
              className="absolute top-0 left-0 w-full h-full rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] transform group-hover:[transform:translateZ(2em)]"
              style={{
                boxShadow: "0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset",
              }}
            >
              <span
                className="m-auto w-[1.5em] h-[1.5em] flex items-center justify-center"
                aria-hidden="true"
              >
                {item.icon}
              </span>
            </span>

            {/* Label */}
            <span className="absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-base opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(20%)]">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlassIcons;