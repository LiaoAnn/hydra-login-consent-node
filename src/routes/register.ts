import graphqlClient from "../utils/graphql-client"
import express from "express"
import { cryptPassword } from "../utils/crypt"
import { GQL_CREATE_USER, GQL_GET_USER_BY_ACCOUNT } from "../utils/gqls"

const router = express.Router()

router.post("/", async (req, res, next) => {
  const { account, password } = req.body
  if (!account || !password) {
    return res.status(400).json({ error: "請輸入帳號及密碼" })
  }

  const existingUser = await graphqlClient.request<{ users: any[] }>(GQL_GET_USER_BY_ACCOUNT, { account })
  if (existingUser.users.length > 0) {
    return res.status(400).json({ error: "該用戶已存在，請輸入其他帳號" })
  }

  const hashedPassword = await cryptPassword(password)
  graphqlClient
    .request(GQL_CREATE_USER, { account, nickname: account, password: hashedPassword })
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      next(error)
    })
})

export default router
