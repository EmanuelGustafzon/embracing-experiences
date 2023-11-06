import React from 'react'
import Image from 'next/image'
const PostCard = () => {
  return (
    <>
<div className="card w-96 glass m-2">
  <figure><Image src="/images/trolltunga.jpg" width={390} height={250} alt="car!"/></figure>
  <div className="card-body">
    <h2 className="card-title">Life hack</h2>
    <p>How to park your car at your garage?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Learn now!</button>
    </div>
  </div>
</div>
 
<div className="card w-96 glass m-2">
  <figure><Image src="/images/trolltunga.jpg" width={390} height={250} alt="car!"/></figure>
  <div className="card-body">
    <h2 className="card-title">Life hack</h2>
    <p>How to park your car at your garage?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Learn now!</button>
    </div>
  </div>
</div>
<div className="card w-96 glass m-2">
  <figure><Image src="/images/trolltunga.jpg" width={390} height={250} alt="car!"/></figure>
  <div className="card-body">
    <h2 className="card-title">Life hack</h2>
    <p>How to park your car at your garage?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Learn now!</button>
    </div>
  </div>
</div>

<div className="card w-96 glass m-2">
  <figure><Image src="/images/trolltunga.jpg" width={390} height={250} alt="car!"/></figure>
  <div className="card-body">
    <h2 className="card-title">Life hack</h2>
    <p>How to park your car at your garage?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Learn now!</button>
    </div>
  </div>
</div>
</>
  )
}

export default PostCard