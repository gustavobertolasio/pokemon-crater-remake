export const comparePassword = (group) => {
  const password = group.get("password").value;
  const confirmPassword = group.get("confirmPassword").value;
  
  if (password && confirmPassword)
    return password === confirmPassword ? null : { notConfirmedPassword: true };

  return null;
};
