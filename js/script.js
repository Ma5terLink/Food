"use strict";
window.addEventListener('DOMContentLoaded', () => {

    //РЕАЛИЗАЦИЯ РАБОТЫ С ТАБАМИ
    const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent (i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');

    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });




    //ТАЙМЕР АКЦИИ
    const deadline = '2021-09-25T00:00:00.000Z'; // Хотим, чтоб локально было это время
   
    function getTimeRemaining(endtime) {
        // получаем разницу в миллисекундах между требуемой датой и текущей
        // здесь же поправка на часовой пояч по UTC-5 (18кк миллисекунд)
        const t = (Date.parse(endtime) - 18000000) - Date.parse(new Date()),
                    // формируем кол-во дней, часов, минут и секунд
                    days = Math.floor(t / (1000 * 60 * 60 * 24)),
                    hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                    minutes = Math.floor((t / 1000 / 60) % 60),
                    seconds = Math.floor((t / 1000) % 60);
        // возвращаем объект с нужными значениями
        return {
            'total': t,
            'days': days,
            'hours': hours, 
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // ф-я проверки значения на меньшее чем 10, и подстановки нолика чтобы получить, например 06
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
                    days = timer.querySelector('#days'),
                    hours = timer.querySelector('#hours'),
                    minutes = timer.querySelector('#minutes'),
                    seconds = timer.querySelector('#seconds'),
                    timeInterval = setInterval(updateClock, 1000);

        updateClock(); // первоначальное обновление таймера в верстке, до старта интервального таймера обновления

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);
            if (t.total <= 0) {
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);


});