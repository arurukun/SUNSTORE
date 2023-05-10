import React,{useState} from 'react'

export const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState("")

    const submitHandler=(e)=>{
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push("/")
        }
    }
  return (
    <form onSubmit={submitHandler}>
        {/* {console.log("jhdsgfjksdgfjksdfkjsdhfkjdshflk")} */}
        <input onChange={(e)=>setKeyword(e.target.value)} type="text" placeholder='Search Products...' className='bg-white text-amber-900 border-2 border-amber-900'></input>
        {/* <button type="submit" className="bg-slate-500 text-yellow-800 px-4 py-2 hover:bg-yellow-300 mx-auto"><i className='fas fa-search'></i></button> */}
    </form>
  )
}
