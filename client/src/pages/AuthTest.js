import { Authenticator } from "@aws-amplify/ui-react";

// import "@aws-amplify/ui-react/styles.css";

export default function AuthTest() {
  // useEffect(() => {
  //   console.log("getSessionInfo =", getSessionInfo());
  // });

  // const getSessionInfo = async () =>
  // (await Auth.currentSession()).getIdToken().getJwtToken();

  // Auth.currentUserInfo().then((data) =>
  //   console.log("Auth.currentUserInfo()", data)
  // );

  return (
    <>
      <h1>/auth-test</h1>
      <Authenticator signUpAttributes={["name"]}>
        {({ signOut, user }) => (
          <div>
            <p>Welcome {user.username}</p>
            <button onClick={signOut}>Sign out</button>
          </div>
        )}
      </Authenticator>
    </>
  );
}
