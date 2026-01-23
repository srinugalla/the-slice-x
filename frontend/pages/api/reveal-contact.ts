import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const supabaseFnUrl =
      "https://rsnbzilxeiqfpjfpmzzq.functions.supabase.co/reveal-contact"

    const response = await fetch(supabaseFnUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.authorization ?? "",
      },
      body: JSON.stringify(req.body),
    })

    const text = await response.text()

    // Edge functions sometimes return non-JSON on errors
    let data
    try {
      data = JSON.parse(text)
    } catch {
      data = { error: text }
    }

    return res.status(response.status).json(data)
  } catch (err: any) {
    console.error("Reveal contact API error:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
