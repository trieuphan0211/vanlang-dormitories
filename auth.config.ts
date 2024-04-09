import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import AzureAd from "next-auth/providers/azure-ad";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    AzureAd({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      // tenantId: process.env.AZURE_AD_TENANT_ID,
      tenantId: "common",
      token: {
        url: `https://login.microsoftonline.com/common/oauth2/v2.0/token`,
      },
      userinfo: { url: "https://graph.microsoft.com/oidc/userinfo" },
      authorization: {
        url: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize`,
        params: { scope: "openid profile email User.Read" },
      },
      issuer: `https://login.microsoftonline.com/common/v2.0`,
      // profile: async (profile, tokens) => {
      //   const profilePicture = await fetch(
      //     `https://graph.microsoft.com/v1.0/me/photos/48x48/$value`,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${tokens.access_token}`,
      //       },
      //     },
      //   );

      //   if (profilePicture.ok) {
      //     const pictureBuffer = await profilePicture.arrayBuffer();
      //     const pictureBase64 = Buffer.from(pictureBuffer).toString("base64");
      //     return {
      //       id: profile.sub,
      //       name: profile.name,
      //       email: profile.preferred_username,
      //       image: `data:image/jpeg;base64, ${pictureBase64}`,
      //     };
      //   } else {
      //     return {
      //       id: profile.sub,
      //       name: profile.name,
      //       email: profile.preferred_username,
      //     };
      //   }
      // },
    }),
  ],
} satisfies NextAuthConfig;
