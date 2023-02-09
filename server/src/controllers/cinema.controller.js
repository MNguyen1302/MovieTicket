import responseHandler from "../handlers/response.handler.js";
import cinemaModel from "../models/cinema.model.js";

const getList = async (req, res) => {
    try {
        const cinemas = await cinemaModel.find();

        responseHandler.ok(res, cinemas);
    } catch {
        responseHandler.error(res);
    }
}

const getCinemaByCluster = async (req, res) => {
    try {
        const { cluster } = req.params;

        let cinemas = null;
        if (cluster === 'all') cinemas = await cinemaModel.find();
        else  cinemas = await cinemaModel.find({ cluster });

        responseHandler.ok(res, cinemas);
    } catch {
        responseHandler.error(res);
    }
}

export default { getList, getCinemaByCluster };