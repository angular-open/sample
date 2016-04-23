import Profile = require("profileData");

export class User {
  constructor(
     public username: string,
     public email: string,
     public password: string,
     public conformPassword: string,
     public profile?: Profile[]
  ) {  }
}