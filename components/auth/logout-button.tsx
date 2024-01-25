'use client'

import { logout } from "@/actions/logout";

interface LoginButtonProps {
    children: React.ReactNode;
}

export const LogouButton = ({ children }: LoginButtonProps) => {

    const onClick = () => {
        logout();
    }
    return (
        <span onClick={onClick} className=" cursor-pointer" >
            {children}
        </span>
    )
}

