export function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")

    const formdata = new FormData();
    formdata.append("key", "54d3d886e269d58d09945623e4e88bc6");
    formdata.append("txt", formText);
    formdata.append("lang", "en");
    formdata.append("of", "json");

    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
        .then(response => response.body)
        .then((res) => {
            console.log(res)
            const reader = res.getReader();

            return new ReadableStream({
                start(controller) {
                    // The following function handles each data chunk
                    function push() {
                        // "done" is a Boolean and value a "Uint8Array"
                        reader.read().then(({ done, value }) => {
                            // If there is no more data to read
                            if (done) {
                                console.log('done', done);
                                controller.close();
                                return;
                            }
                            // Get the data and send it to the browser via the controller
                            controller.enqueue(value);
                            // Check chunks by logging to the console
                            console.log(done, value);
                            push();
                        })
                    }

                    push();
                }
            });
        })
        .then(stream => {
            // Respond with our stream
            return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
        })
        .then(result => {
            // Do things with result
            console.log(result);
            document.getElementById('results').innerHTML = result;
        })
        .catch(error => console.log('error', error));
}