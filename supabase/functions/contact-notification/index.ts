import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { name, email, brand, website, services, challenge, timeline } = await req.json()

    console.log(`Received lead from ${name} (${email})`)

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Hands On Pixel <salut@handsonpixel.ro>",
        to: ["salut@handsonpixel.ro"],
        subject: `Lead Nou: ${brand || name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
            <h2 style="color: #3fb7bc; border-bottom: 2px solid #3fb7bc; padding-bottom: 10px;">Lead Nou de pe Site</h2>
            
            <p><strong>Nume:</strong> ${name}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Brand:</strong> ${brand || 'N/A'}</p>
            <p><strong>Website/Socials:</strong> ${website || 'N/A'}</p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            
            <p><strong>Servicii Selectate:</strong> ${services.join(', ')}</p>
            <p><strong>Timeline:</strong> ${timeline}</p>
            
            <p><strong>Provocare / Detalii:</strong></p>
            <blockquote style="background: #f9f9f9; border-left: 5px solid #3fb7bc; padding: 15px; font-style: italic;">
              ${challenge}
            </blockquote>
            
            <div style="margin-top: 30px; font-size: 12px; color: #888;">
              Trimis automat de pe handsonpixel.ro
            </div>
          </div>
        `,
      }),
    })

    const data = await res.json()
    console.log('Resend Response:', JSON.stringify(data))

    if (!res.ok) {
        return new Response(JSON.stringify({ error: data }), {
            status: res.status,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        })
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
