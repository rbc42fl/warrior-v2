import React from 'react';
// import { Link } from 'react-router-dom';
export default function Instructions() {
  return (
    <>
      <div>
        <h1 className="text-center">Instructions</h1>
        <p className="px-3 pb-2">
          The following instructions on how to have a quiet time come from the
          Every man A Warrior website. I have left out some of the information,
          <br />
          but you can goto their web site and look in the resources for the
          complete quiet time form.
        </p>
        <ul className="px-3">
          <li className="pb-2">
            1. First read the passage, while asking the Holy Spirit to reveal it
            to you.
          </li>
          <li className="pb-2">
            2. Find the verse that really speaks to you. You can enter three
            verses.
          </li>
          <li className="pb-2">3. Determine if there is a command to obey?</li>
          <li className="pb-2"> 4. Is there a promise to claim?</li>
          <li className="pb-2">5. Is there a sin to avoid?</li>

          <li className="pb-2">
            6. Determine a least three key words that stick with you from the
            reading.
          </li>
          <li className="pb-2">
            7. Look for the main scriptural message in the verse, and record it.
          </li>
          <li className="pb-2">
            8. Record your own personal reflections and application from the
            verse.
          </li>
          <li className="pb-2">
            9. Find and up load a photo that describes the message or you can
            have one photo that you use all the time and let it be your tag
            photo. I have included a link to the unSplash web site where you can
            find all kinds of free photos. Photo size cannot be more that 2meg.
            There are download options with each photo on unSplash.
          </li>
        </ul>
      </div>
      <div className="instructions">
        <div className=" ">
          <h4 className="pl-10 pb-3 font-bold">A helpful list of resources</h4>
          <ul className="pl-10">
            <li className="pb-2 font-bold text-blue-500 underline">
              <a
                href="https://www.everymanawarrior.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Every Man A Warrior
              </a>
            </li>
            <li className="pb-2 font-bold text-blue-500 underline">
              <a
                href="https://unsplash.com/images"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash free photos
              </a>
            </li>
            <li className="pb-2 font-bold text-blue-500 underline">
              <a
                href=" https://www.gotquestions.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Got Questions
              </a>
            </li>
            <li className="pb-2 font-bold text-blue-500 underline">
              <a
                href="https://mensdiscipleshipnetwork.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mem's discipleship network
              </a>
            </li>
          </ul>
          <p className="pl-10">Some of the photos come from unsplash.com</p>
        </div>
      </div>
    </>
  );
}
