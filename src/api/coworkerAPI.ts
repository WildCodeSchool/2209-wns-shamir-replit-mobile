import { api } from "./_REST";

type CoworkerProps = {
  socketIds: string[] | undefined;
  coworker: Coworker;
};

export type Coworker = {
  name: string;
  project_id: number;
  userId: number;
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
};

type SendCoworker = {
  status: number;
  data: undefined;
};

export const coworkerAPI = {
  sendCoworker: async ({
    socketIds,
    coworker,
  }: CoworkerProps): Promise<SendCoworker> => {
    try {
      const { status, data }: SendCoworker = await (await api()).post(`/coworker`, {
        socketIds,
        coworker,
      });

      return { status, data };
    } catch (e) {
      console.error(e);
      return { status: 500, data: undefined };
    }
  },
};
