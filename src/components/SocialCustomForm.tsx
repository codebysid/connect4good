import { saveUserSocials } from '@/actions/User'
import useUserData from '@/hooks/useUserData'
import { zodResolver } from "@hookform/resolvers/zod"
import { ThumbsUp } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Button } from "../components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { useToast } from './ui/use-toast'

interface Socials {
  linkedin?: string;
  twitter?: string;
  github?: string;
}

const SocialCustomForm = ({ name, placeholder }: { name: keyof Socials, placeholder: string }) => {
  const { user } = useUserData()
  const { toast } = useToast()
  const formSchema = z.object({
    [name]: z.string().url()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!user._id || !values) return
      const res = await saveUserSocials(values, user._id)
      if (res.status === 200) {
        toast({ title: "Socials Saved 👍 " })
      }
    } catch (err) {
      console.log(err)
      toast({ title: "some error occurred ❌" })
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-row items-center justify-center w-full gap-2'>
        <FormField name={name} control={form.control} render={({ field }) => {
          return <FormItem className='flex flex-row items-center justify-center gap-2'>
            <FormLabel>{name.toUpperCase()}:</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} defaultValue={user?.socials ? user.socials[name] : ""} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        }}>
        </FormField>
        <Button type='submit' size="sm"><ThumbsUp /></Button>
      </form>
    </Form>
  )
}

export default SocialCustomForm
