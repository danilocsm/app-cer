export const isAuthenticated = () =>
  sessionStorage.getItem("auth-token") !== null;

export const getToken = () => sessionStorage.getItem("auth-token");

export const getUser = () => sessionStorage.getItem("userId");
