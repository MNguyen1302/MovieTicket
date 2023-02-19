import responseHandler from "../handlers/response.handler.js";
import cinemaModel from "../models/cinema.model.js";
import scheduleModel from "../models/schedule.model.js";
import comboModel from "../models/combo.model.js";

const getList = async (req, res) => {
    try {
        const cinemas = await cinemaModel.find();

        responseHandler.ok(res, cinemas);
    } catch {
        responseHandler.error(res);
    }
}

const getCinemaBySchedule = async (req, res) => {
    try {
        const { movieId } = req.params;
        const { cluster, date, address } = req.query;

        let cinemas = [];
        let schedules = await scheduleModel.find({ date, movieId }).populate("cinemaId").populate("roomId");
        if (cluster === 'all') cinemas = getUniqueItems(schedules, "cinemaId");
        else {
            cinemas = getUniqueItems(schedules.filter(s => s.cinemaId.cluster === cluster), "cinemaId");
        }

        responseHandler.ok(res, { cinemas, schedules });
    } catch {
        responseHandler.error(res);
    }
}

const getListCombo = async (req, res) => {
    try {
        const { cluster } = req.params;
        const listCombo = await comboModel.find({ cluster });

        responseHandler.ok(res, listCombo);
    } catch (err) {
        responseHandler.error(res);
    }
}

const getUniqueItems = (items, key) => {
    let newItems = [];
    items.forEach(item => newItems.push(item[key]));
    return newItems.filter((cinema, index, self) => index === self.findIndex(t => t.id === cinema.id))
}


export default { getList, getCinemaBySchedule, getListCombo };