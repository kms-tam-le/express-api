class UserDocument {
  constructor(rawData) {
    this.userName = rawData.userName;
    this.email = rawData.email;
  }
}
module.exports = UserDocument;
