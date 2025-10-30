import { Home, User, BookText } from "lucide-react";


export const store = {
     heroImg: "/images/hero.png",
     avatar: "/image/avatar.png"
}

export const navItems = [
    {
        name: "Home",
        href: "/dash",
        icon: Home
    },
    {
        name: "Profile",
        href: "/dash/profiles",
        icon: User
    },
    {
        name: "Stories",
        href: "/dash/stories",
        icon: BookText
    }
];

export const profileNavItems = [
    {
        name: "Home",
        href: "/dash/profiles"
    },
    {
        name: "About",
        href: "/dash/profiles/about"
    }
];