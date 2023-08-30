import { io } from "socket.io-client";
import React from "react";
import { Coworker } from "./coworkerAPI";

let fromFrontUrl = "http://localhost:5001";

if (process.env.REACT_APP_BACKEND_URL)
  fromFrontUrl = process.env.REACT_APP_BACKEND_URL;

type Query = {
  project_id: number;
  userEmail: string;
};

export const websocket = {
  connect: async (
    query: Query,
    setForceEditorUpdate: React.Dispatch<React.SetStateAction<number>>,
    setCoworkers: React.Dispatch<React.SetStateAction<Coworker[]>>
  ) => {
    const socket = io(fromFrontUrl, {
      query,
      path: "/websocket/",
    });

    await new Promise((resolve, _reject) => {
      socket.on("connect", () => {
        console.info("socket connected !", socket.id);

        socket.on("refresh editor", async (_arg) => {
          console.log("refresh editor", _arg);

          setForceEditorUpdate(new Date().getTime());
        });

        socket.on("refresh cursor", async (_arg: Coworker[]) => {
          console.log("refresh cursor");

          setCoworkers(_arg);
        });

        resolve(socket.id);
      });
    });

    return socket;
  },

  disconnect: async (id: string) => {
    const socket = io(fromFrontUrl, {
      path: "/websocket/",
    });
    console.info("closed socket", id);

    socket.close();
  },
};
