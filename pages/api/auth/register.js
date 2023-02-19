import register from '@/functions/api/auth/register'

export default async function handler(req, res) {
  req.method === 'POST'
    ? register(req, res)
    : res.status(200).json({ err: true, msg: 'Something is wrong...' })
}
