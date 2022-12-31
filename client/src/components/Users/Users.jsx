import React, { useEffect, useState } from "react";
import { fetchUsers } from "../../api/admin/fetchUsers";
import { UsersCard, Loading } from "../../components";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";

function Users() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState(false);
  useEffect(() => {
    fetchUsers().then((response) => {
      setUsers(response);
    });
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {!users && <Loading />}
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {users && <UsersCard users={users} />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Users;
