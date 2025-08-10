import { useEffect, useState } from "react";

export default function Homepage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("loggedInUser"));
    setProfile(storedProfile);
  }, []);

  return (
    <div>
      Welcome{" "}
      {profile ? (
        <h6>{profile.firstName + " " + profile.lastName}</h6>
      ) : (
        <h6>Guest</h6>
      )}
    </div>
  );
}
