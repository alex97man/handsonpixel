import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY")
const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY")

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

const CORRECT_HASH = '92fd12a8f05c016c3c53fbb646ed580e595f0177df9d21a26d469360b3667f22';

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { accessKeyHash, action, snapshot, question, chatHistory } = await req.json()

    // Validate access passcode hash
    if (accessKeyHash !== CORRECT_HASH) {
      return new Response(JSON.stringify({ error: 'Neautorizat' }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    if (!snapshot) {
      return new Response(JSON.stringify({ error: 'Datele financiare lipsesc' }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    if (!GEMINI_API_KEY && !ANTHROPIC_API_KEY) {
      return new Response(JSON.stringify({ 
        error: 'Cheia API nu este configurată în Supabase Secrets. Adaugă GEMINI_API_KEY în Supabase Edge Function Secrets.' 
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    // Prepare financial context
    const categoriesStr = Object.entries(snapshot.expensesByCategory || {})
      .map(([cat, amt]) => `- ${cat}: ${amt} RON`)
      .join('\n');

    const systemInstruction = 
      `Ești Advisor AI, un consilier financiar personal și antrenor de buget inteligent.
Vorbești în limba română, într-un mod prietenos, profesionist, foarte direct și motivant.
Misiunea ta este să ajuți utilizatorul să obțină claritate, economii eficiente și predictibilitate pe baza datelor furnizate.
Folosește întotdeauna moneda RON. Organizează răspunsurile clar, folosind formatarea Markdown (folosește obligatoriu sub-titluri începând cu '### ' pentru secțiuni și liste cu bulinuțe '-' sau '*').`;

    let prompt = '';

    if (action === 'general_advice') {
      prompt = 
`Analizează situația mea financiară curentă din această lună și oferă-mi un ghid de acțiune.

DATELE MELE FINANCIARE CURENTE:
- Venit lunar total: ${snapshot.totalIncome} RON
- Cheltuieli lunare totale: ${snapshot.totalExpense} RON
- Bani rămași (Economii): ${snapshot.remaining} RON
- Rata de economisire: ${snapshot.savingsRate}% din venituri
- Cheltuieli recurente fixe (chirie, utilități, rate, abonamente): ${snapshot.recurringExpenses} RON
- Defalcare cheltuieli pe categorii:
${categoriesStr || 'Nicio cheltuială adăugată.'}

TE ROG SĂ GENEREZI URMATOARELE SECȚIUNI:
1. ### Diagnostic Bugetar: Analizează rata de economisire (este bună? cum se compară cu regula 50/30/20?) și distribuția cheltuielilor. Identifică potențiale categorii unde se cheltuiește prea mult.
2. ### Fondul de Urgență: Calculează o țintă optimă pentru fondul de urgență (3 și 6 luni de cheltuieli recurente fixe, adică 3 * ${snapshot.recurringExpenses} RON și 6 * ${snapshot.recurringExpenses} RON). Explică în câte luni aș putea strânge acest fond folosind banii rămași acum.
3. ### Strategie de Economisire și Investiții: Oferă recomandări concrete pe baza profilului de risc pentru banii rămași (${snapshot.remaining} RON):
   - Conservator (ex: depozite la ~6% - ce sumă s-ar strânge)
   - Moderat (ex: ETF diversificat la ~9%)
   - Dinamic (ex: acțiuni/crypto la ~15%)
4. ### Plan de Acțiune rapid: Oferă 3 sfaturi rapide și acționabile imediat pentru luna aceasta.`;
    } else if (action === 'ask_question') {
      const historyStr = (chatHistory || [])
        .map((msg: any) => `${msg.sender === 'user' ? 'Utilizator' : 'Advisor AI'}: ${msg.text}`)
        .join('\n');

      prompt = 
`Iată datele mele financiare de bază pentru context:
- Venit: ${snapshot.totalIncome} RON, Cheltuieli: ${snapshot.totalExpense} RON, Rămân lunar: ${snapshot.remaining} RON, Cheltuieli Recurente: ${snapshot.recurringExpenses} RON.
Cheltuieli pe categorii:
${categoriesStr || 'Fără'}

Istoricul scurt al conversației:
${historyStr}

Întrebarea mea:
"${question}"

Te rog să răspunzi la această întrebare ținând cont de bugetul meu de mai sus. Fii concis, practic și folosește titluri începând cu '### ' dacă structurezi răspunsul în secțiuni.`;
    }

    // ── Call Gemini API if key exists ──
    if (GEMINI_API_KEY) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
      
      const payload = {
        contents: [
          {
            parts: [{ text: `${systemInstruction}\n\n${prompt}` }]
          }
        ]
      };

      const apiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        console.error('Gemini API error Response:', errorText);
        throw new Error(`Gemini API error: ${apiResponse.statusText}`);
      }

      const responseData = await apiResponse.json();
      const text = responseData.candidates?.[0]?.content?.parts?.[0]?.text || 'Nu s-a putut genera un răspuns.';

      const result = action === 'general_advice' ? { advice: text } : { reply: text };
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } 
    
    // ── Call Anthropic Claude API as fallback ──
    else if (ANTHROPIC_API_KEY) {
      const claudeUrl = 'https://api.anthropic.com/v1/messages';
      
      const payload = {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1500,
        system: systemInstruction,
        messages: [
          { role: 'user', content: prompt }
        ]
      };

      const apiResponse = await fetch(claudeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(payload)
      });

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        console.error('Claude API error Response:', errorText);
        throw new Error(`Claude API error: ${apiResponse.statusText}`);
      }

      const responseData = await apiResponse.json();
      const text = responseData.content?.[0]?.text || 'Nu s-a putut genera un răspuns.';

      const result = action === 'general_advice' ? { advice: text } : { reply: text };
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

  } catch (error: any) {
    console.error('Edge Function Advisor Error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Eroare internă' }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
})
