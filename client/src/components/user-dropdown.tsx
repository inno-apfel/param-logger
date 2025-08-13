import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useUser } from '@/hooks/useUser';

export function UserDropdown() {

    const { user, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        navigate('/')
        await logout()
    }

    return (
        <div className="flex gap-2 relative">              
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Avatar className="size-8 drop-shadow-md">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-black">CU</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="absolute right-0 top-3 border-0 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                    <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}