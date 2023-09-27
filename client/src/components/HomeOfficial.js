import React,{useState,useEffect} from "react";
import HomeAdmin from "./HomeAdmin";
import HomeUser from "./HomeUser";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const HomeOfficial = () => {
    const [users,setUsers] = useState();
    const location = useLocation();
    const user = location.state?.user;
    const navigate = useNavigate()


    const getUsers =async () =>{
        try {
            const response = await axios.get('http://localhost:8080/api/auth');
            setUsers(response.data)
            // console.log(response.data)
            // console.log(user)
        } catch (error) {
            console.log(error.message)
        }
    }

    const logoutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        navigate("/login");
      };
    useEffect(()=>{
        getUsers();
    },[])
    
  return (
    <div>
         <button
        className="image"
        style={{ backgroundColor: "#ff0000" }}
        onClick={logoutHandler}
      >
        Log out
      </button>
      {user?.isAdmin ? <HomeAdmin users={users} /> : <HomeUser user={user} users={users}/>}    
      {/* <p>{user?.isAdmin}</p> */}
    </div>
  );
};

export default HomeOfficial;
