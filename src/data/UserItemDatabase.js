import DataBase from './db.js'

class UserItemDatabase extends DataBase {
    constructor(userDb, itemDb) {
        super('userItem')
        this.userDb = userDb
        this.itemDb = itemDb
        this.arguments = ['userId', 'itemId']
      }

      addItem(userId, itemId) {
        if(!this.userDb.find(userId) && !this.itemDb.find(itemId)) return null
        this.insert(userId, itemId)
      }

      present(user) {
        const presents = [
        this.itemDb.getId('name', 'Меч короля'),
        this.itemDb.getId('name', 'Шпора Матан')
        ]

        const presentsAdd = [...this.pushSameValue(presents[0], this.random(4)), ...this.pushSameValue(presents[1], this.random(2))]
          .sort((a, b) => Math.random() -0.5)
        presentsAdd.forEach(present => this.addItem(user, present))
      }

      presentAllUsers(arrIds) {
        if (arrIds) arrIds.forEach(id => this.present(id))
      }

      getItems(userId) {
        return this.dates
          .filter(userItem => userItem.userId === userId)
          .map(userItem => this.itemDb.find(userItem.itemId))
      }
}

export default UserItemDatabase