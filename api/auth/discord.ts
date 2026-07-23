import type { VercelRequest, VercelResponse } from "@vercel/node";


export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  const {code} = req.body;

  if(!code) {
    return res.status(400).json({
      message: "Code is required",
    })
  }

  return res.status(200).json({
    message: "recived",
    code
  })
}