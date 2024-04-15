import bcrypt from "bcryptjs"
export async function convertPasswordToHash(password: string) {
  const hashedPassword = await bcrypt.hash(password, 10)
  return hashedPassword
}

export async function compareHashWithPassword(hashedPassword: string, password: string) {
  const isMatch = await bcrypt.compare(password, hashedPassword)
  return isMatch
}
