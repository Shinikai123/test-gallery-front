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

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if(!file.type.includes('image')) {
                return null;
            }   else {
                try{
                    await dispatch(uploadAvatarAsync(file));
                } catch (e) {
                    console.log(e)
                }
            }
        }
    };

    return(
        <div >
            <label htmlFor="upload_button">
                Upload Avatar
            </label>
            <input id="upload_button" type="file" accept="image/*" ref={fileRef} onChange={handleAvatarUpload} placeholder="Upload Avatar"></input>
        </div>
        )

}

export default UploadAvatar;