import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const source = await readFile(new URL('../src/analytics/analytics.js', import.meta.url), 'utf8');
const { createAnalytics, describePage, CONSENT_KEY, MEASUREMENT_ID } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

function fixture(consent, enabled = true) {
  const storage = new Map(consent ? [[CONSENT_KEY, JSON.stringify(consent)]] : []);
  const scripts = [];
  const cookieWrites = [];
  let reloads = 0;
  const win = { localStorage: { getItem: k => storage.get(k), setItem: (k, v) => storage.set(k, v) }, location: { hostname: 'www.oekfb.eu', reload: () => reloads++ } };
  const doc = { referrer: 'https://example.org/private?email=secret@example.org', head: { appendChild: s => scripts.push(s) }, createElement: () => ({}), get cookie() { return '_ga=abc; _ga_W36BNBYHGW=def; authToken=secret'; }, set cookie(value) { cookieWrites.push(value); } };
  return { api: createAnalytics(win, doc, enabled), win, scripts, cookieWrites, reloads: () => reloads, events: () => (win.dataLayer || []).map(a => [...a]).filter(a => a[0] === 'event') };
}

test('no Google script or events before consent, including interactions', () => {
  const f = fixture(); f.api.pageView('/liga'); f.api.track('registration_complete');
  assert.equal(f.scripts.length, 0); assert.deepEqual(f.events(), []);
});
test('accept loads once and tracks current route, deduplicates rerenders, counts revisits', () => {
  const f = fixture(); f.api.pageView('/liga'); f.api.setConsent('granted');
  f.api.pageView('/liga'); f.api.pageView('/news'); f.api.pageView('/liga');
  assert.equal(f.scripts.length, 1);
  assert.equal(f.events().filter(e => e[1] === 'page_view').length, 3);
  assert.equal(f.events()[0][2].page_referrer, 'https://example.org/');
});
test('reject persists and revocation disables collection, clears only GA cookies, reloads', () => {
  const f = fixture(); f.api.pageView('/liga'); f.api.setConsent('granted');
  const before = f.events().length; f.api.setConsent('denied'); f.api.track('click');
  assert.equal(f.events().length, before); assert.equal(f.win[`ga-disable-${MEASUREMENT_ID}`], true);
  assert.equal(f.reloads(), 1); assert.ok(f.cookieWrites.length);
  assert.ok(f.cookieWrites.every(c => c.startsWith('_ga')));
});
test('expired, corrupt and future consent fail closed; dev never sends even after acceptance', () => {
  for (const consent of [{ value: 'granted', at: 1 }, { value: 'granted', at: Date.now() + 999999 }, { value: 'yes', at: Date.now() }]) {
    const f = fixture(consent); f.api.pageView('/liga'); assert.equal(f.scripts.length, 0);
  }
  const f = fixture(undefined, false); f.api.pageView('/liga'); f.api.setConsent('granted');
  assert.equal(f.scripts.length, 0);
});
test('private URL components never reach event payloads', () => {
  const f = fixture({ value: 'granted', at: Date.now() });
  for (const path of ['/app/user/verify/secret-token', '/player-detail/12345', '/search?q=private-name', '/unexpected/private-email@example.org']) f.api.pageView(path);
  const payload = JSON.stringify(f.events());
  for (const secret of ['secret-token', '12345', 'private-name', 'private-email', 'secret@example']) assert.ok(!payload.includes(secret));
  assert.equal(describePage('/news-detail/abc123').path, '/news-detail/abc123');
});
test('acceptance on a private route keeps its sanitized category', () => {
  const f = fixture(); f.api.pageView('/app/user/verify/secret'); f.api.setConsent('granted');
  assert.equal(f.events()[0][2].page_location, 'https://www.oekfb.eu/app/user/verify');
});
test('blocked localStorage does not break browsing or leak events', () => {
  const win = { localStorage: { getItem() { throw Error(); }, setItem() { throw Error(); } }, location: {} };
  const api = createAnalytics(win, { cookie: '' }, true); api.pageView('/liga'); api.setConsent('denied');
  assert.equal(api.getConsent(), 'denied'); assert.equal(win.dataLayer, undefined);
});
