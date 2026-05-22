import dns from 'dns';
dns.setDefaultResultOrder("ipv4first");
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  console.warn("Failed to set DNS servers in API handler:", e);
}

import type { NextApiRequest, NextApiResponse } from 'next';
import app from '../../../backend/src/app';

// Disable Next.js body parser — Express handles it (needed for multer/file uploads)
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Debug DNS resolution
  dns.resolveSrv('_mongodb._tcp.cluster0.zfd80.mongodb.net', (err, addresses) => {
    console.log("Direct SRV lookup in API handler:", err ? err.message : addresses);
  });

  // Strip the /api prefix so Express routes work correctly
  // e.g. /api/blogs -> /blogs, /api/admin/login -> /admin/login
  const originalUrl = req.url || '/';
  req.url = originalUrl.replace(/^\/api/, '') || '/';

  // Hand off to Express
  return app(req as any, res as any);
}
