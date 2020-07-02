//Just a link abstraction component
// So we can switch between libraries if needed
//This component should be entirely functional
import React from "react";
import { Link as RouterLink } from "@reach/router";

const Link = React.forwardRef(({ children, href, ...props }, ref) => {
  const passProps = { ...props };
  delete passProps.href;
  return (
    <RouterLink to={href} ref={ref} {...passProps}>
      {children}
    </RouterLink>
  );
});
export default Link;
