import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './postSkeleton.css';

export default function PostSkeleton() {
  return (
    <div className="skeletonContainer">
      <div className="topSkeleton">
        <Skeleton circle width={40} height={40}/>
        <Skeleton width={80}/>
      </div>
      <div className="bottomSkeleton">
        <Skeleton count={3}/>
      </div>
    </div>
  )
}
