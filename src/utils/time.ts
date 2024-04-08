import moment from "moment-timezone";

export const organiseProductsByTimeOfTheDay = (products: { event_time: moment.MomentInput; status: string; }[]) => {

    let dayEvents = [];
    let noonEvents = [];
    let eveningEvents = [];
    let allEvents = [];
    let activeTab: number;

    products.forEach((item: { event_time: moment.MomentInput; status: string; }) => {
        let eventTime = moment(item.event_time, 'h:m');
        let noonTime = moment('13:00', 'h:m');
        let eveningTime = moment('17:00', 'h:m');

        // Group events per time of the day
        if (eventTime.isBefore(noonTime) && item.status === 'open') {
            dayEvents.push(item);
        } else if (eventTime.isBefore(eveningTime) && item.status === 'open') {
            noonEvents.push(item)
        } else if (item.status === 'open') {
            eveningEvents.push(item)
        }
        if (item.status === 'open') {
            allEvents.push(item);
        }
    });
    // Set active tab
    activeTab = 0;
    if (eveningEvents.length > 0)
        activeTab = 2;
    if (noonEvents.length >0)
        activeTab = 1;
    if (dayEvents.length > 0)
        activeTab = 0;


    return [
        {
            id: 0,
            timeRange: 'Día',
            events: dayEvents,
        },
        {
            id: 1,
            timeRange: 'Tarde',
            events: noonEvents,
        },
        {
            id: 2,
            timeRange: 'Noche',
            events: eveningEvents,
        },
        {
            id: 99,
            events: allEvents,
            activeTab: activeTab,
        },
    ];
}

export const formatDate = (value: string | number | Date) => {
    return new Date(value).toLocaleDateString('es-VE', {year: "numeric", month: "numeric", day: "numeric"})
}

export const formatTime = (value: string) => {
    return moment(value, "HH:mm").format("hh:mm A")
}

export const formatTime2 = (value: string) => {
    const t = moment(value).tz("America/Caracas")
    return t.format("hh:mm A")
}

export const convertUTCtoVzla = (value: string) => {
    return moment(value, moment.ISO_8601).tz("America/Caracas").format("hh:mm A");
}

export const getVzlanTime = (value: string) => {
    return moment().tz("America/Caracas").format("hh:mm A");
}

export const getHourList = () => {
    const hours = []
    for (var i = 1; i < 25; i++) {
        var am = 'AM',
            pm = 'PM',
            ampm,
            timeUnit;

        timeUnit = i > 12 ? i - 12 : i;
        ampm = i < 12 || i > 23 ? am : pm;

        hours.push({
            value: i,
            label: `${timeUnit} ${ampm}`,
            ampm: ampm,
        })
    }
    return hours;
}

// The debounce function takes two arguments, the function to be debounced and the wait time in milliseconds. It returns a function and can be called later
export const debounce = (fn, wait) => {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer); // clear any pre-existing timer
        }
        const context = this; // get the current context
        timer = setTimeout(() => {
            fn.apply(context, args); // call the function if time expires
        }, wait);
    }
}

// When the throttle function is triggered, the throttled variable is set to false, and the supplied function is called with arguments.
export const throttle = (fn, wait) => {
    let throttled = false;
    return function(...args){
        if(!throttled){
            fn.apply(this,args);
            throttled = true;
            setTimeout(()=>{
                throttled = false;
            }, wait);
        }
    }
}

export const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};