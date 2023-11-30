import NavBar from "./components/NavBar";
import Image from "next/image"
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <NavBar/>
      <div className="hero min-h-screen" style={{backgroundImage: 'url(https://drive.google.com/uc?id=1pCz0_6jX5s-wz3kmqFcDe6LwP4yU54PE)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">LET US DISCOVER!</h1>
      <p className="mb-5">A blog and community platform, all about travel, outdoor, culture and all kind of embracing experiences.</p>
      <button className="btn btn-primary">
            <Link href="/blog">
              Read the blog!
           </Link>
          </button>
    </div>
  </div>
</div>
    </div>
  )
}


