export const toggleEditorFullScreen = (el) =>{
  if(el.style.height != "100vh")
    el.style = "height:100vh; width:100vw; position:fixed;z-index:10000;top:0px;left:0px;background-color:white;";
  else el.style = "height:400px;"
}