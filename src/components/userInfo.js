export default class UserInfo {
  constructor({ userNameSelector, userActivitySelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userActivitySelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  // getUserInfo() {
  //   return {
  //     'name': this._userName.textContent,
  //     'activity': this._userAbout.textContent
  //   };
  // }

  // getUserID(userData) {
  //   return this.userID = userData._id;
  // }

  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userAbout.textContent = userData.about;
    this._userAvatar.src = userData.avatar;
    // this._id = userData._id;
  }

  // setAvatar(avatar) {
  //   this._userAvatar.src = avatar;
  // }
}
