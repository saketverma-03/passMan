import { useContext, useEffect, useState } from "react";
import "../index.css";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { Link as RouterLink, Navigate } from "react-router-dom";
import { isAuthnaticated, login as signin, signup } from "../server/user.js";

const Login = () => {
  // Variables
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
    token: "",
    user: {},
    redirect: false,
  });
  const toast = useToast();
  // HANDLER FUNTIONS

  // HandleChange On Typing
  const handleChange = (item) => (event) => {
    setValues({ ...values, [item]: event.target.value });
  };
  // const { setUser } = useContext(UserContext);

  // DEBUGING
  useEffect(() => {
    if (values.redirect) {
      toast({
        title: "Redirecting",
        status: "loading",
        duration: 9000,
        isClosable: false,
      });
    }
  }, [values]);

  const onSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true });
    const { email, password } = values;
    signin({ email, password })
      .then((res) => {
        if (res.error) {
          console.log(res.error);
          setValues({ ...values, loading: false });
          return toast({
            title: "Faile To Login",
            description: res.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }

        setValues({
          ...values,
          token: res.token,
          user: res.user,
          loading: false,
          redirect: true,
        });
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setValues({ ...values, loading: false });
      });
  };

  return (
    <>
    {isAuthnaticated() && <Navigate to="/home" replace={true}/> }
      <svg className="svgbg"></svg>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="whiteAlpha.100"
        justifyContent="center"
        alignItems="center"
        // background="black"
      >
        {/* {DidRedirect()} */}
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          {/* Upper Body Avatar */}
          <Avatar bg="blue.500" />
          <Heading color="blue.400">Login</Heading>

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
                    <Input backgroundColor={"whiteAlpha.600"} type="email" onChange={handleChange("email")} />
                    <FormHelperText>
                      We'll never share your email.
                    </FormHelperText>
                  </>
                  <>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      onChange={handleChange("password")}
                      backgroundColor={"whiteAlpha.600"}
                    />
                    <FormHelperText>Minimum 8 character Long</FormHelperText>
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
                  Login
                </Button>
                {/* <form>
                <HStack><Box>lololo</Box>Nomination</HStack>
                </form> */}
              </Stack>
            </form>
          </Box>

          <Box>
            {"Already Have an Account"}
            <Link color="blue.500" href="">
              <RouterLink to="/signup">Signup</RouterLink>
            </Link>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Login;
