import { useContext } from "react";
import { UserContext } from "../App";

function Profile() {
  const user = useContext(UserContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <form>
        <label>
          Name:
          <input type="text" value={user.name} readOnly />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={user.email} readOnly />
        </label>
        <br />
        <label>
          Profile Picture:
          <img src={user.picture} alt="Profile" />
        </label>
      </form>
    </div>
  );
}

export default Profile;
