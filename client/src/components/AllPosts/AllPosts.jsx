import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../api/admin/fetchAllPosts";
import { Loading } from "../../components";
import { getAllPosts } from "../../redux/postsDataReducer";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import Post from "./Post";

function AllPosts({ blocked }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const data = useSelector((state) => state.postsData.data);
  const loading = useSelector((state) => state.postsData.loading);
  const error = useSelector((state) => state.postsData.error);
  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

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
                  {blocked ? "Blocked Posts" : "Posts"}
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
                          <div className="font-semibold text-left">image</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            userId
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Post Date
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
                        data.map((post, index) => (
                          <Post post={post} idx={index} />
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

export default AllPosts;
