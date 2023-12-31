import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/operations/authAPI";
import SidebarLink from "./SidebarLink";
import { useNavigate } from "react-router";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../Common/ConfirmationModal";

const Sidebar = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (authLoading || profileLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        Loading....
      </div>
    );
  }
  // console.log(sidebarLinks);
  return (
    <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
         <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}
        </div>

      {/* Horizontal line */}
      <div className="mx-auto mt-6 mb-6 w-10/12 h-[1px] bg-richblack-700"></div>

      {/* logout  */}
      <div className="flex flex-col">
        <SidebarLink
          link={{ name: "settings", path: "dashboard/settings" }}
          iconName="VscSettingsGear"
        />
        <button
          onClick={() =>
            setConfirmationModal({
              text1: "Are you sure ?",
              text2: "You will logged out of your account",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModal(null),
            })
          }
          className="px-8 py-2 text-sm font-medium text-richblack-300"
        >
          <div className=" flex items-center gap-x-2 ">
            <VscSignOut className="text-lg" />
            <span >Logout</span>
          </div>
        </button>
      </div>

      {/* when to show modal  */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;
