import './followSkeleton.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function FollowSkeleton() {
  return (
     <div className="suggestedUser">
       <div className="suggestedUserImg">
         <Skeleton circle height={40} width={40} />
       </div>
         <div className="suggestedUsername">
            <Skeleton width={65}/>
         </div>
       <div className="suggestedUserFollow">
         <Skeleton width={100} height={38} borderRadius={20}/>
       </div>
     </div>
  )
}
