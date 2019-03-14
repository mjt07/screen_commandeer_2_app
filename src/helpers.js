export const has_role = (user, role) => {
    const roles  = user.roles;
    return roles.indexOf(role) > -1;
};