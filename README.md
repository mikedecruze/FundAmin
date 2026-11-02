# FundAmin MVP

Local prototype for administering a closed-end fund above its general ledger. Requires Node.js 22+; no dependency installation or external services needed.

```sh
npm run dev # restart the server automatically on changes
npm start   # standard server
npm test
```

The server uses port 3000 (override with PORT). Open the app in a browser. Sample records initialize automatically and changes persist in that browser's localStorage.

## Working flows

- Overview with fund commitment, called, unfunded and distributed balances.
- LP contact records, commitments and investor classes.
- Pro rata capital calls with an unfunded commitment limit, distributions, and downloadable draft notices.
- Income and expense allocations to all LPs or a selected class. Largest remainder allocation preserves whole cents.
- Since-inception partners' capital statements and CSV balance exports.
- Tasks with due dates and completion, fund identity and class setup.

## Prototype boundaries

Single user, single fund, USD, browser storage only. Calls are treated as funded immediately. Allocation basis is current commitment; there is no admission-date logic or period close. No GL integration/reconciliation, payment execution, email delivery, authentication, server persistence, audit controls, transfers, recallable distributions, waterfalls, or tax reporting. Notices and statements are drafts. Do not enter real confidential LP data. Production financial calculations and workflows require review before operational use.

Next milestones: durable database and authentication; separate called/received cash ledger; GL import and reconciliation; approval/audit workflow; effective-dated ownership and period closing.

## Deploy the demo on Render

Use the repository's `render.yaml` Blueprint to deploy a Node web service:

1. Open https://render.com/deploy?repo=https://github.com/mikedecruze/FundAmin and sign in to Render.
2. Authorize Render's GitHub integration to access `mikedecruze/FundAmin` if prompted.
3. Review the Blueprint and create the service. It uses the free plan, Node 22, `npm test` as the build check, and `npm start` to run the app. No secrets are needed.
4. Once deployment is healthy, open the HTTPS service URL displayed by Render.

If using manual setup, choose a Web Service, connect this repository on `main`, and use the same settings. The app binds to Render's supplied `PORT` on `0.0.0.0`.

The free service may sleep when idle. This deploys a public sample-data demo, with records stored independently in each visitor's browser. It does not provide production authentication or shared data storage. Do not use confidential LP data.
