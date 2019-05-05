class User {
  generateUniqueId =
    () => Math.random().toString(36).substr(2, 6);

  getUsername =
    () => {
      const exist = localStorage.getItem('username');

      let username = null;
      if (!exist) {
        username = `user_${this.generateUniqueId()}`
        localStorage.setItem('username', username);
      } else {
        username = exist;
      }

      return username;

    };

  getUser = () => {
    return {
      name: this.getUsername()
    }
  }

}

export default new User();
