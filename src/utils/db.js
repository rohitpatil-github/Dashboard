const USERS_KEY = 'dashboard_users';

// Initialize empty users array if it doesn't exist
if (!localStorage.getItem(USERS_KEY)) {
  localStorage.setItem(USERS_KEY, JSON.stringify([]));
}

const db = {
  getUsers: () => {
    const users = localStorage.getItem(USERS_KEY);
    return JSON.parse(users);
  },

  addUser: (user) => {
    const users = db.getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return user;
  },

  findUserByEmail: (email) => {
    const users = db.getUsers();
    return users.find(user => user.email === email);
  }
};

export default db; 