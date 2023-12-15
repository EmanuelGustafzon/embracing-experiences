'use client';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import Login from '../auth/Login';
import { GetAdmin } from '@/utils/Auth/GetAdmin';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const adminEmail = await GetAdmin();
        setIsAdmin(adminEmail === session?.user?.email);
      } catch (error) {
        setIsAdmin(false);
      }
    };
    checkAdminStatus();
  }, [session]);

  return (
    <div className="navbar bg-primary">
      <div className="navbar-start">
        <div className="dropdown bg-primary">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/userPost">User Posts</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link href='/' className="btn btn-ghost normal-case text-xl text-pumpkin">Embracing Xperiences</Link>
      </div>

      <div className="navbar-end">
      <div>
        {session ? (
          <div className="dropdown dropdown-end bg-primary">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
            <Image alt="Profile" src={session?.user?.image!} width={50} height={50} />
            </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52">
              <li><Link href="/">Profile</Link></li>
              { isAdmin &&
                <li>
                  <Link href="/ManageContent">
                    CMS
                    <span className="badge">Admin</span>
                  </Link>
                </li>
              }
            <li><button onClick={() => signOut()}>Logout</button></li>
          </ul>
      </div>
        ) : (
        <Login/>
        )
        } 
        </div>
      </div>
    </div>
  )
}

export default NavBar
