const form = document.getElementById('mailForm')
const url = 'https://p7j4xt8r44.execute-api.us-west-2.amazonaws.com/api/unsubscribe'
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
    toast.innerHTML = 'You are unsubscribed :('
    submit.disabled = false
    submit.blur()
    form.email.focus()
    form.email.value = ''
}

function error (err) {
    toast.innerHTML = 'There was an error processing your request'
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

