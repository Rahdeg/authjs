import React from 'react'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

const ErrorCard = () => {
    return (
        <CardWrapper
            headerLabel='Oops! Something went wrong!'
            backButtonHref='/auth/login'
            backButtonLabel='Back to login'
        >
            <div className=' flex w-full justify-center items-center'>
                <ExclamationTriangleIcon className=' text-destructive w-8 h-8' />
            </div>
        </CardWrapper>
    )

}

export default ErrorCard