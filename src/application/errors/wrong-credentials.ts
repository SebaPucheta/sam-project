export default class WrongCredentialsError extends Error {
  constructor() {
    super('Invalid credentials');
  }
}
