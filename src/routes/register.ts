import graphqlClient from "../utils/graphql-client"
import express from "express"
// import GQL_CREATE_USER from "../gql/user/createUser.gql"
import { cryptPassword } from "../utils/crypt"

const router = express.Router()

router.post("/", async (req, res, next) => {
  const { email, password } = req.body
  const hashedPassword = await cryptPassword(password)
  console.log(email, password, hashedPassword)
  // graphqlClient
  //   .request(GQL_CREATE_USER, { email, name: email, password: hashedPassword })
  //   .then((data) => {
  //     res.json(data)
  //   })
  //   .catch((error) => {
  //     next(error)
  //   })
})

export default router
