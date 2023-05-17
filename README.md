One-Time-Secret Web Client (based on SvelteKit and CloudFlare Pages)

Web client for a One-Time-Secret service API. This service allows to generate a secret, retrieve it once and then it gets deleted from the server. Retrieving the secret can be done only once. On second attempt, the secret would have been deleted.
  
See also https://github.com/mailoxy/one-time-secret-worker
  
## Local development
```
npm run dev
```
  
## Publish
```
wrangler pages publish --project-name [PROJECT_NAME] .svelte-kit/cloudflare
```

## Demo

https://one-time-secret.com