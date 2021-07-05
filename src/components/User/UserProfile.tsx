import {authenticationData} from "../useAuth";

interface Props{
    authData : authenticationData
}


const UserProfile:React.FC<Props> = ({authData}) => {
    return (
        <div className="text-center mt-2">
            {authData.username}
        </div>
    )
}

export default UserProfile;