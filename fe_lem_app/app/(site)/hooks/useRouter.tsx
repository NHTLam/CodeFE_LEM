import { useMemo } from "react";
import { usePathname } from "next/navigation";
import {
    MessageCircleMore,
    User,
    ArrowLeft ,
  } from "lucide-react";
//import signOut from "next-auth/react";
import useConversation from "./useConservation";

const useRoutes = () => {
    const pathname = usePathname();
    const { conversationId } = useConversation();
    
    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: <MessageCircleMore className="h-4 w-4 mr-2" />,
            active: pathname === '/conversations' || !! conversationId
        },
        {
            label: 'Users',
            href: '/users',
            icon: <User className="h-4 w-4 mr-2" />,
            active: pathname === '/users'
        },
        {
            label: 'Logout',
            href: '#',
            //onClick: ()→ signOut(),
            icon: <ArrowLeft className="h-4 w-4 mr-2" />,
        }
    ], [pathname, conversationId]);

    return routes;
}

export default useRoutes;