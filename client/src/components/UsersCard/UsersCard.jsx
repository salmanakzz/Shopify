// import React, { useState } from "react";
// import BlockIcon from "@mui/icons-material/Block";
// import DefaultProfile from "../../assets/images/DefaultProfile.png";
// import { blockUser } from "../../api/admin/blockUser";
// import { useSnackbar } from "notistack";

// function UsersCard({ user}) {
//   const { enqueueSnackbar } = useSnackbar();
//   const [blocked, setBlocked] = useState(false);
//   const handleClickVariant = (message, variant) => {
//     enqueueSnackbar(message, {
//       variant,
//       anchorOrigin: {
//         vertical: "top",
//         horizontal: "right",
//       },
//     });
//   };

//   const handleBlockUser = (userId) => {
//     blockUser(userId).then((response) => {
//       const { status, userBlocked } = response;
//       console.log(response);
//       if (status === "ok" && userBlocked) {
//         handleClickVariant("User blocked!", "success");
//         setBlocked(true);
//         return;
//       }
//       handleClickVariant("Something went wrong!", "error");
//     });
//   };
//   return (
//     <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
//       <header className="px-5 py-4 border-b border-slate-100">
//         <h2 className="font-semibold text-slate-800">Users</h2>
//       </header>
//       <div className="p-3">
//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="table-auto w-full">
//             {/* Table header */}
//             <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
//               <tr>
//                 <th className="p-2">
//                   <div className="font-semibold text-center">No</div>
//                 </th>
//                 <th className="p-2">
//                   <div className="font-semibold text-left">Full Name</div>
//                 </th>
//                 <th className="p-2">
//                   <div className="font-semibold text-center">Email Address</div>
//                 </th>
//                 <th className="p-2">
//                   <div className="font-semibold text-center">Mobile Number</div>
//                 </th>
//                 <th className="p-2">
//                   <div className="font-semibold text-center">Reports</div>
//                 </th>
//                 <th className="p-2">
//                   <div className="font-semibold text-center">Details</div>
//                 </th>
//                 <th className="p-2">
//                   <div className="font-semibold text-center">Block/UnBlock</div>
//                 </th>
//               </tr>
//             </thead>
//             {/* Table body */}
//             <tbody className="text-sm font-medium divide-y divide-slate-100">
//               {/* Row */}
//               {users.map((user, index) => (
//                 <tr key={index}>
//                   {/* {setBlocked(user.blocked ? true : false)} */}
//                   <td className="p-2">
//                     <div className="text-center">{index + 1}</div>
//                   </td>
//                   <td className="p-2">
//                     <div className="flex items-center">
//                       <img
//                         src={
//                           user?.profilePictureUrl
//                             ? user.profilePictureUrl
//                             : DefaultProfile
//                         }
//                         alt=""
//                         width="36"
//                         height="36"
//                         className="shrink-0 mr-2 sm:mr-3 rounded-full"
//                       />
//                       <div className="text-slate-800">
//                         {user.firstname + " " + user.lastname}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-2">
//                     <div className="text-center ">{user.email}</div>
//                   </td>
//                   <td className="p-2">
//                     <div className="text-center">{user.mobile}</div>
//                   </td>
//                   <td className="p-2">
//                     <div className="text-center text-red-500">
//                       {user.reports.length}
//                     </div>
//                   </td>
//                   <td className="p-2">
//                     <div className="text-center text-sky-500 underline cursor-pointer">
//                       view
//                     </div>
//                   </td>
//                   <td className="p-2">
//                     {blocked ? (
//                       <div className="text-center text-red-500">
//                         <BlockIcon className="!w-[.9em] !h-[.9em] hover:text-gray-500 cursor-pointer" />
//                       </div>
//                     ) : (
//                       <div className="text-center text-gray-500">
//                         <BlockIcon
//                           onClick={() => handleBlockUser(user?._id)}
//                           className="!w-[.9em] !h-[.9em] hover:text-red-500 cursor-pointer"
//                         />
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UsersCard;
