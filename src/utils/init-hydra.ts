import {
  Configuration,
  JwkApi,
  JwkApiCreateJsonWebKeySetRequest,
  OAuth2Api,
  OAuth2ApiCreateOAuth2ClientRequest,
} from "@ory/client"

const createClient = async (name: string, uris: string[]) => {
  const api = new OAuth2Api(
    new Configuration({
      basePath: process.env.HYDRA_ADMIN_URL,
    }),
  )
  const req: OAuth2ApiCreateOAuth2ClientRequest = {
    oAuth2Client: {
      grant_types: ["authorization_code", "refresh_token"],
      redirect_uris: uris,
      response_types: ["id_token", "code"],
      scope: "openid offline_access email",
      client_name: name,
      post_logout_redirect_uris: uris,
      token_endpoint_auth_method: "none",
      audience: uris.map((uri) => new URL(uri).origin),
      allowed_cors_origins: uris.map((uri) => new URL(uri).origin),
    },
  }
  const res = await api.createOAuth2Client(req)
  console.log(res.status, res.data.client_id, res.data.client_secret)
}

const createJWK = async () => {
  const api = new JwkApi(
    new Configuration({
      basePath: process.env.HYDRA_ADMIN_URL,
    }),
  )
  const req: JwkApiCreateJsonWebKeySetRequest = {
    set: "hydra.openid.id-token",
    createJsonWebKeySet: {
      alg: "RS256",
      use: "sig",
      kid: crypto.randomUUID(),
    },
  }
  await api.createJsonWebKeySet(req)
};

(() => {
  createClient("18cms", ["http://localhost:3000/callback"])
  createJWK()
})()