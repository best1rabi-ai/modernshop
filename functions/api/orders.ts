export const onRequestPost = async ({ request, env }) => {
  try {
    const data = await request.json();
    const { customer_name, phone, city, address, product_id, quantity, total } = data;
    
    if (!env.DB) {
       return new Response(JSON.stringify({ error: "لم يتم ربط قاعدة بيانات D1 في إعدادات Cloudflare Pages" }), { status: 500 });
    }
    
    await env.DB.prepare(
      `INSERT INTO orders (customer_name, phone, city, address, product_id, quantity, total) VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(customer_name, phone, city, address || "", product_id || 1, quantity || 1, total || 0).run();
    
    return new Response(JSON.stringify({ success: true }), { 
      status: 200, 
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
       status: 500,
       headers: { "Content-Type": "application/json" }
    });
  }
};

export const onRequestGet = async ({ env }) => {
  try {
    if (!env.DB) {
       return new Response(JSON.stringify([
           { id: 999, customer_name: 'طلب تجريبي (قاعدة البيانات غير مربوطة)', phone: '06000000', city: 'الدار البيضاء', total: 350, created_at: new Date().toISOString() }
       ]), { 
          status: 200, headers: { "Content-Type": "application/json" } 
       });
    }
    
    const { results } = await env.DB.prepare(`SELECT * FROM orders ORDER BY created_at DESC`).all();
    
    return new Response(JSON.stringify(results), { 
      status: 200, 
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
