let authUsers = [
    {
      "username": "SASHA",
      "password": "HHJJKK"
    }
  ]

export const getAuthUser = (username) => {
    return authUsers.find(u => u.username === username);
}

export const userNameExists = (username) => {
    return !!authUsers.find(u => u.username === username); 
}



