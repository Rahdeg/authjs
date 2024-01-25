"use client"
import React, { useState } from 'react'
import { useTransition } from 'react'
import * as z from "zod"
import { CardWrapper } from '@/components/auth/card-wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormMessage, FormItem, FormLabel, FormField } from '../ui/form'
import { ResetSchema } from '@/schemas'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormError from '../form-error'
import FormSuccess from '../form-success'
import { reset } from '@/actions/reset'




const ResetForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")


    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("")
        startTransition(() => {
            reset(values)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success)
                })
        })
        form.reset();

    }


    return (

        <CardWrapper
            backButtonHref='/auth/login'
            headerLabel='Forgot your password?'
            backButtonLabel="Back to login"
        >

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className=' space-y-6'
                >
                    <div className=' space-y-4'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='rahdeg@gmail.com' type='email' disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type='submit' className=' w-full' disabled={isPending}>
                        Send reset email
                    </Button>
                </form>
            </Form>
        </CardWrapper>



    )
}

export default ResetForm