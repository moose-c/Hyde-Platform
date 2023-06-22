const box = document.getElementById('countries')
for (let i = 0; i < 100; i++) {
    let newDiv = document.createElement('div');
    newDiv.addEventListener('click', (e)=> {
        show_form(e.target['innerText'])
    })
    let newContent = document.createTextNode(i);
    newDiv.appendChild(newContent);
    document.body.insertBefore(newDiv, box);
}

function show_form(iso_code) {
    console.log(iso_code)
    document.getElementById("myForm").style.display = "block"
}