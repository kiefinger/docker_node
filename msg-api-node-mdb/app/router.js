const LabelController = require ('./controller/labels.controller');


function cors(app) {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
            return res.status(200).json({});
        }
        next();
    });
}

function initialize ( app ) {
    cors(app);

    app.use('/labels', LabelController.initialize());
    //app.use('/service/test', TestRoute);

    app.use((req, res, next) => {
        const error = new Error('Not found');
        error.status = 404;
        next(error);
    });

    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            status: error.status || 500,
            error: {
                message: error.message
            }
        })
    });
}

module.exports.initialize = initialize;
