import { getAllPassword, isAuthnaticated } from "./server/user";

const getHeadersAndData = () => {
  const { token, userId } = isAuthnaticated();
  return getAllPassword(token, userId).then((res) => {
    if (res.error) {
      console.log(res.error);
      return false;
    } else {
      const headers = [
          {label:"Product",key:"product"},
          {label:"UserName_ID",key:"username"},
        {label:"Password",key:"password"}
      ];
      const data = [...res.items];
      return { headers, data };
    }
  });
};

export default getHeadersAndData;
