const range = require('lodash.range')

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

export let years_lst = range(10000, 0, -1000).map(year => `bce_${year}`).concat(
            range(0, 1700, 100).map(year => `ce_${year}`),
            range(1700, 2000, 10).map(year => `ce_${year}`),
            range(2000, 2018, 1).map(year => `ce_${year}`))

export function populateYears() {
    const selectors = document.getElementsByClassName("select_year")
    let split_year, opt
    for (let i = 0; i < selectors.length; i++){
        years_lst.forEach((year) => {
            console.log(year)
            opt = document.createElement("option")
            opt.value=year
            split_year = year.split('_')
            if (split_year[0] == "bce") {
                opt.innerHTML = `${split_year[1]} BCE`
            } else {
                opt.innerHTML = `${split_year[1]} CE`
            }
            selectors.item(i).appendChild(opt)
        })
    }
}
