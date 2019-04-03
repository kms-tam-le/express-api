exports.get = async () => {
    return [
        {
        userName: 'AAAA',
        email: 'noemail@abc.com'
        }
    ];
};

exports.post = async (user) => {
    return user;
};