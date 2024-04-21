"use client";

import { GenerateSoundForm } from "../../components/GenerateSoundForm";
import Loader from "../../components/Loader";
import { useState } from "react";

/**
 * Represents the request payload for generating sound using a pre-trained model.
 */
export interface CreateSoundRequest {
  /**
   * The URL of the pre-trained model to be used for sound generation.
   */
  modelUrl: string;

  /**
   * The input text that will be used to generate the sound.
   */
  text: string;
}

/**
 * The main view component for generating sound using a pre-trained model.
 */
export default function GenerateSoundView() {
  // State to manage loading status and audio URL
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  /**
   * Handles the process of fetching audio data using the provided request.
   * @param {CreateSoundRequest} request - The request containing model URL and text.
   */
  const handleGetAudio = async (request: CreateSoundRequest) => {
    setIsLoading(true);
    try {
        const response=await fetch("/api/generateSound",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: request.text,
          modelUrl: request.modelUrl,
        }),
      });
      console.log("response",response);
      if (!response.ok) {
        throw new Error("Failed to fetch audio data");
      }

      const data = await response.arrayBuffer();

      const blob = new Blob([data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(blob);

      setAudioUrl(audioUrl);
      setIsLoading(false);
    } catch (error) {
      console.error(error)
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/3 p-4">
        <div className="ml-8 mr-8 mt-6 mb-4 text-xl">
          <h1 style={{"marginLeft":"0%","marginTop":"10%"}}>Try Text to Speech Converter</h1>
        </div>
        {/* Render the form component for generating sound */}
        <GenerateSoundForm handleGetAudio={handleGetAudio} />
      </div>
      <div className="w-full md:w-2/3 p-4 bg-gray-200 h-screen">
        <div className="h-full flex justify-center items-center">
          {isLoading ? (
            // Show loader when fetching audio data
            <Loader />
          ) : (
            // Display audio player when audio is available
            <>
              {audioUrl && (
                <audio controls>
                  <source id="audioSource" type="audio/flac" src={audioUrl!} />
                </audio>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}