// This is SSR example
import React from "react";

export async function getUsers() {
  try {
    let data = await fetch("http://localhost:3000/api/users", {
      cache: "no-store",
    });
    let users = await data.json();
    return users;
  } catch (error) {
    console.error(error);
  }
}

async function ComponentB() {
  const users = await getUsers();

  return (
    <div className="w-96 m-auto p-10">
      <ul>
        {users.length > 0 ? (
          users.map((user: any) => <li key={user.id}>{user.name}</li>)
        ) : (
          <p>No users found</p>
        )}
      </ul>
    </div>
  );
}

export default ComponentB;
