"use strict";

const utils = require("../utils");

const register = async({ sql, getConnection }) => {
    // read in all the .sql files for this folder
    const sqlQueries = await utils.loadSqlQueries("events");

    const getEvents = async userId => {
        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();

        // configure sql query parameters
        request.input("userId", sql.VarChar(50), userId);

        // return the executed query
        return request.query(sqlQueries.getEvents);
    };


    const addEvent = async({ userId, title, description, startDate, startTime, endDate, endTime }) => {
        const pool = await getConnection();
        const request = await pool.request();
        request.input("userId", sql.VarChar(50), userId);
        request.input("title", sql.NVarChar(200), title);
        request.input("description", sql.NVarChar(1000), description);
        request.input("startDate", sql.NVarChar(1000), startDate);
        request.input("startTime", sql.NVarChar(1000), startTime);
        request.input("endDate", sql.NVarChar(1000), endDate);
        request.input("endTime", sql.NVarChar(1000), endTime);
        return request.query(sqlQueries.addEvent);
    };


    return {
        getEvents,
        addEvent
    };
};

module.exports = { register };