import React, {FC, useEffect, useState} from "react";
import { IUser } from "../../../interfaces/User";
import videoService from "../../../services/videoService";
import { AccessEnum } from "../../../data/Access";
import { useNavigate } from "react-router-dom";

type Props = {
    user: IUser;
    videoId: string;
};

const UserCard: FC<Props> = ({user, videoId}) => {
    const [access, setAccess] = useState("");
    const navigate = useNavigate();

    const getAccess = async () => {
        try{
            const response = await videoService.getAccess(user.id, videoId);
            response?.access ?
            setAccess(response.access)
            :
            setAccess(AccessEnum.denied)
        } catch (e) {
            console.log(e);
        }
    };

    const handleChangeAccess = async (acc) => {
        try{
            if(acc) {
                await videoService.setAccess(user.id, videoId, acc);
                setAccess(acc);
            }
        } catch(e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getAccess();
    }, [videoId]);

}

export default UserCard;