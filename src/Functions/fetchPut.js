export const fetchPut = (item_list) => {
    
    // Se añade dummy task, porque la API no admite listas vacías.
    item_list.push("thisIsADummyTaskSoApiIsNotEmpty")
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const dataToApi = item_list.map(x => { return { "label": x, "done": false } });
    console.log(dataToApi)
    var raw = JSON.stringify(dataToApi);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://assets.breatheco.de/apis/fake/todos/user/luckybollo", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


} 