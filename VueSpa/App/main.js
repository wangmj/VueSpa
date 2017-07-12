requirejs.config({
    baseUrl: "App",
    paths: {
        "text": "/Scripts/text"
    }
});

define("vue", function () { return Vue;});

var app = {
    setRoot: function (root, appHost) {
        var host = appHost || "appHost";
        if (typeof host == "string")
            host = document.getElementById("appHost");
        require(["locator"], function (locator) {
            locator.load(root).then(function (model) {
                locator.loadView(root).then(function (view) {
                    host.innerHTML = view;
                    model.$mount(host);
                });
            });
        })
    }
};

define(function () {
    app.setRoot("layout")
})