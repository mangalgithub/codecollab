import React, { useState } from "react";
import PrimaryButton from "./Button";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast"
import { useRouter } from "next/router";
import { useGlobalContext } from "../contexts/Globalcontext";
 
interface JoinRoomDialogueProps {}

const JoinRoomDialogue: React.FC<JoinRoomDialogueProps> = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [roomId, setRoomId] = useState("");
  const router = useRouter()
  const { name, setName } = useGlobalContext()

  const createNewRoom = (e: any) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    toast.success("room created")
  };

  const joinRoom = (e: any) => {
    e.preventDefault();
    if(!roomId.trim() || !name.trim()) {
      toast.error("Room ID and username is required")
    }

    router.push(`/editor/${roomId}`)
  }


  return (
    <>
      <PrimaryButton
        text="Go to Editor"
        onClickFunc={() => setShowModal(true)}
      />
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-2xl">
              <div className=" text-white border-0 rounded-lg shadow-lg relative flex flex-col w-full pb-4 bg-purple-500 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Join Room</h3>
                  <button
                    className="p-1 ml-aut text-white border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-red-700  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      &#x2715;
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="flex space-y-3 relative p-6 flex-col">
                  <h3 className="text-lg font-semibold mb-2">
                    Paste invitation ROOM ID
                  </h3>

                  <input
                    type="text"
                    className="custom-input"
                    id="exampleFormControlInput1"
                    placeholder="ROOM ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="custom-input"
                    id="exampleFormControlInput1"
                    placeholder="USERNAME"
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end pr-6 rounded-b">
                  <button
                    className="bg-yellow-400 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={joinRoom}
                  >
                    Join
                  </button>
                </div>
                <p className="my-2 text-black text-lg leading-relaxed mx-8">
                  {" "}
                  If you don't have invite code then create &nbsp;
                  <a
                    onClick={createNewRoom}
                    href=""
                    className="text-bgdark font-bold border-b-2 border-primary hover:animate-pulse"
                  >
                    Create New Room
                  </a>
                </p>{" "}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black "></div>
        </>
      ) : null}
    </>
  );
};

export default JoinRoomDialogue;
