import verify from '@/functions/api/auth/verify'

export default async function handler(req, res) {
  req.method === 'GET'
    ? verify(req, res)
    : res.status(200).json({ err: true, msg: 'Something is wrong...' })
}
