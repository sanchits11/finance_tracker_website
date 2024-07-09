"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionStatus = exports.removeSpecialCharacters = exports.parseStringify = exports.formatDateTime = void 0;
exports.cn = cn;
exports.formatAmount = formatAmount;
exports.formUrlQuery = formUrlQuery;
exports.getAccountTypeColors = getAccountTypeColors;
exports.countTransactionCategories = countTransactionCategories;
exports.extractCustomerIdFromUrl = extractCustomerIdFromUrl;
exports.encryptId = encryptId;
exports.decryptId = decryptId;
/* eslint-disable no-prototype-builtins */
const clsx_1 = require("clsx");
const query_string_1 = __importDefault(import("query-string"));
const tailwind_merge_1 = require("tailwind-merge");
function cn(...inputs) {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
// FORMAT DATE TIME
const formatDateTime = (dateString) => {
    const dateTimeOptions = {
        weekday: "short", // abbreviated weekday name (e.g., 'Mon')
        month: "short", // abbreviated month name (e.g., 'Oct')
        day: "numeric", // numeric day of the month (e.g., '25')
        hour: "numeric", // numeric hour (e.g., '8')
        minute: "numeric", // numeric minute (e.g., '30')
        hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    };
    const dateDayOptions = {
        weekday: "short", // abbreviated weekday name (e.g., 'Mon')
        year: "numeric", // numeric year (e.g., '2023')
        month: "2-digit", // abbreviated month name (e.g., 'Oct')
        day: "2-digit", // numeric day of the month (e.g., '25')
    };
    const dateOptions = {
        month: "short", // abbreviated month name (e.g., 'Oct')
        year: "numeric", // numeric year (e.g., '2023')
        day: "numeric", // numeric day of the month (e.g., '25')
    };
    const timeOptions = {
        hour: "numeric", // numeric hour (e.g., '8')
        minute: "numeric", // numeric minute (e.g., '30')
        hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    };
    const formattedDateTime = new Date(dateString).toLocaleString("en-US", dateTimeOptions);
    const formattedDateDay = new Date(dateString).toLocaleString("en-US", dateDayOptions);
    const formattedDate = new Date(dateString).toLocaleString("en-US", dateOptions);
    const formattedTime = new Date(dateString).toLocaleString("en-US", timeOptions);
    return {
        dateTime: formattedDateTime,
        dateDay: formattedDateDay,
        dateOnly: formattedDate,
        timeOnly: formattedTime,
    };
};
exports.formatDateTime = formatDateTime;
function formatAmount(amount) {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    });
    return formatter.format(amount);
}
const parseStringify = (value) => JSON.parse(JSON.stringify(value));
exports.parseStringify = parseStringify;
const removeSpecialCharacters = (value) => {
    return value.replace(/[^\w\s]/gi, "");
};
exports.removeSpecialCharacters = removeSpecialCharacters;
function formUrlQuery({ params, key, value }) {
    const currentUrl = query_string_1.default.parse(params);
    currentUrl[key] = value;
    return query_string_1.default.stringifyUrl({
        url: window.location.pathname,
        query: currentUrl,
    }, { skipNull: true });
}
function getAccountTypeColors(type) {
    switch (type) {
        case "depository":
            return {
                bg: "bg-blue-25",
                lightBg: "bg-blue-100",
                title: "text-blue-900",
                subText: "text-blue-700",
            };
        case "credit":
            return {
                bg: "bg-success-25",
                lightBg: "bg-success-100",
                title: "text-success-900",
                subText: "text-success-700",
            };
        default:
            return {
                bg: "bg-green-25",
                lightBg: "bg-green-100",
                title: "text-green-900",
                subText: "text-green-700",
            };
    }
}
function countTransactionCategories(transactions) {
    const categoryCounts = {};
    let totalCount = 0;
    // Iterate over each transaction
    transactions &&
        transactions.forEach((transaction) => {
            // Extract the category from the transaction
            const category = transaction.category;
            // If the category exists in the categoryCounts object, increment its count
            if (categoryCounts.hasOwnProperty(category)) {
                categoryCounts[category]++;
            }
            else {
                // Otherwise, initialize the count to 1
                categoryCounts[category] = 1;
            }
            // Increment total count
            totalCount++;
        });
    // Convert the categoryCounts object to an array of objects
    const aggregatedCategories = Object.keys(categoryCounts).map((category) => ({
        name: category,
        count: categoryCounts[category],
        totalCount,
    }));
    // Sort the aggregatedCategories array by count in descending order
    aggregatedCategories.sort((a, b) => b.count - a.count);
    return aggregatedCategories;
}
function extractCustomerIdFromUrl(url) {
    // Split the URL string by '/'
    const parts = url.split("/");
    // Extract the last part, which represents the customer ID
    const customerId = parts[parts.length - 1];
    return customerId;
}
function encryptId(id) {
    return btoa(id);
}
function decryptId(id) {
    return atob(id);
}
const getTransactionStatus = (date) => {
    const today = new Date();
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);
    return date > twoDaysAgo ? "Processing" : "Success";
};
exports.getTransactionStatus = getTransactionStatus;
