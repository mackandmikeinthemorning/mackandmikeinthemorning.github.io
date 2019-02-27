const form = document.getElementById('mailForm')
const url = 'http://localhost:8000/subscribe'
const submit = document.getElementById('submit')
const toast = document.getElementById('toast')

function post(url, body, callback) {
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener("load", function () {
        if (req.status < 400) {
            callback(null, JSON.parse(req.responseText));
        } else {
            callback(new Error("Request failed: " + req.statusText));
        }
    });
    req.send(JSON.stringify(body));
}

function success() {
    toast.innerHTML = 'Thanks for subscribing! Be on the lookout for our next newsletter!'
    submit.disabled = false
    submit.blur()
    form.email.focus()
    form.email.value = ''
}

function error (err) {
    toast.innerHTML = 'There was an error subscribing :('
    submit.disabled = false
    console.log(err)
}

form.addEventListener('submit', function (e) {
    e.preventDefault()
    submit.disabled = true

    const payload = {
        email: form.email.value,
    }
    post(url, payload, function(err, res) {
        if (err) { return error(err) }
        success()
    })
})
