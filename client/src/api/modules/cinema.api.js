import publicClient from "../client/public.client";

const cinemaEndpoints = {
    list: "cinema/all",
    getByCluster: ({cluster}) => `cinema/${cluster}`
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
    getByCluster: async ({ cluster }) => {
        try {
            const response = await publicClient.get(cinemaEndpoints.getByCluster({ cluster }));

            return { response };
        } catch (err) {
            return { err };
        }
    }
}
export default cinemaApi;