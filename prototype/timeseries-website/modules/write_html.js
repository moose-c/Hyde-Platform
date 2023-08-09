import { years } from './create_data';

export let iso_code;

export function createIsocodes() {
    const box = document.getElementById('countries')
    const form_box = document.getElementById('form_box') 

    // create 100 isocodes
    for (let i = 0; i < 100; i++) {
        let newDiv = document.createElement('div');
        // with eventlistener, when clicked show form
        newDiv.addEventListener('click', (e)=> {
            iso_code = e.target['innerText']
            console.log(iso_code)
            form_box.style.display = "block"
        })
        let newContent = document.createTextNode(i);
        newDiv.appendChild(newContent);
        document.body.insertBefore(newDiv, box);
    }
}

export function populateYears() {
    const selectors = document.getElementsByClassName("select_year")
    for (let selector of selectors) {
        for (const key in years) {
            const opt = document.createElement("option")
            opt.value = key
            opt.innerHTML = years[key]
            selector.appendChild(opt)
        }
    document.getElementById('indicators').selectedIndex = 2
    document.getElementById('start_year').selectedIndex = 50
    document.getElementById('end_year').selectedIndex = 65
    }
}
