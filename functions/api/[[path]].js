// Cloudflare Pages Function: proxy /api/* to the thiennguyen.app API.
//
// Upstream host = the `apiBaseUrlv2` that thiennguyen.app's own frontend uses
// (see __NEXT_DATA__ on https://thiennguyen.app). The old host
// apiv2.thiennguyen.app now answers 404 "Route Not Found" for every route.
//
// Donor privacy: before the statement reaches the browser, sender names are cut
// to initials and the free-text message of incoming transfers (which often holds
// the sender's full name) is removed. Outgoing (DEBIT) lines keep their purpose text.
const UPSTREAM = 'https://api-pilot.thiennguyen.app';

const KEEP = /^(NGƯỜI ỦNG HỘ ẨN DANH|CUSTOMER|CHUYỂN TIỀN ĐI|NULL)$/i;
const COMPANY = /^(CTCP|CONG TY|CÔNG TY|CTY|TNHH|NGAN HANG|NGÂN HÀNG)\b/i;

function maskName(name) {
  const value = (name || '').trim();
  if (!value || KEEP.test(value) || COMPANY.test(value)) return value;
  return value
    .split(/\s+/)
    .map((w) => `${(Array.from(w)[0] || '').toUpperCase()}.`)
    .join(' ');
}

function scrub(json) {
  const list = json && json.data && Array.isArray(json.data.transactions) ? json.data.transactions : null;
  if (!list) return json;
  for (const t of list) {
    t.otherAccountDisplayName = maskName(t.otherAccountDisplayName);
    t.otherAccountName = maskName(t.otherAccountName);
    t.otherAccountNo = null;
    t.userName = null;
    if (t.type === 'CREDIT') {
      t.narrative = '';
      t.note = null;
    }
  }
  return json;
}

export async function onRequest({ request, params }) {
  const url = new URL(request.url);
  const path = Array.isArray(params.path) ? params.path.join('/') : (params.path || '');
  const target = `${UPSTREAM}/api/${path}${url.search}`;

  const resp = await fetch(target, {
    method: 'GET',
    headers: { accept: 'application/json' },
  });

  const headers = {
    'content-type': resp.headers.get('content-type') || 'application/json',
    'cache-control': 'no-store',
  };

  let text = await resp.text();
  try {
    text = JSON.stringify(scrub(JSON.parse(text)));
  } catch {
    // Not JSON: pass through unchanged.
  }
  return new Response(text, { status: resp.status, headers });
}
