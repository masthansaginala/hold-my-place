import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex w-full h-full overflow-hidden">
      <div className="w-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
