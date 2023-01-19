const API = "https://password-manager-backend.onrender.com"

export const login = (user) => {
  console.log("### i was called");
  // const myHeaders.append('Content-Type', 'application/json');
  const raw = JSON.stringify(user);
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: raw,
  };

  return fetch(`${API}/api/user/signin`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (!data.error) {
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("userId", JSON.stringify(data.user._id));
      }
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signup = (user) => {
  const raw = JSON.stringify(user);
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: raw,
  };

  return fetch(`${API}/api/user/signup`, requestOptions)
    .then((response) => {
      if(response.error){
        return response;
      }
     return response.json()
    })
    .catch((error) => console.log(error));
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};

// returns false or tokenString
export const isAuthnaticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("token")) {
    let token = JSON.parse(localStorage.getItem("token"));
    let userId = JSON.parse(localStorage.getItem("userId"));
    // return console.log("##",localStorage.getItem('token'))
    return { token, userId };
  }
  return false;
};

export const addOnePasword = (item, token) => {
  const raw = JSON.stringify(item);
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: raw,
  };

  return fetch(
    `${API}/api/password/addPassword`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getAllPassword = (token, userId) => {
  // const raw = JSON.stringify(item);
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(
    `${API}/api/password/getAllPassword/${userId}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const updateOnePassword = (item, token) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(item),
  };

  return fetch(
    `${API}/api/password/updateOnePassword`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const removeOnePassword = (item, token) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(item),
  };

  return fetch(
    `${API}/api/password/deletOnePassword`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  console.log("CALLED");
};
