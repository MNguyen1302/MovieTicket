import publicClient from "../client/public.client";

const seatEndpoint = {
    getList: ({ roomId }) => `seats/${roomId}`
}

const seatApi = {
    getList: async ({ roomId }) => {
        try {
            const response = await publicClient.get(seatEndpoint.getList({ roomId }));

            return { response };
        } catch (err) {
            return { err };
        }
    }
}

export default seatApi;