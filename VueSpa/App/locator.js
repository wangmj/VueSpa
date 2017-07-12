define(["require"], function (require) {
    var locator = {
        load: function () {
            var args = [];
            var isArr = false;
            if (arguments.length == 0) {
                return;
            }
            else if (arguments.length == 1) {
                if (Array.isArray(arguments[0])) {
                    args.concat(arguments[0]);
                    isArr = true;
                }
                else
                    args.push(arguments[0]);
            }
            else {
                args.concat(arguments.slice());
            }
            return new Promise(function (resolve, reject) {
                require(args, function () {
                    if (!isArr) {
                        resolve(arguments[0]);
                    } else
                        resolve(arguments);
                }, function (err) {
                    reject(err);
                });
            });
        },
        loadView: function (view) {
            var prefix = "text!";
            if (!view.endsWith(".html"))
                view = view + ".html";
            var viewUrl = prefix + view;
            var args = [viewUrl];
            return new Promise(function (resolve, reject) {
                require(args, function (html) {
                    resolve(html);
                }, function (error) {
                    reject(error);
                })
            });
        }
    };
    return locator;
})