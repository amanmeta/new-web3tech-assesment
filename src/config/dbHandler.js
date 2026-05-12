const mongoose = require('mongoose');

const connectDB =
require('./db.js');


const dbHandler = {

    connect: async () => {

        try {

            if (!process.env.MONGO_URI) {

                console.log(
                    "MONGO_URI not set"
                );

                return;
            }

            if (
                mongoose.connection.readyState === 1
            ) {

                console.log(
                    "MongoDB already connected"
                );

                return;
            }

            await connectDB();

        } catch (error) {

            console.error(
                "MongoDB connection failed:",
                error.message
            );
        }
    },


    disconnect: async () => {

        try {

            if (
                mongoose.connection.readyState !== 0
            ) {

                await mongoose.disconnect();

                console.log(
                    "MongoDB disconnected"
                );
            }

        } catch (error) {

            console.error(
                error.message
            );
        }
    },


    isConnected: () =>
        mongoose.connection.readyState === 1,


    getPlugin: async (pluginName) => {

        return await Plugin.findOne({
            name: pluginName
        });
    },


    addPlugin: async (pluginData) => {

        const plugin =
            new Plugin(pluginData);

        return await plugin.save();
    },

    listPlugins: async () => {

        return await Plugin.find({});
    }
};


const pluginSchema =
new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    version: {
        type: String
    },

    enabled: {
        type: Boolean,
        default: true
    }

});


const Plugin =
mongoose.models.Plugin ||

mongoose.model(
    "Plugin",
    pluginSchema
);


module.exports =
dbHandler;