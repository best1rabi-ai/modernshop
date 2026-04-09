export const onRequestGet = async ({ env }) => {
  try {
    if (!env.DB) {
       // Mock products for dev
       return new Response(JSON.stringify([
           { id: 1, name: 'ساعة ذكية Series 9', description: 'ساعة رياضية فاخرة تدعم الإشعارات والاتصال.', price: 599, image_url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80', stock: 10, created_at: new Date().toISOString() },
           { id: 2, name: 'سماعات Noise Cancelling', description: 'سماعات أصلية بصوت نقي وعزل قوي.', price: 299, image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80', stock: 5, created_at: new Date().toISOString() }
       ]), { 
          status: 200, headers: { "Content-Type": "application/json" } 
       });
    }
    
    const { results } = await env.DB.prepare(`SELECT * FROM products ORDER BY id DESC`).all();
    
    return new Response(JSON.stringify(results), { 
      status: 200, 
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const onRequestPost = async ({ request, env }) => {
  try {
    const data = await request.json();
    const { name, description, price, image_url, stock } = data;
    
    if (!env.DB) {
       return new Response(JSON.stringify({ error: "Missing DB" }), { status: 500 });
    }
    
    const { success } = await env.DB.prepare(
      `INSERT INTO products (name, description, price, image_url, stock) VALUES (?, ?, ?, ?, ?)`
    ).bind(name, description || "", price || 0, image_url || "", stock || -1).run();
       
    return new Response(JSON.stringify({ success }), { status: 200, headers: { "Content-Type": "application/json" }});
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};

// Delete a product
export const onRequestDelete = async ({ request, env }) => {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (!id || !env.DB) {
            return new Response(JSON.stringify({ error: "Invalid Data" }), { status: 400 });
        }

        await env.DB.prepare(`DELETE FROM products WHERE id = ?`).bind(id).run();
        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" }});
    } catch(e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
};
