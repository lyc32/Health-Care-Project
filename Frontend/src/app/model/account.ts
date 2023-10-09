export class Account
{
  id:number = -1; // account ID
  firstName: string = ''; // user name
  lastName: string = ''; // user name
  phone:string = '';// user phone number
  emailId:string = '';// user email id
  password:string = ''; // user password
  gender:string = ''; // user gender
  birthday:string = ''; // user birthday
  details:string = ''; // json string: doctor's work experience, CV ?
  type:string = ''; // account type: user, doctor, admin
  subtype:string = '';
  photo:string ='https://media.istockphoto.com/id/522855255/vector/male-profile-flat-blue-simple-icon-with-long-shadow.jpg?s=612x612&w=0&k=20&c=EQa9pV1fZEGfGCW_aEK5X_Gyob8YuRcOYCYZeuBzztM=';
}
