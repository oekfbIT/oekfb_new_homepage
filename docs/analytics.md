# Google Analytics setup

## Connected resources

- Account: Default Account for Firebase (`315885068`)
- Property: oekfbbucket (`443444290`)
- Website stream: Homepage (`15781098262`)
- Measurement ID: `G-W36BNBYHGW`
- Production hosts: `oekfb.eu`, `www.oekfb.eu`

The public Measurement ID is intentionally in source code. No private credentials belong in this project. Collection is enabled only for a production build on the two production hosts and after analytics consent. Local development, preview hosts and localhost never send events to this property.

## Google stream configuration

Configured in the signed-in Analytics UI on 2026-09-15:

- Enhanced Measurement stays enabled for page loads, scrolling and embedded YouTube engagement.
- **Page views → Advanced settings → Page changes based on browser history events** is disabled. The React HashRouter integration sends one explicit page view per route navigation. `send_page_view: false` suppresses the default load event.
- Automatic outbound clicks, site search, form interactions and file downloads are disabled. Explicit events below omit raw URLs, link text, search terms and form values.

Do not enable automatic history tracking or install another GA/GTM tag for this stream without revisiting deduplication. Do not turn on automatic form/search collection without reviewing personal-data handling.

## Frontend behavior

Consent is stored locally for 180 days. Accept and reject have equal prominence; the persistent Cookie-Einstellungen button reopens choices. Revocation disables collection, clears GA cookies and reloads to remove Google's event listeners. Other tabs reload on consent changes. Tracking begins with the current page when a visitor accepts; earlier visits/events are not replayed.

Page URLs are virtual clean paths such as `https://www.oekfb.eu/match/<public-id>` instead of hash fragments. Query strings and unexpected routes are not sent. Verification tokens and individual player IDs are omitted, titles use fixed category labels, and external referrers are reduced to origin. Consequently query-based campaigns/UTM parameters are currently not retained; ordinary source/referral attribution is available. Explicit campaign allowlisting can be added later.

Events:

| Event | Trigger / fields |
|---|---|
| `page_view` | Route navigation; safe location, title, previous virtual page/referrer origin |
| `select_content` | Match, team or news detail; content_type, item_id |
| `select_league` | League dropdown selection; league_id |
| `search_results_view` | Search successfully returns; has_results only |
| `registration_submit` | Valid registration form submitted; no fields |
| `registration_complete` | Registration API succeeds; no fields |
| `click_sponsor` | Sponsor links; sponsor_id |
| `click_app_download` | App Store / Play Store link; store |
| `click` | Other outbound links; destination hostname only |
| `file_download` | Document/archive links; extension only |

Google provides sessions, engagement and acquisition reporting from the tag. Custom parameter breakdowns need corresponding event-scoped custom dimensions in GA Admin; IDs can be high-cardinality, so register only useful dimensions (e.g. league_id, content_type, store). Mark `registration_complete` as a key event if it is the desired conversion. These custom-dimension/key-event settings are not yet configured.

## Backend

Prepared in `../PUBLIC_REPO/BE/tools/analytics/`. This standalone Python job uses Google's official SDK and writes aggregate snapshots to the backend MongoDB database. It filters every request to the Homepage stream, because this property also contains app and admin streams. See that directory's README for environment variables and hourly deployment setup. No Google credential, scheduled deployment or live import has been configured yet.

## Verification and release

```sh
node --test scripts/analytics.test.mjs
npm run build
```

Before release, check banner usability and privacy disclosure. After deploying the frontend, accept analytics on a production hostname and use GA Realtime/DebugView or browser network inspection to verify one page_view per route and zero collection before consent/after revocation. Google collection has not been verified against a deployed copy of these changes.

References: [manual pageviews](https://developers.google.com/analytics/devguides/collection/ga4/views), [consent](https://developers.google.com/tag-platform/security/guides/consent), [Data API](https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart).
