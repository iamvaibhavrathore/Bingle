import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const Room = () => {

    //Returns a tuple of the current URL's URLSearchParams and a function to update them. Setting the search params causes a navigation.
    const [searchParams, setSearchParams] = useSearchParams(); //get search params
    const name = searchParams.get('name'); //get name from search params

    useEffect(()=>{ //useEffect to run only once
        //login to init user to room
    }, [name]) //run when name changes

  return (
    <div>
        Hi {name}
    </div>
  )
}