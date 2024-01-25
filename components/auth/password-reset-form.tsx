"use client"
import React, { useState } from 'react'
import { useTransition } from 'react'
import * as z from "zod"
import { CardWrapper } from '@/components/auth/card-wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormMessage, FormItem, FormLabel, FormField } from '../ui/form'
import { NewPasswordSchema } from '@/schemas'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormError from '../form-error'
import FormSuccess from '../form-success'
import { newPassword } from '@/actions/new-password'
import { useSearchParams } from 'next/navigation'




const PasswordResetForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")


    const searchParams = useSearchParams();

    const token = searchParams.get("token");


    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {

        setError("");
        setSuccess("")
        startTransition(() => {
            newPassword(values, token)
                .then((data) => {
                    setError(data?.error);
                    setSuccess(data?.success)
                })
        })
        // form.reset();

    }


    return (

        <CardWrapper
            backButtonHref='/auth/login'
            headerLabel='Enter a new password'
            backButtonLabel="Back to login"
        >

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className=' space-y-6'
                >
                    <div className=' space-y-4'>
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='*****' type='password' disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type='submit' className=' w-full' disabled={isPending}>
                        Reset password
                    </Button>
                </form>
            </Form>
        </CardWrapper>



    )
}

export default PasswordResetForm