"use client"
import React, { useState } from 'react'
import { useTransition } from 'react'
import * as z from "zod"
import { CardWrapper } from '@/components/auth/card-wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormMessage, FormItem, FormLabel, FormField } from '../ui/form'
import { LoginSchema } from '@/schemas'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FormError from '../form-error'
import FormSuccess from '../form-success'
import { login } from '@/actions/login'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'



const LoginForm = () => {
    const [isPending, startTransition] = useTransition();
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider!" : ""

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            code: ""
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("")
        startTransition(() => {
            login(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data?.error);
                    }
                    if (data?.success) {
                        form.reset();
                        setSuccess(data?.success)
                    }
                    if (data?.twoFactor) {
                        setShowTwoFactor(true);
                    }
                })
                .catch(() => setError("Something went wrong"))
        })


    }


    return (

        <CardWrapper
            backButtonHref='/auth/register'
            headerLabel='Welcome back'
            backButtonLabel="Dont't have an account?"
            showSocial
        >

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className=' space-y-6'
                >
                    <div className=' space-y-4'>
                        {
                            showTwoFactor && (
                                <FormField
                                    control={form.control}
                                    name='code'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Two Factor Code</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder='456667' disabled={isPending} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )
                        }
                        {
                            !showTwoFactor && (
                                <>
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
                                    <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder='******' type='password' disabled={isPending} />
                                                </FormControl>
                                                <Button size="sm" variant="link" asChild className='px-0 font-normal'>
                                                    <Link href="/auth/reset"> Forgot password</Link>
                                                </Button>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )
                        }

                    </div>
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button type='submit' className=' w-full' disabled={isPending}>
                        {
                            showTwoFactor ? "Confirm" : "Login"
                        }
                    </Button>
                </form>
            </Form>
        </CardWrapper>



    )
}

export default LoginForm