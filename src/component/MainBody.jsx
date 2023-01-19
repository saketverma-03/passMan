import {
  Box,
  Flex,
  Spacer,
  Button,
  ButtonGroup,
  Heading,
  Image
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { logOut } from "../server/user";
import Table_body from "./TableBody";
import getHeadersAndData from "../export.helper.js";
import { CSVDownload, CSVLink } from "react-csv";
// isAuthnaticated
import "../index.css"

const MainBody = () => {
  const handleLogout = () => {
    logOut();
  };

  const [temp, setTemp] = useState({ data: [], headers: [] });

  useEffect(() => {
    getHeadersAndData().then((res) => {
      if (res) {
        setTemp({ ...res });
      }
    });
  }, []);

  return (
    <>
      <Flex
        background={"purple.500"}
        minWidth="max-content"
        alignItems="center"
        gap="2"
        paddingX={"3"}
      >
        <Image className="hidden-mobile" boxSize="28px" objectFit='cover' src="/192x192.png" />
        <Box p="2">
          
          <Heading textColor={"white"} size="md">
            PassMan
          </Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap="2">
          <RouterLink to="/addNewPassword">
            <Button size={"sm"} colorScheme="blackAlpha">
              Add
            </Button>
          </RouterLink>

          <Button size="sm" onClick={() => "#"} colorScheme="blackAlpha">
            <CSVLink
              data={temp.data}
              headers={temp.headers}
              filename={"my-file.csv"}
            >
              Export
            </CSVLink>
          </Button>
            <Button size="sm" onClick={handleLogout} variant="solid" colorScheme="blackAlpha">
          <RouterLink to="/signup">
              Logout
          </RouterLink>
            </Button>
        </ButtonGroup>
      </Flex>
      <Table_body />
    </>
  );
};

export default MainBody;
