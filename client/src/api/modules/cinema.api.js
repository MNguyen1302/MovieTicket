import publicClient from "../client/public.client";

const cinemaEndpoints = {
    list: "cinema/all",
    getBySchedule: ({cluster, movieId, date, address}) => `cinema/${movieId}?cluster=${cluster}&date=${date}&address=${address}`,
    getListCombo: ({ cluster }) => `cinema/combo/${cluster}`
}

const cinemaApi = {
    getList: async () => {
        try {
            const response = await publicClient.get(cinemaEndpoints.list);

            return { response };
        } catch (err) {
            return { err };
        }
    },
    getBySchedule: async ({ cluster, movieId, date, address }) => {
        try {
            const response = await publicClient.get(cinemaEndpoints.getBySchedule({ cluster, movieId, date, address }));

            return { response };
        } catch (err) {
            return { err };
        }
    },
    getListCombo: async ({ cluster }) => {
        try {
            const response = await publicClient.get(cinemaEndpoints.getListCombo({ cluster }));

            return { response };
        } catch (err) {
            return { err };
        }
    }
}
export default cinemaApi;