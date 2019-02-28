import DataBase from './db.js'

class UserDatabase extends DataBase {

  constructor() {
    super('users')
    this.arguments = ['login', 'money']
  }

  getId(login) {
    return this.dates.find(user => user.login === login)
  }

  generateFakeUsers() {
    if (this.isEmpty()) {
      return [
        this.insert('Lexa', 7800).id,
        this.insert('Oleg', 3).id,
        this.insert('Macho', 8000).id
      ]
    } else return []
  }

  getCurrentUser() {
    return this.find(this.sessionUserId()) || null
  }

  updateCurrentUser(login) {
    sessionStorage['sessionUserId'] = this.getId(login).id
  }

  addMoney(money) {
    const id = this.sessionUserId()
    const userMoney = +super.find(id).money
    this.changeData(id, 'money', userMoney + +money)
  }
}

export default UserDatabase
