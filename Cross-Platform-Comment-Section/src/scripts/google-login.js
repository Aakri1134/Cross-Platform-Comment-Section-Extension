import qs from "qs";

// ─────────────────────────────────────────────────────────────────────────────

export const getAuthToken = async () => {
  try {
    //
    const { access_token } = await launchWebAuthFlow_and_getAccessToken();
    return access_token;
    //
  } catch (error) {
    console.error(`error-googleLogin`, error);
    return null;
  }
};

// ─────────────────────────────────────────────────────────────────────────────

const launchWebAuthFlow_and_getAccessToken = async () => {
  const manifest = chrome.runtime.getManifest();
  const { url } = generateBaseUrl_and_redirectUri();

  url.searchParams.set("response_type", "token");
  url.searchParams.set("scope", manifest.oauth2.scopes.join(" "));

  const { access_token } = await launchWebAuthFlow_and_returnCallBackParams({
    url,
  });

  return { access_token };
};

// ─────────────────────────────────────────────────────────────────────────────

const generateBaseUrl_and_redirectUri = () => {
  const manifest = chrome.runtime.getManifest();

  // https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow#redirecting
  const url = new URL("https://accounts.google.com/o/oauth2/auth");

  // NOTE:
  // save EXACT redirectUri on google cloud console > credentials > OAuth 2.0 Client IDs > Web client
  // save EXACT redirectUri on supabase > Authentication > URL Configuration > Redirect URLs
  const redirectUri = chrome.identity.getRedirectURL("firebase-auth");
  console.log(redirectUri);
  // console.log(`redirectUri`, redirectUri) // -> https://dekkcnhhmkcahbhnaphlibnodmigphnc.chromiumapp.org/supabase-auth

  url.searchParams.set("client_id", manifest.oauth2.client_id);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("prompt", "select_account");

  return { url };
};

// ─────────────────────────────────────────────────────────────────────────────

const launchWebAuthFlow_and_returnCallBackParams = async ({ url }) => {
  const authorizeResult = await new Promise((resolve) => {
    chrome.identity.launchWebAuthFlow(
      { url: url.href, interactive: true },
      (callbackUrl) => resolve(callbackUrl)
    );
  });
  if (!authorizeResult) throw { error: "No authorizeResult" };

  return qs.parse(authorizeResult?.split("#")[1]);
};

// ─────────────────────────────────────────────────────────────────────────────
