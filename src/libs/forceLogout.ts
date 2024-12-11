const forceLogout = () => {
  const tokenKey = `sb-${import.meta.env.VITE_PROJECT_ID}-auth-token`;
  if (localStorage.getItem(tokenKey)) {
    localStorage.removeItem(tokenKey);
  }

  window.location.reload();
};

export default forceLogout;
