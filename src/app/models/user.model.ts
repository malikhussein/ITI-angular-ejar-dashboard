export interface User {
  _id: string;
  userName: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  confirmEmail: boolean;
  dob: string;
  address: string;
  idNumber: string;
  gender: string;
  createdAt: string;
  profilePicture?: string;

  idPictureFrontPath: string;
  idPictureBackPath: string;
}
