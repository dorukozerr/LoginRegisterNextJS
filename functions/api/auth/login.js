import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import clientPromise from '@/lib/mongodb'

export default async function login(req, res) {
  const { email, password } = req.body
  const client = await clientPromise
  const db = client.db('testend-db')
  const collection = db.collection('users')

  const user = await collection.findOne({ email })

  if (!user) {
    res.status(409).json({ err: true, msg: 'Invalid credentials' })
  } else {
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      res.status(409).json({ err: true, msg: 'Invalid credentials' })
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
      })

      const respObj = { ...user, token }
      delete respObj.password
      delete respObj.active

      res.status(200).json({ err: false, msg: respObj })
    }
  }

  res.status(200).json({ user })
}
