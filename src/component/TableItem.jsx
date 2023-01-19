import React from "react";
import {
  ChakraProvider,
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  HStack,
  Box,
  IconButton,
  Flex,
  Spacer,
  Input,
  Link,
  useToast,
  Heading,
  Tooltip,
} from "@chakra-ui/react";
import {
  ExternalLinkIcon,
  EditIcon,
  CopyIcon,
  AddIcon,
  Search2Icon,
  DeleteIcon,
} from "@chakra-ui/icons";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { Link as RouterLink } from "react-router-dom";
import { isAuthnaticated, removeOnePassword } from "../server/user";

const Table_Item = (props) => {
  const { product, username, password, _id, loadPw } = props.data;
  const handleEdit = () => {};
  // const clipboard = electron.clipboard
  const toast = useToast();
  const { token } = isAuthnaticated();

  //   For alert Dilog
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleDelete = () => {
    removeOnePassword({ _id }, token)
      .then((res) => {
        if (res.error) {
          console.log(res);
        } else {
          console.log("DELETED SUCCESFULLY");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        onClose();
        loadPw();
      });
  };

  // const toast = useToast;
  return (
    <>
      <Tr>
        <Td>
          <Tooltip label={`go to ${product}`}>
            <Link
              href={
                product.substring(0, 4) == "http"
                  ? product
                  : "https://" + product
              }
              target="_blank"
              isExternal
            >
              {product} <ExternalLinkIcon mx="2px" />
            </Link>
          </Tooltip>
        </Td>
        <Td>
          {}
          {username}
          <IconButton
            variant="ghost"
            colorScheme="twitter"
            aria-label="Call Sage"
            fontSize="15px"
            marginLeft="20px"
            // onClick={() =>
            //   toast({
            //     title: 'Copied',
            //     status: 'info',
            //     duration: 2000,
            //     isClosable: true,
            //     size: 'sm',
            //   })
            // }
            icon={<CopyIcon />}
          />
        </Td>
        <Td isNumeric>
          {password}

          <IconButton
            variant="ghost"
            colorScheme="twitter"
            aria-label="Call Sage"
            fontSize="15px"
            marginLeft="20px"
            icon={<CopyIcon />}
            // onClick={() => clipboard.writeText(password)}
            // onClick = {() => navigator.clipboard.writeText(password)}
          />
        </Td>
        <Td>
          <HStack spacing="24px">
            <RouterLink
              to="/UpdatePassword"
              state={{ _id, product, username, password }}
            >
              <IconButton
                variant="ghost"
                colorScheme="twitter"
                aria-label="Call Sage"
                fontSize="20px"
                icon={<EditIcon />}
                onClick={handleEdit}
              />{" "}
            </RouterLink>

            <IconButton
              variant="ghost"
              colorScheme="twitter"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<DeleteIcon />}
              onClick={onOpen}
            />
          </HStack>
        </Td>
      </Tr>
      <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Customer
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    </>
  );
};

export default Table_Item;
