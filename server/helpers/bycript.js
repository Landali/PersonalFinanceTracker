bcrypt = require('bcryptjs')

module.exports = {
    cryptPassword: (password, salt) =>
        bcrypt.genSalt(salt)
            .then((salt => bcrypt.hash(password, salt)))
            .then(hash => hash),

    comparePassword: (password, hashPassword) =>
        bcrypt.compare(password, hashPassword)
            .then(resp => resp)
}
