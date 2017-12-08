chrome.extension.sendMessage({}, function (response) {

    var yourSound = new Audio('https://notificationsounds.com/wake-up-tones/solemn-522/download/mp3');



    function notifyMe(date, time, location) {
        if (!("Notification" in window)) {
            alert("This browser does not support system notifications");
        }
        else if (Notification.permission === "granted") {
            notify(date, time, location);
        }
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    notify(date, time, location);
                }
            });
        }

        function notify(date, time, location) {
            audioNotification();
            var notification = new Notification('LuxMed', {
                icon: 'http://www.luxmed.pl/i/logo.png',
                body: 'DATE: ' + date +
                '\n' + "TIME: " + time +
                '\n' + 'LOCATION: ' + location,
            });
            // setTimeout(notification.close.bind(notification), 7000);
        }
    }

    function audioNotification(){
        yourSound.play();
    }



    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            var firstDateFull = document.querySelector('.tableList > li > .title');

            if (firstDateFull) {
                firstDateFull = firstDateFull.innerText

              var firstDate = firstDateFull.slice(-10, firstDateFull.length);

              var year = parseInt(firstDate.slice(-4, firstDate.length), 10);
              var month = parseInt(firstDate.slice(3, 5), 10);
              var date = parseInt(firstDate.slice(0, 2), 10);

              var d = new Date(year, month - 1, date);
              var d_max = new Date(2017, 11, 10);
              var d_min = new Date(2017, 10, 3);

                if (d.getTime() < d_max.getTime() /*&& d.getTime() > d_min.getTime()*/) {

                    var time  = document.querySelector('.tableList tbody > tr > td.hours').dataset.sort;
                    var location = document.querySelector('.tableList > li > .content tbody > tr > td:nth-child(2) > div:nth-child(3)').innerText;

                    if (parseInt(time[0] + time[1], 10) < 17){
                        notifyMe(d.toDateString(), time, location);
                    } else {
                        setTimeout(() => document.querySelector('.button[type="submit"]').click(), 5000);
                    }
                } else {
                    setTimeout(() => document.querySelector('.button[type="submit"]').click(), 5000);
                }
            }
            else {
                setTimeout(() => document.querySelector('.button[type="submit"]').click(), 5000);
            }

            // console.dir(document.querySelector('.button[type="submit"]'));
            // let i = setInterval(() => document.querySelector('.button[type="submit"]').click(), 3000);

        }
    }, 10);
});