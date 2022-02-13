export default class UserInfo {
  constructor({ userNameSelector, userActivitySelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userActivitySelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo(getUserData, { setInputValues }) {
    getUserData()
      .then(res => {
        setInputValues(res)
      })
      .catch((err) => console.log(err))
  }

  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userAbout.textContent = userData.about;
  }

  setAvatar(userData) {
    this._userAvatar.src = userData.avatar;
  }
}
