import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value
        const username = profile.displayName || email.split('@')[0]

        let user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              username,
              password: '',
              avatar: profile.photos?.[0]?.value || null,
            },
          })
        }

        return done(null, user)
      } catch (err) {
        return done(err, null)
      }
    }
  )
)

export default passport