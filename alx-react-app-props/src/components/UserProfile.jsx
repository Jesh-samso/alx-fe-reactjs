import { useContext } from "react";
import UserContext from "./UserContext";


function UserProfile() {
  const userData = useContext(UserContext);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      {/* Add any other info if needed */}
    </div>
  );
}

export default UserProfile;
