async function fetchTimeseries(start, end, indicators) {
    let url = `get_data.php?isocode=${iso_code}&start=${start}&end=${end}`
    let i = 1
    for (var indicator of indicators){
        url+=`&indicator${i}=${indicator}`
        i++;
    }
    // let response = await fetch(url);
    console.log(url)
    let response = await fetch('http://127.0.0.1:5000/students/')
    let text = await response.json()
    console.log(text)
    
}

const box = document.getElementById('countries')

const form_box = document.getElementById('form_box')
const form = document.getElementById('form')
var iso_code; 

// create 100 isocodes
for (let i = 0; i < 100; i++) {
    let newDiv = document.createElement('div');
    // with eventlistener, when clicked show form
    newDiv.addEventListener('click', (e)=> {
        iso_code = e.target['innerText']
        show_form()
    })
    let newContent = document.createTextNode(i);
    newDiv.appendChild(newContent);
    document.body.insertBefore(newDiv, box);
}

// indeed gives form
function show_form() {
    console.log(iso_code)
    form_box.style.display = "block"
}

// on submition, show a graph
form.addEventListener('submit', e=>{
    // obtain variables to javascript:
    const indicators_selector = document.getElementById('indicators')
    const start = document.getElementById('start_year').value
    const end = document.getElementById('end_year').value
    indicators = []
    for(var option of indicators_selector.options){
        if(option.selected){
            indicators.push(option.value)
        }
    }
    console.log(iso_code)
    console.log(`The following indicators were selected: ${indicators}`)
    console.log(`Start poep year: ${start}`)
    console.log(`End year: ${end}`)

    e.preventDefault() // very important for fetch method for some reason.

    fetchTimeseries(start, end, indicators)
})
// maxwell, differt methods