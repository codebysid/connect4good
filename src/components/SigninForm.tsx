"use client"
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../components/ui/input'
import { Button } from './ui/button'
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group'
import { createUser } from '@/actions/User'
import { useRouter } from 'next/navigation'
import { useToast } from './ui/use-toast'
import Link from 'next/link'
import XDescription from './XDescription'

const roleOptions = [
  {
    id: 1,
    value: "user",
    label: "User"
  },
  {
    id: 2,
    value: "group",
    label: "Social Group"
  }
]

const formSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(6),
  role: z.enum(["user", "group"])
})

const SigninForm = () => {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await createUser(values)
      console.log(res)
      if (res.status === 200) {
        router.push("/login")
        toast({ title: "user created 👍" })
        return
      }
    } catch (err) {
      console.log(err)
      toast({
        title: "some error occurred ❌"
      })
    }
  }

  return (
    <div className='flex flex-col md:items-center md:justify-center lg:items-center lg:justify-center w-full'>
      <XDescription />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-3'>
          <FormField control={form.control} name='email' render={({ field }) => {
            return <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input placeholder="ak@example.com" type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          }}>
          </FormField>

          <FormField control={form.control} name='name' render={({ field }) => {
            return <FormItem>
              <FormLabel>Name:</FormLabel>
              <FormControl>
                <Input placeholder="Akshay Kumar" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          }}>
          </FormField>

          <FormField control={form.control} name='role' render={({ field }) => {
            return <FormItem>
              <FormLabel>Select Role:</FormLabel>
              <FormControl>
                <RadioGroup defaultValue={field.value} onValueChange={field.onChange} >
                  {
                    roleOptions.map((cur) => (
                      <FormItem key={cur.id}>
                        <FormControl>
                          <RadioGroupItem value={cur.value} />
                        </FormControl>
                        <FormLabel>{cur.label}</FormLabel>
                      </FormItem>
                    ))
                  }
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          }}>
          </FormField>

          <FormField control={form.control} name='password' render={({ field }) => {
            return <FormItem>
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          }}>
          </FormField>

          <Button type='submit'>Create Account</Button>
        </form>
      </Form>
      <span>Already have an account ? <span className='underline'><Link href="/login">Login Now</Link></span></span>
    </div>
  )
}

export default SigninForm
