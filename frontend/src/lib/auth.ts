export const saveToken = (token: string) => {
  localStorage.setItem("task_token", token);
};

export const getToken = () => {
  return localStorage.getItem("task_token");
};

export const logout = () => {
  localStorage.removeItem("task_token");
};
