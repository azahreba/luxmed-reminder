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
            var notification = new Notification('FREE SPOT', {
                body: '',
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

            let hours = Array.from(document.querySelectorAll('.hour'));
            let endurance_hour = hours.filter(h => h.innerText == '19:00')[0]

            let endurance = endurance_hour.nextElementSibling

            let spots = parseInt(endurance.querySelector('.event .availability .availability-number').innerText, 10)

            if (spots > 0) {
                yourSound = new Audio('https://notificationsounds.com/wake-up-tones/solemn-522/download/mp3');

                notifyMe();

                p = fetch('https://api.telegram.org/bot425932574:AAGGsWve44vmoWGuPVoxPvLoJnWVQhO9KYk/sendMessage', {
                     method: 'post',
                     body: 'chat_id=@JupyterNotebookNotification&text=FreeSpot',
                     //425932574
                     headers: {
                       'Content-type': 'application/x-www-form-urlencoded'
                     }
                    })
                      .then(
                        function(response) {
                          if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' +
                              response.status);
                            return;
                          }

                          // Examine the text in the response
                          response.json().then(function(data) {
                            console.log(data);
                          });
                        }
                      )
                      .catch(function(err) {
                        console.log('Fetch Error :-S', err);
                      });
            } else {
                console.log('No spots :(')
                setTimeout(() => location.reload(), 10000)
            }

            // console.dir(document.querySelector('.button[type="submit"]'));
            // let i = setInterval(() => document.querySelector('.button[type="submit"]').click(), 3000);

        }
    }, 10);
});