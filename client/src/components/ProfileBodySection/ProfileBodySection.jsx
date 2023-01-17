import PostSide from "../PostSide/PostSide";
import ProfileLeftSide from "../ProfileLeftSide/ProfileLeftSide";
import "./ProfileBodySection.css";

function ProfileBodySection({friends}) {

  return (
    <div className="profile-body-inner">
      <ProfileLeftSide friends={friends}/>
      <PostSide page={"profile"}/>
      
    </div>
  );
}

export default ProfileBodySection;
