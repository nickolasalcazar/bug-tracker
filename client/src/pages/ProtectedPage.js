import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { getProtectedMessage } from "../services/message";

// A page for demoing accessing authorized data from the backend.
export default function ProtectedPage() {
  const [message, setMessage] = useState("");

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getProtectedMessage(accessToken);

      if (!isMounted) {
        return;
      }

      if (data) {
        setMessage(JSON.stringify(data, null, 2));
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  return (
    <div>
      <div>
        <h1>Protected Page</h1>
        <div>
          <p>
            <span>
              This page retrieves a <strong>protected message</strong> from an
              external API.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
