'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Login from '../auth/Login';

const NavBar = () => {
  const { data: session } = useSession();
  return (
    <div className="navbar">
  <div className="navbar-start">
    <div className="dropdown bg-primary">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="/about">About</Link></li>
      </ul>
    </div>
    <p className=''> Welcome { session?.user?.name?.split(' ')[0] }! </p>
  </div>
  
  <div className="navbar-center">
    {/* <Link href='/' className="btn btn-ghost normal-case text-xl text-pumpkin">EmbracingX</Link> */}
  </div>
  
  <div className="navbar-end">
  </div>
    <div>
      {!session ? (
        <Login/>
        ) : (
        <button onClick={() => signOut()}>Logout</button>
        )}
    </div>
    
</div>
  )
}

export default NavBar