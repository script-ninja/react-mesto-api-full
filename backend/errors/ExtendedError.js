module.exports = class ExtendedError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}