chrome.extension.sendMessage({}, function (response) {
    function notifyMe(date) {
        if (!("Notification" in window)) {
            alert("This browser does not support system notifications");
        }
        else if (Notification.permission === "granted") {
            notify(date);
        }
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    notify(date);
                }
            });
        }

        function notify(date) {
            var notification = new Notification('LuxMed', {
                icon: 'http://www.luxmed.pl/i/logo.png',
                body: 'NEW DATE: ' + date,
            });
            // setTimeout(notification.close.bind(notification), 7000);
        }
    }

    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            var firstDate = document.querySelector('.tableList > li > .title').innerText;
            var d = new Date(firstDate);
            var d1 = new Date("Friday, 07-05-2017");

            if (d.getTime() < d1.getTime()) {
                notifyMe(d.toDateString());
                notifyMe(d.toDateString());
                notifyMe(d.toDateString());
            } else {
                setTimeout(() => document.querySelector('.button[type="submit"]').click(), 5000)
            }

            // console.dir(document.querySelector('.button[type="submit"]'));
            // let i = setInterval(() => document.querySelector('.button[type="submit"]').click(), 3000);

        }
    }, 10);
});