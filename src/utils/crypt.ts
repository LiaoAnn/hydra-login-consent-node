import bcrypt from "bcrypt"

export const cryptPassword = async (password: string) => {
  const saltRounds = 10
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) reject(err)
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) reject(err)
        resolve(hash)
      })
    })
  })
}

export const comparePassword = async (
  password: string,
  hashPassword: string,
) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashPassword, function (err, result) {
      if (err) reject(err)
      resolve(result)
    })
  })
}
