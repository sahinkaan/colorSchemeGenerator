const baseUrl = "https://www.thecolorapi.com"

document.getElementById("get-scheme-form").addEventListener("submit",(e)=>{
    e.preventDefault()
    const colorSchemeEl = document.getElementById("color-scheme")
    colorSchemeEl.innerHTML = ""
    const seedColor = document.getElementById("seed-color").value.slice(1)
    const mode = document.getElementById("scheme-modes").value
    if( mode === "triad" && document.getElementById("color-count").value < 3){
        document.getElementById("color-count").value = 3
        alert("minimum scheme count is 3 for triad mode")
    }
    else if ( mode === "quad" && document.getElementById("color-count").value < 4){
        document.getElementById("color-count").value = 4
        alert("minimum scheme count is 4 for quad mode")
    }
    
    const count = document.getElementById("color-count").value
    const endpoint = `/scheme?hex=${seedColor}&mode=${mode}&count=${count}`
    const fullUrl = baseUrl + endpoint
    fetch(fullUrl)
        .then(resp => resp.json())
        .then(data => {
            colorSchemeEl.style
                .gridTemplateColumns = `repeat(${data.colors.length},1fr`
                                                
            data.colors.map((color,index)=>{
                colorSchemeEl.innerHTML +=`
                <div class="color-container">
                    <div class="color" id="color-${index}"></div>
                    <p>${color.hex.value}</p>
                </div>` 
                document.getElementById(`color-${index}`).style.backgroundColor = color.hex.value
            })
        })
})
