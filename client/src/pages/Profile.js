import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        const attributes = cognitoUser.attributes;
        console.log("attributes", attributes);
        setUser(attributes);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, []);

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
