import responseHandler from "../handlers/response.handler.js";
import cinemaModel from "../models/cinema.model.js";
import scheduleModel from "../models/schedule.model.js";
import roomModel from "../models/room.model.js";

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

        let cinemas = [], schedules;
        if (cluster === 'all') cinemas = await cinemaModel.find();
        else {
            schedules = await scheduleModel.find({ date, movieId }).populate("cinemaId");
            schedules = schedules.filter(s => s.cinemaId.cluster === cluster)
            schedules.forEach(s => cinemas.push(s.cinemaId));
            cinemas = cinemas.filter((cinema, index, self) => 
                index === self.findIndex(t => t.id === cinema.id)
            )
        }
        responseHandler.ok(res, cinemas);
    } catch {
        responseHandler.error(res);
    }
}


export default { getList, getCinemaBySchedule };