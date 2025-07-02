import { useNavigate } from "react-router";
import { useEffect } from "react";

function Root() {
  const navigate = useNavigate();

  // since we currently have no way to authenticate, just assume users are not logged in
  const isLoggedIn = false;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  });

  return <></>;
}

export default Root;
