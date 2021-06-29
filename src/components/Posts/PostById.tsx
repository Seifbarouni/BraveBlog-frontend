import {useParams} from "react-router-dom";

export default function  PostById(){
    const {id} = useParams();
    return (
        <div>
            this is a post by ID <br />
            id = {id}
        </div>
    )
}