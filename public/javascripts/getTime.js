var request = new XMLHttpRequest();
request.onreadystatechange= function() {
    request.open("GET", '/articles', true)
    console.log(request.responseText);
}
// request.send(null);
// var res = request.response;
// console.log(res);

// var now = new Date();
// console.log(now.year);