import { React, useContext, useState } from "react";

import { addOnePasword, isAuthnaticated } from "../server/user";
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
  VStack,
} from "@chakra-ui/react";
import { generateStrongPassword } from "../server/services";

const AddNewPassword = (props) => {
  const [values, setValues] = useState({
    username: "",
    product: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleSubmit = () => {
    const { token, userId } = isAuthnaticated();
    if (!token) {
      return toast({
        title: "Session time out Please login again",
        status: "error",
      });
    }

    addOnePasword({ ...values, userId }, token)
      .then((res) => {
        if (res.error) {
          // handle error
          return toast({ title: res.message, status: "error" });
        }
        toast({ title: "Added to Databse Sussfully", status: "success" });
        setValues({ username: "", product: "", password: "" });
      })
      .catch((e) => console.log(e));
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
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
          </Heading>
          <FormControl>
            <HStack marginBottom={"3"}>
              <FormLabel>Username</FormLabel>
              <Input
                onChange={handleChange("username")}
                type="text"
                placeholder="user name"
              />
            </HStack>

            <HStack marginBottom={"3"}>
              <FormLabel>product/website</FormLabel>
              <Input
                onChange={handleChange("product")}
                type="text"
                placeholder="https://examplesite.com"
              />
            </HStack>

            <HStack marginBottom={"3"}>
              <FormLabel>Password</FormLabel>
              <Input
                onChange={handleChange("password")}
                value={values.password}
                type="text"
                placeholder="create a strong password"
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
              {/* <Box> */}
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

export default AddNewPassword;
