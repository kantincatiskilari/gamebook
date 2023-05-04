import './userSkeleton.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function UserSkeleton() {
  return (
    <div className="following">
      <div className="followingWrapper">
        <div className="followingImg">
          <Skeleton circle width={50} height={50}/>
        </div>
        <div className="followingInfo">
          <Skeleton width={70}/>
          <Skeleton width={70}/>    
        </div>
        <div className="followingButton">
          <Skeleton height={20} width={80} borderRadius={20}/>
        </div>
      </div>
    </div>
  )
}
