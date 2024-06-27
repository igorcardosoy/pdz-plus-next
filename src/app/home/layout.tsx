'use server'

import { user } from "@/entities/Users";
import { getServerSession } from "next-auth";
import { checkIfUserIsAllowed } from "@/utils/api/discord_user/DiscordUserService";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { createUser } from "@/utils/api";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  let isDiscordAuthenticated: boolean = true
  let isAllowedUser: boolean | Error = false

  const session = await getServerSession()
  if (session) {
    isAllowedUser = await checkIfUserIsAllowed(session?.user?.name)
    if (isAllowedUser !== true) {
      isDiscordAuthenticated = false
    }
  } else {
    isDiscordAuthenticated = false
  }

  let user: user
  if (isDiscordAuthenticated && session) {
    user = createUser(session.user?.name, session.user?.image)
  } else {
    user = createUser("ADM", "https://cdn.icon-icons.com/icons2/2620/PNG/512/among_us_player_red_icon_156942.png")
  }

  return (
    <>
      <AuthenticatedLayout isDiscordAuthenticated={isDiscordAuthenticated} children={children} user={user} />
    </>
  );
}
