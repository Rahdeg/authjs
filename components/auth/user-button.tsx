"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { FaUser } from "react-icons/fa"
import { useCurrentUser } from "@/hooks/use-current-user"
import { LogouButton } from "./logout-button"
import { ExitIcon } from "@radix-ui/react-icons"


export const UserButton = () => {
    const user = useCurrentUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className=" bg-sky-500">
                        <FaUser className=" text-white w-4 h-4" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-40 " align="end">
                <LogouButton>
                    <DropdownMenuItem>
                        <ExitIcon className="w-4 h-4 mr-2" />   Logout
                    </DropdownMenuItem>
                </LogouButton>
            </DropdownMenuContent>

        </DropdownMenu>
    )
}