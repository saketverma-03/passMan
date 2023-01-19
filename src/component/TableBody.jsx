import React, { useState, useEffect } from 'react';
import Table_Item from './TableItem';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
} from '@chakra-ui/react';
import { isAuthnaticated, getAllPassword } from '../server/user';

const Table_body = () => {
  // const [values, setValues] = useState([]);
  const toast = useToast();
  // const { token } = isAuthnaticated();
  const [pwdList, setPwdList] = useState([]);
  const { token, userId } = isAuthnaticated();

  useEffect(() => {
    loadPw();
  }, []);

  const loadPw = () => {
    getAllPassword(token, userId)
      .then((res) => {
        if (res.error) {
          return console.log(res);
        }
        setPwdList([...res.items]);
      })
      .catch((e) => console.log(e))
      .finally(() => console.log(pwdList));
    // console.log();
  };

  return (
    <TableContainer>
      <Table colorScheme={'gray'} variant="simple" size={'sm'}>
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Website</Th>
            <Th>Username</Th>
            <Th>Password</Th>
            <Th>Options</Th>
          </Tr>
        </Thead>
        <Tbody>
          {pwdList.map((item, i) => {
            return (
              <Table_Item
                key={item._id}
                data={{
                  product: item.product,
                  username: item.username,
                  password: item.password,
                  _id: item._id,
                  loadPw: () => loadPw()
                }}
              />
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Table_body;
