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
  const args = process.argv.slice(2);
  if (args[0] === '-h' || args[0] === '--help') {
    console.log('Usage: init-hydra [OPTIONS] [ARGS]');
    console.log('Options:');
    console.log('  -h, --help    Show this help message and exit');
    console.log('  -c, --client  Create a new OAuth2 client');
    console.log('  example: init-hydra -c <client_name> http://url1 http://url2 ...')
    console.log('  -j, --jwk     Create a new JWK');
    console.log('  example: init-hydra -j')
    return;
  }

  if (args[0] === '-c' || args[0] === '--client') {
    const callbacks = args.slice(2);
    if (callbacks.length === 0) {
      console.log('Missing client name and redirect URIs.');
      return;
    }
    createClient(args[1], args.slice(2))
    return;
  }
  if (args[0] === '-j' || args[0] === '--jwk') {
    createJWK()
    return;
  }

  console.log('Invalid option. Use -h or --help for more information.');
})()