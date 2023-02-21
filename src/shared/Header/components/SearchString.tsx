import React, {FC, useEffect, useState} from "react";
import { IUser } from "../../../interfaces/User";
import userService from "../../../services/userService";
import { useAppSelector } from "../../../hooks/redux";
import Search from '../../../assets/search.png';


type Props = {
    setFilteredUsers: (arr: IUser[]) => void;
    arr: IUser[];
};

const SearchString: FC<Props> = ({ setFilteredUsers, arr}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState<IUser[]>([]);
    const {token} = useAppSelector(state => state.auth);

    const getUsers = async () => {
        if(token) {
            try{
                const response = await userService.getUsers(token);
                setUsers(response);
            } catch (e) {
                console.log(e);
            }
        }
    };

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setFilteredUsers(
            users.filter((user) => {
                return user.user_email?.toLowerCase().includes(searchQuery);
            })
        )
    }

    
  useEffect(() => {
    getUsers();
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setFilteredUsers(arr);
    }
  }, [searchQuery]);


  return(
    <div >
        <form className="search_string">
            <input 
            value={searchQuery}
            onChange={handleChangeText}
            className="search_string_input" 
            placeholder="Search accounts...">

            </input>
                <button className="search_string_button">
                    <img src={Search}></img>
                </button>
            </form>
        </div>

  )
}

export default SearchString;
