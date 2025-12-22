import Link from 'next/link'
import React from 'react'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'
import { currentUser } from '@clerk/nextjs/server'
import { syncUser } from '@/actions/user.action'

async function Navbar() {
    const user = await currentUser();
    if(user) await syncUser();
    return (
        <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-3xl font-bold text-primary tracking-wider">
                            <span className="bg-gradient-to-b from-[#BF953F] via-[#FCF6BA] to-[#B38728] bg-clip-text text-transparent">
                                G
                            </span>
                            ossip
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <DesktopNavbar />
                        <MobileNavbar />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
