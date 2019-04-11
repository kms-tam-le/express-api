exports.authorize = (user, permissions) => user.permissions
  .some(element => permissions.includes(element));
