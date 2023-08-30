import { api } from "./_REST";

export type ExecutedCode = {
  type: "log" | "info" | "warn" | "error";
  message: string[];
};

type GetExecutedCode = {
  status: number;
  data:
    | { result: ExecutedCode[]; nbExecutions: number | undefined }
    | undefined;
};

export const executeCodeAPI = {
  sendCode: async (
    code: string,
    projectId: number
  ): Promise<GetExecutedCode> => {
    try {
      const { status, data }: GetExecutedCode = await (
        await api()
      ).post(`/executeCode`, {
        code,
        projectId,
      });
      return { status, data };
    } catch (e) {
      console.error(e);
      return { status: 500, data: undefined };
    }
  },
};
