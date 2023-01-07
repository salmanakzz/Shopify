import React, { useContext, useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import JsonSearch from "search-array";
import "./Searchbar.css";
import { ContextUser } from "../../store/MainContext";
import { fetchFriends } from "../../api/fetchFriends";
import DefaultProfile from "../../assets/images/DefaultProfile.png";
import { fetchAllUsers } from "../../api/fetchAllUsers";
import { useNavigate } from "react-router-dom";

function Searchbar({ setSearchChatUsers, page }) {
  const { currentUser, setProfileUser } = useContext(ContextUser);
  const [friends, setFriends] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [searchedUsers, setSearchedUsers] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const navigate = useNavigate()

  useEffect(() => {
    fetchFriends(currentUser._id).then(({ friendsArr }) => {
      setFriends(friendsArr);
    });
    fetchAllUsers().then(({ users }) => {
      users && setAllUsers(users);
    });
  }, []);

  const handleSearch = (e) => {
    if (page === "chats") {
      const searcher = new JsonSearch(e.target.value && friends && friends, {
        indice: {
          firstname: "firstname", // search the `firstname`
          lastname: "lastname", // search the `lastname`
        },
      });
      let foundObjects = searcher.query(e.target.value);
      setSearchChatUsers(foundObjects);
    }else{
      if(!e.target.value){
        handleClose()
        return
      }
      const searcher = new JsonSearch(e.target.value && allUsers && allUsers, {
        indice: {
          firstname: "firstname", // search the `firstname`
          lastname: "lastname", // search the `lastname`
        },
      });
      let foundObjects = searcher.query(e.target.value);
      console.log(foundObjects);
      setSearchedUsers(foundObjects);
      handleOpen();
    }
   
  };


  const navigateProfile = (user) => {
    setProfileUser(user);
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/profile");
  };
  return (
    <div className="searchbar">
      <div className="search bg-[#e2e6ed] ">
        <div className="search-icon">
          <SearchIcon />
        </div>
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search here..."
        />

        {open && (
          <div className="absolute top-[50px] flex flex-col container max-w-md  w-full items-center justify-center bg-white  rounded-lg shadow">
            <ul className="flex flex-col divide-y w-full max-h-[284px] overflow-scroll">
              {searchedUsers?.map((user)=>(
              <li className="flex flex-row searchlist" onClick={()=>navigateProfile(user)}>
                <div className="select-none flex flex-1 items-center justify-center p-2">
                  <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
                    <img
                      alt="profil"
                      src={user?.profilePictureUrl? user.profilePictureUrl : DefaultProfile}
                      className="mx-auto object-cover rounded-full h-10 w-10"
                    />
                  </div>
                  <div className="flex-1 pl-1">
                    <div className="text-black">{user.firstname} {user.lastname}</div>
                  </div>
                </div>
              </li>))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Searchbar;
