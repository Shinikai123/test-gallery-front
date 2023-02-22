import { FC, useRef } from "react";
import { useParams } from "react-router-dom";
import { IUser } from "../../../interfaces/User";
import userService from "../../../services/userService";
import "./UploadAvatar.css";


type Props = {
    setAvatar: (avatar: IUser[]) => void;
    avatar: IUser[];
};

const UploadAvatar: FC<Props> = ({setAvatar, avatar}) => {
    
    const fileRef = useRef(null);
    const {userId} = useParams();

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if(!file.type.includes('image')) {
                return null;
            }   else {
                try{
                    const response = await userService.uploadAvatar(userId!, file);
                    setAvatar([response, ...avatar]);
                } catch (e) {
                    console.log(e)
                }
            }
        }
    };

    return(
        <div>
            <label htmlFor="upload_button" className="upload_avatar_button">
                Upload Avatar
            </label>
            <input id="upload_button" type="file" accept="image/*" ref={fileRef} onChange={handleAvatarUpload} placeholder="Upload Avatar"></input>
        </div>
        )

}

export default UploadAvatar;