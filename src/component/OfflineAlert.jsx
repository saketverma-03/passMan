import { Alert, AlertTitle } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import React from "react";

const OfflineAlert = () => {
  return (
    <Alert status="error">
      <RepeatIcon />
      <AlertTitle>You Are Offline</AlertTitle>
      {/* <AlertDescription>
        Your Chakra experience may be degraded.
      </AlertDescription> */}
    </Alert>
  );
};

export default OfflineAlert;