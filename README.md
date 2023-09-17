## WebApp Introduction

Web apps power today's internet. We build one ourselves.

### HTML & CSS
A webpage consists of various files in their own formats:
  * HTML: Contains the markup that describes the page's elements, and references other resources.
  * CSS: Describes the styles of the HTML elements.
  * Image files: for, well, images.
  * Javascript: Script files that may be executed on the client side (browser).

Let's build a simple web page consisting of one HTML file and one CSS, both stored in the folder `static` (we'll see why later):

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="example.css">
    </head>
    <body>
        <button id="button1">Click me!</button>
        <button id="button2">... me too!</button>
        <div id="text">Oh, nothing yet</div>
    </body>
</html>
```

```css
/* Style the body element. */
body {
    margin: 1em;
}

/* Style the div element with id `text`. */
#text {
    background-color: palegreen;
    font-family: monospace;
    margin: 1em 0;
    padding: 0.5em;
}
```

We can open the HTML page in the browser and click buttons - but nothing happens...

### Serve the Page
Opening web pages locally is not that much fun - our goal is to publish an app to the world!

For this, the files need to be _served_, which means that they need to be sent to the _client's_ browser when requested. Let's turn our computer into a web _server_ using [Flask](https://flask.palletsprojects.com/):

In a terminal window, install Flask into Python:
```bash
python -m pip install flask
```

Flask can do more things than just serving the files on our computer to the client, but for now, that is all we want: Send all the files in the `static` folder unmodified to the requestor. We create a tiny Python application in the top-level folder named `app.py` that essentially does nothing else:

```py
from flask import Flask

app = Flask("example app")
```

On the console, start the Flask web server:

```bash
flask run --reload
```

The `--reload` tells it to pick up changes to the files we serve, so we don't need to restart it while changing code.

If the `flask` command is not found, try calling `python -m flask run --reload` instead.

Ok, let's open the URL given on the command line, typically http://127.0.0.1:5000. 

The browser probably tells us that the webpage does not exist - well, our HTML file is at `static/example.html`, so let's navigate to http://127.0.0.1:5000/static/example.html.

### HTTP
The client (browser) and the server use the HTTP protocol to transfer the different files. If we open the developer tools in the browser, we can observe the transfers on the `Network` tab:

![Developer Tools - Network](doc/dev_tools_network.png)

So the browser first loads the HTML page, reads it and discovers that it references the CSS page, then loads that as well, before it renders the entire page to the user.

Click on the files transferred - the detail pane contains a lot more information on the _request_ sent by the browser and the _response_ returned from the server.

Each request demands a certain _resource_ sent using a certain _method_. The _method_ describes the type of action to be taken, typically it is **GET**, but you will also come across **POST** to change a resource on the server side.

The request also contains additional information in _headers_, for instance:

  * **If-modified-since**: <timestamp>
    * Only transfer the resource it it was changed since the timestamp given.
    * Otherwise, ther server responds with a 304 status code, indicating that the client should use the copy of the resource it has cached from a previous visit.
  * **Referer**: Which site or host is requesting the resource.
  * **User-agent**:
    * Information about the browser and version.
    * May be used to distinguish mobile from desktop browsers.

The server answers with a [response code](https://de.wikipedia.org/wiki/HTTP-Statuscode) and additional information, for example the contents of the requested resource. The most important codes are:
  * **200** (OK): Request is successful, the requested resource is contained in the response.
  * **304** (UNMODIFIED): Request ist OK, the resource was not changed and is omitted from the response.
  * **404** (NOT FOUND): Resource not found.

