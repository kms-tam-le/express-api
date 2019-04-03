class User {
    constructor(username) {
        this.username = username;
        this.email = 'no-email@.com';
        this.permissions = ['Admin', 'Manager'];
    }
};
module.exports = User;