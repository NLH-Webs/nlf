// Cloudflare Pages Function: proxy /api/* to the thiennguyen.app API,
// replacing the Vercel rewrite that did this before the migration (vercel.json).
export async function onRequest({ request, params }) {
  const url = new URL(request.url);
  const path = Array.isArray(params.path) ? params.path.join('/') : (params.path || '');
  const target = `https://apiv2.thiennguyen.app/api/${path}${url.search}`;

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
