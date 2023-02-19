import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import clientPromise from '@/lib/mongodb'
import sendEmail from '@/lib/nodemailer'

export default async function register(req, res) {
  const { email, password, username } = req.body
  const client = await clientPromise
  const db = client.db('testend-db')
  const collection = db.collection('users')

  if (password.length < 6) {
    res.send({
      err: true,
      msg: 'Password must be longer than five characters.'
    })
  }

  const user = await collection.findOne({ email })

  if (!user) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const verifyString = crypto.randomBytes(16).toString('hex')
    const response = await collection.insertOne({
      email,
      username,
      password: hashedPassword,
      verifyString,
      active: false
    })

    const testHtml = `<b>Email Verification</b><br/><a href="${process.env.SERVER_URL}/api/auth/verify?email=${email}&hash=${verifyString}">Verify</a>`

    sendEmail({ to: email, subject: 'Verify Email', html: testHtml })

    res.send({
      err: false,
      msg: `Please check your email to verify your account.`
    })
  } else {
    res.send({ err: true, msg: 'User already exists.' })
  }
}
