async function productosEnJson() {
    const resp = await fetch(`productosKids.json`)
    const data = await resp.json()

    console.log(data)

 

}


