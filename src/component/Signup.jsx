import React, { useContext, useEffect, useState } from "react";
import "../index.css"
import {
  Flex,
  Heading,
  Input,
  Button,
  useToast,
  Stack,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";

import { Link as RouterLink, Navigate } from "react-router-dom";
import { isAuthnaticated, signup } from "../server/user.js";
// import  UserContext  from '../context';

const Signup = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    loading: false,
    redirect: false,
  });
  const toast = useToast();

  const handleChange = (item) => (event) => {
    setValues({ ...values, [item]: event.target.value });
  };

  // Handle Submit
  const onSubmit = (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      return toast({
        status: "error",
        title: "Password on both the fields should be same",
        duration: 9000,
        isClosable: false,
      });
    }
    setValues({ ...values, loading: true });

    const { email, password } = values;

    signup({ email, password })
      .then((res) => {
        if (res.error) {
          console.log(res.error);
          return toast({
            status: "error",
            title: res.message,
            duration: 9000,
            isClosable: false,
          });
        }
        toast({
          status: "success",
          title: "User Created Successfully",
          duration: 9000,
          isClosable: true,
        });
        setValues({ ...values, redirect: true });
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setValues({ ...values, loading: false });
      });
  };

  const didRedirect = () => {
    return values.redirect;
  };

  return (
    <>
      {values.redirect && <Navigate to="/login" replace={true} />}
      {isAuthnaticated() && <Navigate to="/home" />}
      <svg className="svgbg"></svg>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="white.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          {/* Upper Body Avatar */}
          <Avatar bg="blue.500" />
          <Heading color="blue.400">Welcome</Heading>

          <Box minW={{ base: "100%", md: "468px" }}>
            <form onSubmit={onSubmit}>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.400"
                boxShadow="md"
              >
                <FormControl>
                  <>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      backgroundColor={"whiteAlpha.600"}
                      type="email"
                      onChange={handleChange("email")}
                    />
                    <FormHelperText>
                      We'll never share your email.
                    </FormHelperText>
                  </>
                  <>
                    <FormLabel>Password</FormLabel>
                    <Input
                      backgroundColor={"whiteAlpha.600"}
                      type="password"
                      onChange={handleChange("password")}
                    />
                    <FormHelperText>Minimum 8 character Long</FormHelperText>
                  </>
                  <>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      backgroundColor={"whiteAlpha.600"}
                      onChange={handleChange("confirmPassword")}
                      type="password"
                    />
                  </>
                </FormControl>

                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="blue"
                  width="full"
                  isLoading={values.loading}
                >
                  Signup
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          {"New to us? "}
          <Link color="blue.500" href="">
            <RouterLink to="/Login">Login</RouterLink>
          </Link>
        </Box>
      </Flex>
    </>
  );
};

export default Signup;
