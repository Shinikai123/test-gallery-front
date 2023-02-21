import { FC, useState } from "react";
import { IUser } from "../../../interfaces/User";
import UserCard from "./UserCard";
import "./UserList.css";

const UserList: FC = () => {

    const [users, setUsers] = useState<IUser[]>([]);
    return(
        <div>
            {users.map((item) => (
                <div key={item.id}>
                    
                </div>
            ))}
        </div>
    )
}

export default UserList;