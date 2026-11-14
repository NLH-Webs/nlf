// Cloudflare Pages Function: proxy /api/* to the thiennguyen.app API,
// replacing the Vercel rewrite that did this before the migration (vercel.json).
//
// Upstream host = the `apiBaseUrlv2` that thiennguyen.app's own frontend uses
// (see __NEXT_DATA__ on https://thiennguyen.app). The old host
// apiv2.thiennguyen.app now answers 404 "Route Not Found" for every route.
const UPSTREAM = 'https://api-pilot.thiennguyen.app';

export async function onRequest({ request, params }) {
  const url = new URL(request.url);
  const path = Array.isArray(params.path) ? params.path.join('/') : (params.path || '');
  const target = `${UPSTREAM}/api/${path}${url.search}`;

  const resp = await fetch(target, {
    method: request.method,
    headers: { accept: 'application/json' },
  });

  return new Response(resp.body, {
    status: resp.status,
    headers: {
      'content-type': resp.headers.get('content-type') || 'application/json',
      'cache-control': 'no-store',
    },
  });
}
