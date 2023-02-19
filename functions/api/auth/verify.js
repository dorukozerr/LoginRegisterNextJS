import clientPromise from '@/lib/mongodb'

export default async function verify(req, res) {
  const { email, hash } = req.query

  if (!email || !hash) {
    res.status(409).json({ err: true, msg: 'Missing parameters' })
  } else {
    const client = await clientPromise
    const db = client.db('testend-db')
    const collection = db.collection('users')
    const user = await collection.findOne({ email })

    if (!user) {
      res.status(404).json({ err: true, msg: 'User not found' })
    } else {
      if (user.verifyString !== hash) {
        res.status(409).json({ err: true, msg: 'Invalid hash' })
      } else {
        delete user.verifyString
        user.active = true
        const newUserData = await collection.findOneAndReplace({ email }, user)
        res.redirect('/login?verified=true')
      }
    }
  }
}
