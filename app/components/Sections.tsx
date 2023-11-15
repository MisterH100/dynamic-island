
export const Section = ()=>{
    const sections =[
        {heading: "about",id:"about", background: "bg-red-500"},
        {heading: "skills",id:"skills", background: "bg-yellow-500"},
        {heading: "Projects",id:"projects", background: "bg-green-500"}
      
    ]

    return(
        <>
            {sections.map((sec,index)=> 
                <section 
                    id={sec.id}
                    key={index}
                    className={`w-full min-h-screen ${sec.background}` }
                    >
                    <h1>{sec.heading}</h1>
                </section>
        
            )}
        </>
    )
}