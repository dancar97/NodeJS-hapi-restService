"use strict";

module.exports.register = async server => {
    server.route({
        method: "GET",
        path: "/api/events",
        config: {
            handler: async request => {
                try {
                    // get the sql client registered as a plugin
                    const db = request.server.plugins.sql.client;

                    // TODO: Get the current authenticate user's ID
                    const userId = "user1234";

                    // execute the query
                    const res = await db.events.getEvents(userId);

                    // return the recordset object
                    return res.recordset;
                } catch (err) {
                    console.log(err);
                }
            }
        }
    });
    server.route({
        method: "POST",
        path: "/api/events",
        config: {
            handler: async request => {
                try {
                    const db = request.server.plugins.sql.client;
                    const userId = request.query.id;
                    console.log(request.query);
                    console.log(request.query.id);

                    const title = request.query.id
                    const startTime = request.query.startTime
                    const startDate = request.query.startDate
                    const endDate = request.query.endDate
                    const endTime = request.query.endTime
                    const description = request.query.description

                    const res = await db.events.addEvent({ userId, startDate, startTime, endDate, endTime, title, description });
                    return res.recordset[0];
                } catch (err) {
                    console.log(err);
                }
            }
        }
    });
};