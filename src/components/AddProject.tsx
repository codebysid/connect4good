"use client"
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { saveProject } from '@/actions/Projects'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import useUserData from '@/hooks/useUserData'
import { projectRoleRequired } from '@/types/Projects'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { Input } from '../components/ui/input'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { useToast } from './ui/use-toast'

const projectThemeOptions = [
  {
    id: 1,
    title: 'For childrens'
  },
  {
    id: 2,
    title: 'For poor/underpriviliged people'
  },
  {
    id: 3,
    title: 'For Education'
  },
  {
    id: 5,
    title: "For Awareness"
  },
  {
    id: 4,
    title: 'For Animals'
  },
  {
    id: 6,
    title: "For Food"
  }
]


const formSchema = z.object({
  title: z.string().min(1),
  theme: z.enum(["For childrens", "For Food", "For Animals", "For Education", "For Awareness", "For poor/underpriviliged people"]),
  description: z.string().min(1),
  role: z.enum(["Technical Role", "Social Media Managers", "Volunteers", "Project Managers"])
})

const AddProject = () => {
  const { user } = useUserData()
  const [openDialog, setOpenDialog] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await saveProject(values, user._id)
      if (res.status === 200) {
        setOpenDialog(false)
        toast({ title: "project saved 👍" })
        return
      }
    } catch (err) {
      console.log(err)
      toast({ title: "some error occurred ❌" })
    }
  }

  return (
    <div>
      {user.role === 'group' &&
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className='flex flex-row items-center justify-center gap-2 mb-2'>Add Project <Plus /></Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Project</DialogTitle>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4'>
                  <FormField name='title' control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormControl>

                        <Input id='title' placeholder='Project Title' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}>

                  </FormField>

                  <FormField name='theme' control={form.control} render={({ field }) => <FormItem>

                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          projectThemeOptions.map((theme) => {
                            return <SelectItem key={theme.id} value={theme.title}>{theme.title}</SelectItem>

                          })
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>}>
                  </FormField>

                  <FormField name='description' control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormControl>

                        <Textarea placeholder='Project Description' {...field} />
                      </FormControl>
                    </FormItem>
                  )}>

                  </FormField>

                  <FormField name='role' control={form.control} render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Required Role" />
                          </SelectTrigger>

                        </FormControl>
                        <SelectContent>
                          {
                            projectRoleRequired.map((theme) => {
                              return <SelectItem key={theme.id} value={theme.title}>{theme.title}</SelectItem>

                            })
                          }
                        </SelectContent>

                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}>
                  </FormField>
                  <Button type='submit'>Add</Button>
                </form>
              </Form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      }
    </div>
  )
}

export default AddProject
