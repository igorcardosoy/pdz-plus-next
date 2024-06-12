'use server'
import type { Metadata } from "next";
import Header from "../../components/Header/Header";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { user } from "@/utils/authentication";
import { check_user_is_allowed } from "@/utils/api/discord_user/DiscordUserService";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)

  if(!session){       
    redirect("/")
  }

  const allowed_user = await check_user_is_allowed(session?.user?.name)
  
  if(allowed_user !==  true){
      redirect("/")
  }

  const user: user = {
    name: session.user?.name,
    profilePicture: session.user?.image
  } 

  return (
    <div>
        <Header has_session={session?true:false} user={user}/>

        <main>
          {children}
        </main>
    </div>
  );
}
