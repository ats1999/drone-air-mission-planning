import dynamic from "next/dynamic";
// expariment
import h from "@components/toast-ui/H";

const E = dynamic(()=>
  import("@components/toast-ui/EVH").then((mod)=>mod.V),{ssr:false}
);
 
export default function RenderMd({md,articleId}){
    // extract data from md
    const featuredArray = [];
    let idx = 1;
    let mdString = md;

    // insert toc contents after heading
    // This is not working fine, so I'm removing this
/*
    mdString = mdString.split("\n"); 
    mdString.splice(1,0,toc(md));
    mdString = mdString.join("\n");
*/
    while(idx !== -1){
        idx = mdString.indexOf("```");

        if(idx !== -1){
            // get second nearest index of codeblock
            let nearIdx = mdString.indexOf("```",idx+3);
            let htmlString = mdString.substring(0,idx);
            let codeBlockString = mdString.substring(idx,nearIdx+4);
            // cut string
            mdString = mdString.slice(nearIdx+3);

            const html = h(htmlString);
            // push this into array
            featuredArray.push({
                type:"html",
                md:html
            });
            featuredArray.push({
                type:"tui",
                md:codeBlockString
            });
        }
    }    
    // safe place
    const html = h(mdString);
    featuredArray.push({
        type:"html",
        md:html
    });
    return <div>
        {
            featuredArray.map((item,idx)=>{
                if(item.md.length<=0) return null;

                if(item.type == "html")
                    return <div key={idx}  className={`${idx==0?"tui-first":""} tui-editor-contents`}
                        dangerouslySetInnerHTML={{__html:item.md}}>
                    </div>

                 return <E key={idx} md={item.md}/>
            })
        }
    </div>
}
