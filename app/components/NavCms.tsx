import Link from "next/link"
const NavCms = () => {
  return (
    <div>
        <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
  <li>
    <Link href='/manage-content'>New Blog Post</Link>
  </li>
  <li>
    <Link href='/manage-content/posts'>Manage blog posts</Link>
  </li>
</ul>
    </div>
  )
}

export default NavCms