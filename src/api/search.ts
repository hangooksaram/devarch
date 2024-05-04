

export const fetchSearch = async (query:string)=>{
    console.log("isFetched")
    const res = await fetch(query);

    return res.json()
}