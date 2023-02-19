import login from '@/functions/api/auth/login'

export default async function handler(req, res) {
  req.method === 'POST'
    ? login(req, res)
    : res.status(200).json({ err: true, msg: 'Something is wrong...' })
}
