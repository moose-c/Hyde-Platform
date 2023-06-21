const box = document.getElementById('countries')
for (let i = 0; i < 100; i++) {
    let newDiv = document.createElement('div');
    newDiv.className = "iso_code";
    let newContent = document.createTextNode(i);
    newDiv.appendChild(newContent);
    document.body.insertBefore(newDiv, box);
}

iso_boxes = document.getElementsByClassName("iso_code");
iso_boxes.addEventListener("click", (e)=> {
    show_form(e.target['innerText'])
})

function show_form(iso_code) {
    console.log(iso_code)
    
}
