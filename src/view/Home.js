import React, { useEffect, useState } from "react";
import Popup from "react";
import { getGroups, getName, getUID, handleCreateGroup } from "../firebase";

function Home() {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const [userGroups, setUserGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getGroups();
        setUserGroups(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {userGroups.map((item, index) => (
          <li key={index}>
            <p>
              {index}: {item}
            </p>
          </li>
        ))}
      </ul>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
export default Home;
