import React, { useState } from "react";
import BlockIcon from "@mui/icons-material/Block";
import DefaultProfile from "../../assets/images/DefaultProfile.png";
import { blockUser } from "../../api/admin/blockUser";
import { useSnackbar } from "notistack";
import { unBlockUser } from "../../api/admin/unBlockUser";

function User({ user, idx }) {
  const { enqueueSnackbar } = useSnackbar();
  const [blocked, setBlocked] = useState(user.blocked ? true :false);
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
    <tr key={idx}>
      <td className="p-2">
        <div className="text-center">{idx + 1}</div>
      </td>
      <td className="p-2">
        <div className="flex items-center">
          <img
            src={
              user?.profilePictureUrl ? user.profilePictureUrl : DefaultProfile
            }
            alt=""
            width="36"
            height="36"
            className="shrink-0 mr-2 sm:mr-3 rounded-full"
          />
          <div className="text-slate-800">
            {user.firstname + " " + user.lastname}
          </div>
        </div>
      </td>
      <td className="p-2">
        <div className="text-center ">{user.email}</div>
      </td>
      <td className="p-2">
        <div className="text-center">{user.mobile}</div>
      </td>
      <td className="p-2">
        <div className="text-center text-red-500">{user.reports.length}</div>
      </td>
      <td className="p-2">
        <div className="text-center text-sky-500 underline cursor-pointer">
          view
        </div>
      </td>
      <td className="p-2">
        {blocked ? (
          <div  onClick={() => handleUnBlockUser(user?._id)} className="text-center text-red-500">
            <BlockIcon className="!w-[.9em] !h-[.9em] hover:text-gray-500 cursor-pointer" />
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <BlockIcon
              onClick={() => handleBlockUser(user?._id)}
              className="!w-[.9em] !h-[.9em] hover:text-red-500 cursor-pointer"
            />
          </div>
        )}
      </td>
    </tr>
  );
}

export default User;
