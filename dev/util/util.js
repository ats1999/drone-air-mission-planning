export function isElementInViewPort(el){
    // next.js does not have a window instance on server side. 
    if(!window || window=="undefined") return;

    let bounding = el.getBoundingClientRect();
    console.log(`${bounding.bottom}<${window.innerHeight}`)
    return (bounding.top>0&&bounding.left>0&&bounding.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&bounding.right<=(window.innerWidth || document.documentElement.clientWidth))
}

export const getFreshUrl =(str)=> {
    let freshStr = str.replace(/[^\w\s]/gi," ").trim().replace(/ +/g, " ");
    freshStr = freshStr.split(" ").join("-");
    return freshStr
}

export const toc=(md)=>{
    md = md.split("\n");
    md = md.filter(item=>item.indexOf("#")!=-1);
    md = md.map(curHeading=>{
        const hashReplace = countHashReplace(curHeading);
        const spaceBefore = numSpaceBefore(hashReplace.count);
        return (`${spaceBefore}* [${hashReplace.cleanStr.trim()}](#${hashReplace.cleanStr.replace(/[^\w\s]/gi, " ").trim().replace(/ +/g, " ").split(" ").join("-")})`)
    });
    return md.join("\n");
}

const countHashReplace=(str)=>{
    let count = 0;
    str = str.trim();
    for(let i=0; i<str.length; i++){
        if(str.charAt(i)=="#") count++;
        else break;
    }
    let regex = /(<([^>]+)>)/ig
    const cleanStr = str.substring(count,str.length).replace(regex, "");
    return {count,cleanStr};
}

const numSpaceBefore=(num)=>{
    let str = "";
    while((num--)>0) str += "  ";
    return str;
}


export const customHTMLRenderer={
    heading: (node, context) => {
      const { level } = node;
      const tagName = `h${level}`;
      let id = node.firstChild && node.firstChild.literal?node.firstChild.literal:""
        id = id.replace(/[^\w\s]/gi, " ")
        .trim()
        .replace(/ +/g, " ")
        .split(" ").join("-");

      if (context.entering) {
        return {
          type: "openTag",
          tagName,
          attributes: {
            id: id
          }
        };
      }

      return { type: "closeTag", tagName,
            attributes: {
                id: id
            }
        };
    },
    link: (node, context) => {
      const { origin, entering } = context;
      const result = origin();
      if (entering && !result.attributes.href.startsWith("#")) {
        result.attributes.target = "_blank";
      }
      return result;
    }
}