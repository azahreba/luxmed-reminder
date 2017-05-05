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

            var firstDateFull = document.querySelector('.tableList > li > .title').innerText;

            var firstDate = firstDateFull.slice(-10, firstDateFull.length);

            var year = parseInt(firstDate.slice(-4, firstDate.length), 10);
            var month = parseInt(firstDate.slice(3, 5), 10);
            var date = parseInt(firstDate.slice(0, 2), 10);

            var d = new Date(year, month - 1, date);
            var d1 = new Date(2017, 4, 7);

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