import responseHandler from "../handlers/response.handler.js";
import seatModel from "../models/seat.model.js";
import roomModel from "../models/room.model.js";
import seatTypeModel from "../models/seat_type.model.js";

const getList = async (req, res) => {
    const { roomId } = req.params;
    const seats = await seatModel.find({ roomId }).populate("type").sort({ row: 1, column: 1 });

    responseHandler.ok(res, seats);
}

export default { getList };