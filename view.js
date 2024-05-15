// Define a function to assert whether a file is included in the header
function checkIfIncluded(file) {
    // Get all <link> elements
    var links = document.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++) {
        // Check if the file name matches the end of the href attribute
        if (links[i].href.substr(-file.length) == file)
            return true;
    }

    // Get all <script> elements
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        // Check if the file name matches the end of the src attribute
        if (scripts[i].src.substr(-file.length) == file)
            return true;
    }

    return false; // File not found in <link> or <script> elements
}

function myFunction() {

    if (checkIfIncluded("print.css")) {
        // Remove the old CSS file
        var linkNode = document.querySelector('link[href*="print.css"]');
        head.removeChild(linkNode);
    } else {
        var head = document.getElementsByTagName('head')[0]; // get header
        var link = document.createElement('link'); //initalize the link var
        // add the attributes alternative.css to the link var
        link.id = 'alternativeCss';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = '../print.css';
        link.media = 'all';
        head.appendChild(link); // Append the alternative CSS file to the <head>
    }
}
