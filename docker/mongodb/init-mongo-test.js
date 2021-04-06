db.createUser({
  user: "marstest",
  pwd: "marstest",
  roles: [
    {
      role: "readWrite",
      db: "marstest",
    },
  ],
});
