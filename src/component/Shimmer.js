const Shimmer = ()=>{
    return(
        <>
        {
            Array(21).fill("").map((e,index)=>{
                return(
                    <div className="shimmer-list" key={index}></div>
                )
            })
        }
        </>
    )
}
export default Shimmer