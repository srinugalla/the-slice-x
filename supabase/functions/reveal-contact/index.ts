import { serve } from "https://deno.land/std@0.224.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req: Request) => {
  // ✅ Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, apikey, content-type",
      },
    })
  }

  try {
    // ✅ Supabase client using environment variables
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      {
        global: {
          headers: {
            Authorization: req.headers.get("Authorization")!,
          },
        },
      }
    )

    // ✅ Validate user
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      })
    }

    // ✅ Read request body
    const body = await req.json()
    const { land_id, page = 1, limit = 20 } = body

    // --- CASE 1: Fetch single land by ID ---
    if (land_id) {
      const { data, error: dbError } = await supabase
        .from("land_listings")
        .select("*")
        .eq("land_id", land_id)
        .single()

      if (dbError || !data) {
        return new Response(JSON.stringify({ error: "Listing not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        })
      }

      // Clean phone
      data.phone = (data.phone === null || data.phone === "" || data.phone === "0") ? null : data.phone

      return new Response(JSON.stringify({ listing: data }), {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      })
    }

    // --- CASE 2: Fetch paginated listings ---
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data: listings, error: listError } = await supabase
      .from("land_listings")
      .select("*")
      .range(from, to)

    if (listError) {
      return new Response(JSON.stringify({ error: listError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      })
    }

    // Clean phones in the listings
    const cleanedListings = listings.map((item: any) => ({
      ...item,
      phone: (item.phone === null || item.phone === "" || item.phone === "0") ? null : item.phone,
    }))

    return new Response(JSON.stringify({ page, limit, listings: cleanedListings }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    })

  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    })
  }
})
