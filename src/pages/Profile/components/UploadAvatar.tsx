import { FC, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { IUser } from "../../../interfaces/User";
import userService from "../../../services/userService";
import { uploadAvatarAsync } from "../../../store/reducers/authSlice";
import "./UploadAvatar.css";


const UploadAvatar: FC = () => {
    
    const fileRef = useRef(null);
    const {userId} = useParams();
    const dispatch = useAppDispatch();

    const handleAvatarUpload = async (e) => {
        if(e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            console.log(file);
            
            if(!file.type.includes("image")) {
                return ;
            }   else {
                try{
                    await dispatch(uploadAvatarAsync(file));
                     const res = await userService.getAvatar(userId!);
                    // console.log(res);
                    
                } catch (e) {
                    console.log(e)
                }
            }
        }
    };

    return(
        <div  className="upload_avatar_button" onClick={handleAvatarUpload}>
            <label htmlFor="upload_button_avatar">
                Upload Avatar
            </label>
            <input id="upload_button_avatar" type="file" ref={fileRef} accept="image/*"  placeholder="Upload Avatar"></input>
        </div>
        )

}

export default UploadAvatar;