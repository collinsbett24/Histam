export class Users{
  public Id: number;
  public username: string;
  public email: string;
  public password: string;

  constructor(Id:number, username: string, password:string, email:string){
    this.Id = Id;
    this.username = username;
    this.password = password;
    this.email = email;
  }
}