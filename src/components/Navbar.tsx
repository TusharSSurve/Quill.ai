import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { getKindeServerSession, LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";
import UserAccountNav from "./UserAccountNav";
import MobileNav from "./MobileNav";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span>Paper<span className="text-green-600">Pupil</span></span></Link>

          <MobileNav isAuth={!!user} />
          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? <>
              <LoginLink className={buttonVariants({
                variant: "ghost",
                size: 'sm'
              })}>Sign In</LoginLink>
              <RegisterLink className={buttonVariants({
                size: 'sm'
              })}>Get Started <ArrowRight className="ml-1.5 h-5 w-5" /></RegisterLink>
            </> :
              <>
                <Link href="/dashboard" className={buttonVariants({
                  variant: "ghost",
                  size: 'sm'
                })}>Dashboard</Link>
                <UserAccountNav name={
                  !user.given_name || !user.family_name ? 'Your Account' : `${user.given_name} ${user.family_name}`
                } email={user.email ?? ''} />
              </>
            }
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}
