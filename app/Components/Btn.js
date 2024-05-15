import React from 'react';


function cn(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  
  function GlowingGradientBorderButton({
    gradient,
    children,
    href,
    target = '_blank',
    rel = 'noreferrer noopener'
  }) {
    return (
      React.createElement("div", {
          className: "flex justify-center"
        },
        React.createElement("div", {
            className: "relative group"
          },
          React.createElement("div", {
            className: cn(
              'absolute -inset-0.5 rounded-2xl blur group-hover:blur-xl opacity-75 transition duration-500 group-hover:duration-200 group-hover:opacity-100 will-change-filter overflow-hidden',
              gradient
            )
          }),
          React.createElement("a", {
              className: "relative block w-64 h-16 md:h-20 group-hover:scale-105 duration-500 group-hover:duration-200",
              href: href,
              target: target,
              rel: rel
            },
            React.createElement("span", {
                className: cn('block h-full inset-0.5 rounded-xl p-1', gradient)
              },
              React.createElement("span", {
                className: "h-full items-center px-6 bg-neutral-900 text-neutral-50 rounded-lg"
              }, children)
            )
          )
        )
      )
    );
  }
  
  export default GlowingGradientBorderButton;
  