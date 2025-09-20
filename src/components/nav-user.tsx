import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {LogOut, Settings, UserIcon} from "lucide-react";
import {useAuth} from "@/hooks/useAuth.ts";

export function NavUser() {
    const {user, logout, isLoading} = useAuth();

    // Get user initials for fallback avatar
    const getInitials = (name: string): string => {
        if (!name) return "U";

        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    // If user is null or loading, show a skeleton/loading state
    if (isLoading || !user) {
        return (
            <div className="flex items-center gap-4">
                <Button variant="ghost" className="relative h-10 w-10 rounded-full" disabled>
                    <Avatar className="h-9 w-9">
                        <AvatarFallback>
                            <div className="h-4 w-4 animate-pulse rounded-full bg-gray-300"/>
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </div>
        );
    }

    // Get display name - fallback to email or username if name is not available
    const displayName = user.name || user.username || (user.email ? user.email.split('@')[0] : 'User');

    // Get display email
    const displayEmail = user.email || 'No email available';

    const handleLogout = () => {
        logout();
    };
    console.log(user)
    return (
        <div className="flex items-center gap-4">
            {/* User Avatar Dropdown */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-9 w-9">
                            <AvatarImage
                                src={user.avatar}
                                alt={displayName}
                                onError={(e) => {
                                    // Hide the broken image if it fails to load
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                            <AvatarFallback>
                                {getInitials(displayName)}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{displayName}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {displayEmail}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>
                        <UserIcon className="mr-2 h-4 w-4"/>
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4"/>
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-600 focus:text-red-600"
                    >
                        <LogOut className="mr-2 h-4 w-4"/>
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}