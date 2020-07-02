import React from "react";
import { Button } from "@chakra-ui/core";

const SideNavSubItem = React.forwardRef(({ children, ...props }, ref) => (
  <Button
    size="sm"
    variant="ghost"
    justifyContent="flex-start"
    pl="12"
    fontWeight="normal"
    color="gray.600"
    {...props}
    ref={ref}
  >
    {children}
  </Button>
));

export default SideNavSubItem;
