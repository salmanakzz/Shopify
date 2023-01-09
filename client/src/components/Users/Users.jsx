import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../api/admin/fetchUsers";
import { Loading } from "../../components";
import { getUsersData } from "../../redux/usersDataReducer";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import User from "../User/User";

function Users({ blocked }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  let data = useSelector((state) => state.usersData.data);
  const loading = useSelector((state) => state.usersData.loading);
  const error = useSelector((state) => state.usersData.error);

  useEffect(() => {
    dispatch(getUsersData());
    console.log('iufgh');
  }, [blocked]);
  if (blocked) { 
    data = (data.filter((user) => user.blocked));
  }
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {loading && <Loading />}
        {error && error}
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
              <header className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">
                  {blocked ? "Blocked Users" : "Users"}
                </h2>
              </header>
              <div className="p-3">
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    {/* Table header */}
                    <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
                      <tr>
                        <th className="p-2">
                          <div className="font-semibold text-center">No</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-left">
                            Full Name
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Email Address
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Mobile Number
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Reports
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Details
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Block/UnBlock
                          </div>
                        </th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-sm font-medium divide-y divide-slate-100">
                      {/* Row */}
                      {data &&
                      data.map((user, index) => (
                          <User user={user} idx={index} />
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* {users && <UsersCard users={users} />} */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Users;
