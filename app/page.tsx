import NavBar from "./components/NavBar";
import Image from "next/image"
import Link from "next/link";
export default function Home() {
  return (
    <div>
      <NavBar/>
      <div className="hero min-h-screen" style={{backgroundImage: 'url(https://lh3.googleusercontent.com/drive-viewer/AEYmBYRQYW_dWZ61WMy8lIKPtFh_HVWpHPfCaTZRX2zYdtyQh9bwC1vbNkwBSUSLU6MLR_rF_jxF7N2bB8x_LGxzlE9xVlekpA=s1600)'}}>
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


