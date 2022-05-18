import React from 'react';
export default class CommonConfig {
    static isEmpty = function (value) {
        if (value === undefined || value === null || value === '') {
            return true;
        } else {
            if (typeof value === 'string') {
                return value.trim() === "";
            } else {
                return false;
            }
        }
    }
    static isObjectEmpty = function (obj) {
        for (var key in obj)     {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    static filterTwoArray = function (data, filters) {
        return data.filter(e => {
            try {
                filters.forEach(o => {
                    Object.keys(o).forEach(key => {
                        if (e[key] !== o[key]) throw new 1;
                    });
                });

                return true;
            } catch (e) {
                return false;
            }
        });
    }

    static getDatesBetweenDates = function (startDate, endDate) {
        let dates = []
        //to avoid modifying the original date
        const theDate = new Date(startDate)
        while (theDate < endDate) {
            dates = [...dates, new Date(theDate)]
            theDate.setDate(theDate.getDate() + 1)
        }
        // dates = [...dates, endDate]
        dates.splice(0, 1)
        return dates
    }

    static amountValidate = function (e) {
        var t = e;
        e = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t.indexOf("-") !== -1 ? t.substr(1, t.length) : t;
        return e;
    }

    static addDaysToDates = function (date, noOfDays) {
        var theDate = date;
        theDate.setDate(theDate.getDate() + noOfDays);
        return theDate;
    }

    static dateFormat = {
        dateTime: 'MM/DD/YYYY hh:mm:ss A',
        dateOnly: 'MM/DD/YYYY',
        dateFirst: 'DD/MM/YYYY',
        forDatePicker: 'DD-MM-YYYY',
        yearOnly: 'YYYY',
        dbDateTime: 'YYYY-MM-DD HH:mm:ss',
        timeOnly: 'HH:mm'
    }

    static loginData = function () {
        if (localStorage.getItem('loginData')) {
            return JSON.parse(localStorage.getItem('loginData'));
        }
        else {
            return ""
        }
    }

    static getUserAccess = function () {
        if (localStorage.getItem('loginData')) {
            let data = JSON.parse(localStorage.getItem('userModuleAccess'));

            return data

        } else {
            return ""
        }
    }

    static randomString = function (length) {
        // var length = 32; 
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    static convertImgToBase64 = async function (url) {
        return fetch(url)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result)
                reader.onerror = reject
                reader.readAsDataURL(blob)
            }))
    }

    static base64toFile = function (dataurl, filename) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    static findFileNameFromURL = function (urlPath) {
        var url = urlPath;
        var filename = url.substring(url.lastIndexOf('/') + 1);
        return filename;
    }

    static findExtesionFromURL = function (urlPath) {
        const types = new Map([["jpg", "img"], ["jpeg", "img"], ["png", "img"], ["gif", "img"], ["mp4", "video"], ["3gp", "video"]])

        const url = new URL(urlPath)
        return url.pathname.split(".")[1]
    }

    static ExcelDateToJSDate = function (serial) {
        var utc_days = Math.floor(serial - 25569);
        var utc_value = utc_days * 86400;
        var date_info = new Date(utc_value * 1000);

        var fractional_day = serial - Math.floor(serial) + 0.0000001;

        var total_seconds = Math.floor(86400 * fractional_day);

        var seconds = total_seconds % 60;

        total_seconds -= seconds;

        var hours = Math.floor(total_seconds / (60 * 60));
        var minutes = Math.floor(total_seconds / 60) % 60;

        return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
    }

    static filterCaseInsensitive = function (filter, row) {
        const id = filter.pivotId || filter.id;
        const content = row[id];

        if (typeof content !== 'undefined') {
            if (typeof content === 'object' && content !== null && content.key) {
                return String(content.key).toLowerCase().includes(filter.value.toLowerCase());
            } else {
                return String(content).toLowerCase().includes(filter.value.toLowerCase());
            }
        }

        return true;
    }

    static getIndianFormatAmount = function (amount) {
        var x = amount;
        x = x.toString();
        var afterPoint = '';
        if (x.indexOf('.') > 0)
            afterPoint = x.substring(x.indexOf('.'), x.length);
        x = Math.floor(x);
        x = x.toString();
        var lastThree = x.substring(x.length - 3);
        var otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers != '')
            lastThree = ',' + lastThree;
        return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
    }

    static RegExp = {
        number: /^[0-9\b]+$/,
        onlyNumber: /[a-zA-Z~`!@#$%^&*()_+=-{}|:"<>?,;']+$/,
        onlyDecimal: /^\d*\.?\d{0,2}$/,
        companyName: /[!@~`#$%^&*()_+\-=\]{};':"\\|,.<>?]/,
        zipCode: /^([a-zA-Z0-9]+\s?)*$/g,
        regExpNumber: /[0-9]/g,
        regExpUpperCase: /[A-Z]/g,
        regExpLowerCase: /[a-z]/g,
        emailRegex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9-]+\.[A-Z]{2,6}$/ig,
        phone: /^[0-9]{10}$/,
        regExpSpecialCharacter: /[!@#$%^&*(),.?":{}|<>]/g,
        RateRegex: /^(\$|)([1-9]\d{0,3}(\.\d{3})*|([1-9]\d*))(\.\d{3})?$/
    }

    static showErrorMsg = function (msg) {
        return (
            <div className="error-msg">{msg}</div> 
        )
    }

}