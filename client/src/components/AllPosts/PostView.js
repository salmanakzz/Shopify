import React, { useRef } from 'react'
import DefaultProfile from "../../assets/images/DefaultProfile.png";
import Comment from "@mui/icons-material/ChatBubbleOutline";
import Share from "@mui/icons-material/Share";
import NotLiked from "@mui/icons-material/ThumbUpOffAlt";

const PostView = ({data,idx}) => {
    const { firstname, lastname, following, followers } = data.user[0];
    let { _id, likes, desc, comments } = data.posts;
    const profilePopupRef = useRef();
  return  <div
  className="post"
  onMouseLeave={() => {
    profilePopupRef.current.style.display = "none";
  }}
>
  <div className="post-header">
    <div
      ref={profilePopupRef}
      onMouseLeave={() => {
        profilePopupRef.current.style.display = "none";
      }}
      onMouseOver={() => {
        profilePopupRef.current.style.display = "block";
      }}
      id={"popup-profile" + idx}
      className="hidden shadow-lg mt-[2rem] absolute inline-block w-64 text-sm  bg-white rounded-lg "
    >
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <img
            className="cursor-pointer w-10 h-10 rounded-full"
            src={data.user[0]?.profilePictureUrl ?data.user[0].profilePictureUrl : DefaultProfile}
            // onClick={() => navigateProfile(data.user[0])}
            alt="Jese Leos"
          />

          <div>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              message
            </button>
          </div>
        </div>
        <p className=" text-base font-semibold leading-none ">
          <span
            // onClick={() => navigateProfile(data.user[0])}
            className="cursor-pointer"
          >
            {firstname + " " + lastname}
          </span>
        </p>
        <p className="mb-3 text-sm font-normal lowercase">
          @{firstname + lastname}
        </p>
        <p className="mb-4 text-sm font-light">
          Open-source contributor Building.
        </p>
        <ul className="flex text-sm font-light">
          <li className="mr-2">
            <span className="text-blue-600 font-semibold ">
              {following.length}
            </span>
            <span> Following</span>
          </li>
          <li>
            <span className="text-blue-600 font-semibold">
              {followers.length}
            </span>
            <span> Followers</span>
          </li>
        </ul>
      </div>
    </div>

    <div className="head">
      <div className="left">
        <img
          className="hover:cursor-pointer"
          src={data.user[0]?.profilePictureUrl ?data.user[0].profilePictureUrl : DefaultProfile}
          alt=""
        //   onClick={() => navigateProfile(data.user[0])}
          onMouseOver={() => {
            setTimeout(() => {
              profilePopupRef.current.style.display = "block";
            }, [500]);
          }}
          onMouseLeave={() => {
            profilePopupRef.current.style.display = "none";
          }}
        />
        <span>
          <b
            // onClick={() => navigateProfile(data.user[0])}
            className="hover:cursor-pointer"
            onMouseOver={() => {
              setTimeout(() => {
                profilePopupRef.current.style.display = "block";
              }, [500]);
            }}
            onMouseLeave={() => {
              profilePopupRef.current.style.display = "none";
            }}
          >
            {firstname + " " + lastname}
          </b>
        </span>
      </div>


    </div>
  </div>
  <div className="description pt-3">
      <span id={idx}>{desc}</span>

  </div>
  <img className="mt-3" src={data.imageUrl} alt="" />

  <div className="post-react">

      <NotLiked
        className="cursor-pointer"
        // onClick={() => handleLike(id, _id, postUserId)}
      />

    <Comment
      className="cursor-pointer"
    //   onClick={() => setCommentBox(!commentBox)}
    />
    <Share />
  </div>
  <span>{likes.length} Likes</span>
  {/* {commentBox && (
    <div className="comment-box-head">
      <hr className="mt-2 mb-2" />
      <div className="write-comment flex p-2 relative z[1]">
        <img src={DefaultProfile} alt="" className="w-9 h-9" />
        <div className="write-c-div flex bg-[#e2e6ed] rounded-full ml-1 w-full items-center">
          <input
            type="text"
            className="bg-[#e2e6ed] rounded-full ml-1 w-full text-[.87rem] custom-comment p-2 outline-0 border-0"
            placeholder="Write a comment..."
            onChange={(e) => setComment(e.target.value)}
          />
          <SendIcon
            className="hover:fill-[#005bd1] cursor-pointer m-2"
            sx={{ fill: "#0066ed" }}
            onClick={() =>
              hangleCommentSubmit(id, _id, postUserId, comment)
            }
          />
        </div>
      </div>
      <div className="comment-box max-h-96 overflow-y-auto">
        {postComments.map((comment, idx) => (
          <div key={idx} className="inner-box flex p-2">
            <img src={DefaultProfile} alt="" className="w-8 h-8" />
            <div className="bg-[#e2e6ed] p-2 rounded-lg ml-1">
              <h6 className="text-[.9rem] leading-tight">
                {comment.userDetails[0].firstname +
                  " " +
                  comment.userDetails[0].lastname}
              </h6>
              <span className="text-[.87rem] custom-comment leading-tight">
                {comment.comment}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )} */}
</div>

}

export default PostView