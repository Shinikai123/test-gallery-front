import { FC } from "react";
import { IUser } from "../../../interfaces/User";
import userService from "../../../services/userService";



type Props ={
    users: IUser[];
    setUsers: ( IUsers: IUser[]) => void;
    userId: string;
    isEdit: boolean;
    userName: string;
    setIsEdit: (bool: boolean) => void;
    userNameValue: string;
}

const EditProfile: FC<Props> =({
    users,
    setUsers,
    userId,
    isEdit,
    userName,
    setIsEdit,
    userNameValue,
}) => {

    const handleEditUser = async () => {
        setIsEdit(true);
      };
    
      const handleSave = async () => {
        try{
          await userService.updateUser(userId, userNameValue);
          const updatedUser = users.map((user) => {
            return {
              ...user,
              userName: user.id === userId ? userNameValue : user.user_name,
            }
          });
          console.log(updatedUser);
          setUsers(updatedUser);
        } catch (e) {
          console.log(e);
        } finally{
          setIsEdit(false);
        }
      }
    return(
        <form>
        {isEdit ? (
        <input className="profile_account_info_right_header_button" type="button" value="Save" onClick={handleSave}></input>    
        ) : (
        <input className="profile_account_info_right_header_button" type="button" value="Edit Profile" onClick={handleEditUser}></input>
        )}
        </form>
       
    )
}

export default EditProfile;