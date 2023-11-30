import NavBar from "./components/NavBar";
import Image from "next/image"
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <NavBar/>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image src="/images/northface.jpg" alt="Image of trolltunga hike." width={600} height={900} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">LET US DISCOVER!</h1>
          <p className="py-6">A blog and community platform, all about travel, outdoor, culture and all kind of embracing experiences.</p>
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
