import { React, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { updateOnePassword, isAuthnaticated } from "../server/user";
import { Link, redirect } from "react-router-dom";

import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Flex,
  Heading,
  HStack,
  Button,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { generateStrongPassword } from "../server/services";
import { RepeatClockIcon } from "@chakra-ui/icons";

// import UserContext from '../context';

const UpdatePassword = (props) => {
  const [values, setValues] = useState({
    userId: "",
    _id: "",
    username: "",
    product: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const toast = useToast();

  useEffect(() => {
    handleReset();
  }, []);

  const handleSubmit = () => {
    const { token, userId } = isAuthnaticated();
    if (!token) {
      return toast({
        status: "error",
        description: "Session Time out,Please login Again",
      });
    }
    console.log(userId);
    setValues({ ...values, userId: userId });

    // setIsLoading(true);
    console.log(values);

    updateOnePassword(values, token)
      .then((res) => {
        if (res.error) {
          // handle error
          console.log(res.error);
          return;
        }
        console.log("###userAdded");
        console.log(res);
      })
      .catch((e) => console.log(e));
  };
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const handleReset = () => {
    const { _id, product, username, password } = location.state;
    setValues({ ...values, _id, product, username, password });
  };
  const handlePasswordGeneration = () => {
    const temp = generateStrongPassword();
    setValues({ ...values, password: temp });
  };
  return (
    <>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="white.200"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          padding={"4"}
          width="80%"
          maxW="lg"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Heading marginBottom={"10"} size={"xl"}>
            Add New Password
            <Spacer />
            <Button
              variant="solid"
              size="sm"
              rightIcon={<RepeatClockIcon />}
              colorScheme={"blackAlpha"}
              onClick={handleReset}
            >
              Reset
            </Button>
          </Heading>
          <FormControl>
            <HStack marginBottom={"3"}>
              <FormLabel>Username</FormLabel>
              <Input
                onChange={handleChange("username")}
                type="text"
                placeholder="user name"
                value={values.username}
              />
            </HStack>

            <HStack marginBottom={"3"}>
              <FormLabel>product/website</FormLabel>
              <Input
                onChange={handleChange("product")}
                type="text"
                placeholder="https://examplesite.com"
                value={values.product}
              />
            </HStack>

            <HStack marginBottom={"3"}>
              <FormLabel>Password</FormLabel>
              <Input
                onChange={handleChange("password")}
                type="text"
                placeholder="create a strong password"
                value={values.password}
              />
            </HStack>

            <Flex py={3}>
              <Spacer />

              <Button colorScheme={"green"} onClick={handlePasswordGeneration}>
                Generate Password
              </Button>
            </Flex>
            <Flex>
              <Spacer />
              <Link to="/home">
                <Button colorScheme={"red"} variant="outline" marginRight={"4"}>
                  Close
                </Button>
              </Link>
              <Button colorScheme={"blue"} onClick={handleSubmit}>
                Add
              </Button>
            </Flex>
          </FormControl>
        </Box>
      </Flex>
    </>
  );
};

export default UpdatePassword;
