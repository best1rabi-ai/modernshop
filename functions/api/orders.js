export async function onRequest(context) {
  const { request, env } = context;
  const method = request.method;

  // Handle preflight requests for CORS if needed
  if (method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  }

  // --- POST /api/orders (Create a new order) ---
  if (method === 'POST') {
    try {
      const body = await request.json();
      if (!body.name || !body.phone || !body.city) {
        return Response.json({ error: "المرجو ملء جميع الحقول" }, { status: 400 });
      }

      await env.DB.prepare(
        "INSERT INTO orders (name, phone, city) VALUES (?, ?, ?)"
      ).bind(body.name, body.phone, body.city).run();

      return Response.json({ success: true, message: "تم تسجيل الطلب بنجاح" }, { status: 201 });
    } catch (e) {
      return Response.json({ error: e.message }, { status: 500 });
    }
  }

  // --- Admin Auth Header Verification ---
  // Simple Basic Auth using "admin:secret"
  const authHeader = request.headers.get("Authorization");
  const isAuthenticated = authHeader === "Basic YWRtaW46c2VjcmV0";

  if (!isAuthenticated) {
    return new Response("Unauthorized", { 
      status: 401, 
      headers: { 'WWW-Authenticate': 'Basic realm="Admin Access"' } 
    });
  }

  // --- GET /api/orders (List all orders for Admin) ---
  if (method === 'GET') {
    try {
      const dbResult = await env.DB.prepare("SELECT * FROM orders ORDER BY created_at DESC").all();
      return Response.json({ orders: dbResult.results }, { status: 200 });
    } catch (e) {
      return Response.json({ error: e.message }, { status: 500 });
    }
  }

  // --- PATCH /api/orders (Update order status) ---
  if (method === 'PATCH') {
    try {
      const body = await request.json();
      if (!body.id || !body.status) {
        return Response.json({ error: "معلومات غير مكتملة" }, { status: 400 });
      }

      await env.DB.prepare(
        "UPDATE orders SET status = ? WHERE id = ?"
      ).bind(body.status, body.id).run();

      return Response.json({ success: true }, { status: 200 });
    } catch (e) {
      return Response.json({ error: e.message }, { status: 500 });
    }
  }

  return new Response("Method Not Allowed", { status: 405 });
}
