import React, { useState } from "react";
import BlockIcon from "@mui/icons-material/Block";
import DefaultProfile from "../../assets/images/DefaultProfile.png";
import { blockUser } from "../../api/admin/blockUser";
import { useSnackbar } from "notistack";
import { unBlockUser } from "../../api/admin/unBlockUser";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import PostView from "./PostView";

function Post({ post, idx }) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [blocked, setBlocked] = useState(post?.posts?.blocked ? true :false);
  const handleClickVariant = (message, variant) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  const handleBlockUser = (userId) => {
    blockUser(userId).then((response) => {
      const { status, userBlocked } = response;
      if (status === "ok" && userBlocked) {
        handleClickVariant("User blocked!", "success");
        setBlocked(true);
        return;
      }
      handleClickVariant("Something went wrong!", "error");
    });
  };

  const handleUnBlockUser = (userId) => {
    unBlockUser(userId).then((response) => {
      const { status, userUnBlocked } = response;
      if (status === "ok" && userUnBlocked) {
        handleClickVariant("User unblocked!", "success");
        setBlocked(false);
        return;
      }
      handleClickVariant("Something went wrong!", "error");
    });
  };
  return (
    <>
    <tr key={idx}>
      <td className="p-2">
        <div className="text-center">{idx + 1}</div>
      </td>
      <td className="p-2">
        <div className="flex items-center">
          <img
            src={
              post?.imageUrl ? post.imageUrl : DefaultProfile
            }
            alt=""
            width="36"
            height="36"
            className="shrink-0 mr-2 sm:mr-3 rounded-full"
          />
          <div className="text-slate-800">
            {post?.posts?._id}
          </div>
        </div>
      </td>
      <td className="p-2">
        <div className="text-center "> {post?.user[0]?._id}</div>
      </td>
      <td className="p-2">
        <div className="text-center ">{post?.posts?.date}</div>
      </td>
      <td className="p-2">
        <div className="text-center">{post?.posts?.reports?.length}</div>
      </td>
      <td className="p-2">
        <div className="text-center text-sky-500 underline cursor-pointer" onClick={handleOpen}>
          view
        </div>
      </td>
      <td className="p-2">
        {blocked ? (
          <div  onClick={() => handleUnBlockUser(post?.posts?._id)} className="text-center text-red-500">
            <BlockIcon className="!w-[.9em] !h-[.9em] hover:text-gray-500 cursor-pointer" />
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <BlockIcon
              onClick={() => handleBlockUser(post?.posts?._id)}
              className="!w-[.9em] !h-[.9em] hover:text-red-500 cursor-pointer"
            />
          </div>
        )}
      </td>
    </tr>
    <Modal
          className="w-[auto]"
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box
            sx={{
              ...style,
              width: "auto",
              padding: "0",
              borderRadius: ".5rem",
            }}
          >
            <PostView data={post}/>
                 </Box>
        </Modal>
    </>
  );
}

export default Post;


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
