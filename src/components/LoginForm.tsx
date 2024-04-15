"use client"
import useUserData from '@/hooks/useUserData'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { loginUser } from '../actions/User'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from '../components/ui/input'
import { Button } from './ui/button'
import { useToast } from "../components/ui/use-toast"
import XDescription from './XDescription'

const formSchema = z.object({
  email: z.string().min(5),
  password: z.string().min(6)
})

const LoginForm = () => {
  const router = useRouter()
  const { setUser } = useUserData()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await loginUser(values)
      if (res && res.status === 200) {
        setUser({
          email: res.email, role: res.role, _id: res._id, socials: res.socials
        })
        router.push("/dash")
        return
      }
    } catch (err) {
      console.log(err)
      toast({ title: "some error occurred ❌" })
    }
  }
  return (
    <div className=' flex flex-col md:items-center md:justify-center lg:items-center lg:justify-center w-full'>
      <XDescription />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4'>
          <FormField control={form.control} name='email' render={({ field }) => {
            return <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input type="email" placeholder="ak@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          }}>
          </FormField>

          <FormField control={form.control} name='password' render={({ field }) => {
            return <FormItem>
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          }}>
          </FormField>
          <Button>Login</Button>
        </form>
      </Form>
      <span>Dont't have an account ? <span className='underline'><Link href="/">Create Now</Link></span></span>
    </div>
  )
}

export default LoginForm
